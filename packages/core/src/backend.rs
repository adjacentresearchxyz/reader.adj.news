use std::sync::Arc;
use serde_json::{self, Value};

use crate::{
    cache_fetch_info,
    feeds::flatten_feeds,
    fetch_feeds, get_items,
    prisma::{feed, item, user, PrismaClient},
    utils
};
use axum::{extract::Json, http::Uri, routing::post};
use axum::{routing::get, Router};
use prisma_client_rust::NewClientError;
use serde::Deserialize;
use tower_http::cors::CorsLayer;

use std::process::{Command, Stdio};
use std::io::{self, Write};

pub async fn start_http() {
    tracing_subscriber::fmt::init();

    let app = Router::new()
        .route("/refreshfeeds", post(refreshfeeds))
        .route("/inbound_email", post(inbound_email_handler))
        .route("/healthcheck", get(healthcheck))
        .layer(CorsLayer::permissive());

    let listener = tokio::net::TcpListener::bind("0.0.0.0:4050").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

#[derive(Deserialize, Debug)]
struct RefreshFeedsRequest {
    feed_ids: Vec<String>,
}

async fn refreshfeeds(Json(request): Json<RefreshFeedsRequest>) {
    let client: Result<PrismaClient, NewClientError> = PrismaClient::_builder().build().await;
    let client = Arc::new(client.unwrap());

    println!("Starting API refresh");

    let feeds = client
        .feed()
        .find_many(vec![feed::id::in_vec(request.feed_ids)])
        .exec()
        .await
        .expect("Failed to execute query");

    let feeds = fetch_feeds(feeds).await;

    let flat_items = flatten_feeds(&feeds);

    let items = get_items(flat_items).await;

    // Convert the items into a Vector of items into the format prisma expects
    let items = items
        .into_iter()
        .map(|item| {
            item::create_unchecked(
                item.title.clone(),
                item.url.clone(),
                vec![
                    item::SetParam::SetWebsiteContent(Some(item.website_content)),
                    item::SetParam::SetImageUrl(Some(item.image_url)),
                    item::SetParam::SetFeedId(Some(item.feed_id)),
                    item::SetParam::SetEmbeddingJson(Some(
                        serde_json::from_str(&item.embedding_json).unwrap_or_else(|_| serde_json::Value::Null)
                    ))
                ],
            )
        })
        .collect::<Vec<_>>();
    
    client
        .item()
        .create_many(items)
        .skip_duplicates()
        .exec()
        .await
        .unwrap();

    // Execute caching in the background
    if let Err(e) = cache_fetch_info(feeds, &client).await {
        // Handle or log the error as needed
        println!("Failed to cache fetch info: {:?}", e);
    }

    println!("Finished api refresh");
}

async fn healthcheck(uri: Uri) -> &'static str {
    println!("{:?}", "Healthcheck");

    "Healthy"
}

#[allow(unused, non_snake_case)]
#[derive(Deserialize, Debug)]
struct EmailAttachment {
    Name: String,
    Content: String,
    ContentType: String,
    ContentLength: u32,
}

#[allow(unused, non_snake_case)]
#[derive(Deserialize, Debug)]
struct EmailHeader {
    Name: String,
    Value: String,
}

#[allow(unused, non_snake_case)]
#[derive(Deserialize, Debug)]
struct EmailAddress {
    Email: String,
    Name: String,
    MailboxHash: String,
}

#[allow(unused, non_snake_case)]
#[derive(Deserialize, Debug)]
struct InboundEmail {
    FromName: String,
    MessageStream: String,
    From: String,
    FromFull: EmailAddress,
    To: String,
    ToFull: Vec<EmailAddress>,
    Cc: String,
    CcFull: Vec<EmailAddress>,
    Bcc: String,
    BccFull: Vec<EmailAddress>,
    OriginalRecipient: String,
    Subject: String,
    MessageID: String,
    ReplyTo: String,
    MailboxHash: String,
    Date: String,
    TextBody: String,
    HtmlBody: String,
    StrippedTextReply: String,
    Tag: String,
    Headers: Vec<EmailHeader>,
    Attachments: Vec<EmailAttachment>,
}

async fn inbound_email_handler(Json(payload): Json<InboundEmail>) {
    // Here, you can process the inbound email data.
    // For example, parse `payload.TextBody` or `payload.HtmlBody` and update your feeds accordingly.
    println!("Received inbound email: {:?}", payload);
    println!("Received inbound email: {:?}", payload.TextBody);

    let client: Result<PrismaClient, NewClientError> = PrismaClient::_builder().build().await;
    let client = Arc::new(client.unwrap());

    let inbox_email = payload.To.clone();

    // Find user with the inbox_email
    let user = client
        .user()
        .find_first(vec![user::inbox_email::equals(Some(inbox_email.clone()))])
        .exec()
        .await
        .unwrap();

    println!("{:?}", user);

    // If the user has a inbox get their email
    if let Some(user) = user {
        println!("User: {:?}", user.id);
        println!("{:?}", user.inbox.unwrap());
        if user.inbox.unwrap() {
            let url = payload.From.clone();
            let content = payload.TextBody.clone();
            let mut title = payload.Subject.clone();

            // // If their is no title, use the first 50 characters of the content. End at a word though
            if title.is_empty() {
                title = content.chars().take(50).collect::<String>();

                if title.len() == 50 {
                    title = title.split_whitespace().collect::<String>();
                }

                title = format!("{}...", title);
            }

            // Add to the DB
            client
                .item()
                .create(
                    title,
                    url,
                    vec![
                        item::SetParam::SetUserId(Some(user.id)),
                        item::SetParam::SetFromNewsletter(Some(true)),
                        item::SetParam::SetNewsletterEmail(Some(payload.To.clone())),
                        item::SetParam::SetNewsletterSender(Some(payload.From.clone())),
                        item::SetParam::SetWebsiteContent(Some(content)),
                    ],
                )
                .exec()
                .await
                .unwrap();

            println!("Finished Adding Newsletter to DB");
        }
    } else {
        println!("Failed to get User");
        return;
    };
}
