FROM node:alpine AS base

RUN npm install -g pnpm

FROM base as depencencies

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

FROM base AS build

WORKDIR /app
COPY . .
COPY --from=depencencies /app/node_modules ./node_modules
RUN pnpm build
RUN pnpm prune --prod

FROM base AS deploy

WORKDIR /app
COPY --from=build /app/dist .
COPY --from=build /app/node_modules ./node_modules
RUN mkdir data

ENV MONGODB_URL mongodb://db:27017/mindy
EXPOSE 8080
VOLUME [ "/app/data" ]

CMD ["node", "/app/server.js"]