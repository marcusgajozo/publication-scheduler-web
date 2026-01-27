FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
RUN corepack enable pnpm
RUN corepack prepare pnpm@10.26.1 --activate

FROM base AS local
WORKDIR /publication-scheduler-web
CMD ["pnpm", "dev"]

FROM base AS deps
WORKDIR /publication-scheduler-web
COPY package.json pnpm-lock.yaml* ./
RUN pnpm i --frozen-lockfile


FROM base AS builder
WORKDIR /publication-scheduler-web
COPY --from=deps /publication-scheduler-web/node_modules ./node_modules
COPY . .
RUN pnpm run build


FROM base AS runner
WORKDIR /publication-scheduler-web
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /publication-scheduler-web/public ./public
COPY --from=builder --chown=nextjs:nodejs /publication-scheduler-web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /publication-scheduler-web/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]