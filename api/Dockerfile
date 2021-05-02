FROM node:lts-alpine

WORKDIR /src-api
COPY package*.json ./
RUN npm install
COPY . .

RUN apk add postgresql && chmod +x migrate-db.sh

EXPOSE 80
CMD [ "npm", "run", "start-with-db" ]
