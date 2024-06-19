import type { User } from "@supabase/auth-helpers-nextjs";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { initTRPC, TRPCError } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import superjson from "superjson";
import { ZodError } from "zod";

import { prisma } from "@refeed/db";

interface CreateContextOptions {
  user: User | null;
}

export const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    user: opts.user,
    prisma,
  };
};

export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  const supabase = createPagesServerClient(opts);

  // React Native will pass their token through headers,
  // browsers will have the session cookie set
  const token = opts.req.headers.authorization;

  const user = token
    ? await supabase.auth.getUser(token)
    : null;

    // If the user is not authenticated, we'll create a user object using our ID
    const unauthorizedUser: User = {
      id: "f4186f3b-2c2a-45a8-88cf-18e9c9ed8910",
      aud: "unauthenticated",
      created_at: "2021-10-06T00:00:00.000000Z",
      app_metadata: {
        provider: "email",
      },
      user_metadata: {
        full_name: "Anonymous User",
      },
    }

  return createInnerTRPCContext({
    user: user ? user.data.user : unauthorizedUser,
  });
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.user?.id) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      // infers the `user` as non-nullable
      user: ctx.user,
    },
  });
});

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
