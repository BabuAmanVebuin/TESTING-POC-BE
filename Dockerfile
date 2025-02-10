FROM node:18-alpine as base
WORKDIR /usr/src/app
# Install Dependencies
COPY yarn.lock package.json ./
RUN rm -rf node_modules && yarn install --frozen-lockfile

FROM node:18-alpine as builder
RUN apk add openjdk11
WORKDIR /usr/src/app
COPY --from=base /usr/src/app/ /usr/src/app/
# Copy Project files
COPY . .
RUN yarn build

# Non-root User
# https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md#non-root-user
USER node
EXPOSE 8000
WORKDIR /usr/src/app/_build
ENTRYPOINT [ "node", "index.js" ]

FROM alpine as openapi
WORKDIR /usr/src/app/_build/api-docs
COPY --from=builder /usr/src/app/_build/api-docs/_openapi.json .
