FROM node:lts-buster-slim

COPY package*.json ./

RUN npm install

WORKDIR /app
