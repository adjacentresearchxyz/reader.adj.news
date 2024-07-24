import type { PrismaClient } from "@prisma/client";
import type Stripe from "stripe";

// Retrieves a Stripe customer id for a given user if it exists or creates a new one
export const getOrCreateStripeCustomerIdForUser = async ({
  stripe,
  prisma,
  userId,
}: {
  stripe: Stripe;
  prisma: PrismaClient;
  userId: string;
}) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) throw new Error("User not found");

  if (user.stripeCustomerId) {
    return user.stripeCustomerId;
  }

  // Create a new customer
  const customer = await stripe.customers.create({
    email: user.email ?? undefined,
    name: user.name ?? undefined,
    // Use metadata to link this Stripe customer to internal user id
    metadata: {
      userId,
    },
  });

  // Update with new customer id
  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      stripeCustomerId: customer.id,
    },
  });

  if (updatedUser.stripeCustomerId) {
    return updatedUser.stripeCustomerId;
  }
};

export const handleInvoicePaid = async ({
  event,
  stripe,
  prisma,
}: {
  event: Stripe.Event;
  stripe: Stripe;
  prisma: PrismaClient;
}) => {
  const invoice = event.data.object as Stripe.Invoice;
  const subscriptionId = invoice.subscription;
  const subscription = await stripe.subscriptions.retrieve(
    subscriptionId as string,
  );
  const userId = subscription.metadata.userId;

  // There is probably a better way to do this
  const Plan =
    subscription.items.data[0]?.plan.id == "price_1Pf2YYJHM9jR7ebhya3E54OF" ||
    subscription.items.data[0]?.plan.id == "price_1Pf2ZvJHM9jR7ebhtz66h3gZ"
      ? "pro"
      : "free";

  // Update user with subscription data
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      plan: Plan,
      stripeSubscriptionId: subscription.id,
      stripeSubscriptionStatus: subscription.status,
    },
  });
};

export const handleSubscriptionCreatedOrUpdated = async ({
  event,
  prisma,
}: {
  event: Stripe.Event;
  prisma: PrismaClient;
}) => {
  const subscription = event.data.object as Stripe.Subscription;
  const userId = subscription.metadata.userId;

  // There is probably a better way to do this
  const Plan =
    subscription.items.data[0]?.plan.id == "price_1Pf2YYJHM9jR7ebhya3E54OF" ||
    subscription.items.data[0]?.plan.id == "price_1Pf2ZvJHM9jR7ebhtz66h3gZ"
      ? "pro"
      : "free";

  // Update user with subscription data
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      plan: Plan,
      stripeSubscriptionId: subscription.id,
      stripeSubscriptionStatus: subscription.status,
    },
  });
};

export const handleSubscriptionCanceled = async ({
  event,
  prisma,
}: {
  event: Stripe.Event;
  prisma: PrismaClient;
}) => {
  const subscription = event.data.object as Stripe.Subscription;
  const userId = subscription.metadata.userId;

  // Remove subscription data from user
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      plan: "free",
      stripeSubscriptionId: null,
      stripeSubscriptionStatus: null,
    },
  });
};
