FROM node:lts-buster-slim

WORKDIR /web

COPY package*.json ./

RUN npm install
