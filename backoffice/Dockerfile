FROM node:alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat git openssh
WORKDIR /app
COPY package*.json ./

RUN --mount=type=cache,target=/app/npm-cache \
    npm i --cache /app/npm-cache

FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN rm -rf .next
RUN npm run build

FROM base AS production
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public


EXPOSE 3024
ENV PORT=3024

CMD ["node", "server.js"]
