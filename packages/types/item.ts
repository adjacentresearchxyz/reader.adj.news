export interface Market {
  ticker: string;
  adj_ticker: string;
  reported_date: Date | null;
  end_date: Date | null;
  market_slug: string | null;
  open_interest: number | null;
  volume: number | null;
  probability: number | null;
  question: string | null;
  description: string | null;
  forecasts: number | null;
  link: string | null;
  platform: string | null;
  status: string | null;
  question_embedding: any | null;
}

export interface ItemType {
  id: string;
  title: string;
  url: string;
  created_at: Date;
  updated_at: Date;
  image_url: string | null;
  logo_url: string | null;
  from_search: boolean | undefined;
  marked_read: boolean | undefined;
  in_read_later: boolean | undefined;
  marked_read_time: Date | null | undefined;
  temp_added_time: Date | null | undefined;
  bookmark_folders: string[] | undefined;
  feed_id: string;
  feed_title: string | undefined;
  website_content: string | null;
  readibility_score: number | null;
  content_length: number | null;
  note: string | null | undefined;
  markets: Market[] | null;
  embedding: any | null;
}