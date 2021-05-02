FROM node:lts-alpine

WORKDIR /ui

COPY ui/package*.json .
RUN npm install

COPY ui .
RUN npm run build

FROM node:lts-alpine
RUN apk add postgresql-client

WORKDIR /api

COPY api/package*.json .
RUN npm install

COPY api .
RUN chmod +x migrate-db.sh

COPY --from=0 /ui/dist /api/static

EXPOSE 80
CMD [ "npm", "run", "start-with-db" ]
