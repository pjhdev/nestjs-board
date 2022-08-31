FROM node:16.16.0 AS builder

WORKDIR /app

RUN apt-get update || : && apt-get install python3 -y

COPY ./app/package*.json ./

RUN npm install

COPY ./app .

RUN npm run build && npm prune

#---------------------------------------------------------------------------

FROM node:16.16.0-alpine

ARG NODE_OPTIONS
ENV NODE_OPTIONS=${NODE_OPTIONS}

WORKDIR /app

#RUN apk --no-cache add --virtual builds-dependencies build-base python3 && ln -sf python3 /usr/bin/python

#COPY --from=builder /app/package*.json .

#RUN npm install --only=production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/envs ./envs

EXPOSE 3000
CMD ["node", "dist/src/main"]
