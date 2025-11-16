FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

RUN npm run build

ENV STRIPE_SECRET_KEY sk_test_51SSc2BKcSCMGzohULitsx1tYOywNDKKJRkW48pCakmHjHh6ikut62pyYhTCEFeCLACKdiwHLcvwg04zGDWgaBFS600RAQ2GHCw

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

RUN chown -R nodejs:nodejs /app

USER nodejs
EXPOSE 80
ENV NODE_ENV=production

CMD ["npm", "start"]