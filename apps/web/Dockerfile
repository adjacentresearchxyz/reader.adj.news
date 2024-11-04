FROM --platform=linux/amd64 node:20-alpine AS builder

# Install necessary dependencies
RUN apk add --no-cache libc6-compat openssl && apk update
WORKDIR /app

# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@8.15.7 --activate

# Copy source for turbo prune
COPY . .
RUN pnpm dlx turbo@1.10.12 prune --scope=@refeed/nextjs --docker

FROM --platform=linux/amd64 node:20-alpine AS installer

# Environment variables
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}

# Install necessary dependencies
RUN apk add --no-cache libc6-compat openssl && apk update
WORKDIR /app

# Set production environment
ENV NODE_ENV production
ENV CI true

# Copy pruned lockfile and package.json
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

# Install pnpm and dependencies
RUN corepack enable && corepack prepare pnpm@8.15.7 --activate
RUN pnpm install --frozen-lockfile

# Copy source code
COPY --from=builder /app/out/full/ .

# Build the application
RUN SKIP_ENV_VALIDATION=1 pnpm run build --filter=nextjs...

FROM --platform=linux/amd64 node:20-alpine AS runner

# Install necessary dependencies
RUN apk add --no-cache libc6-compat openssl && apk update
WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Set production environment
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Copy built application
COPY --from=installer /app/apps/web/next.config.mjs ./
COPY --from=installer /app/apps/web/package.json ./

COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Start the application
CMD node apps/web/server.js