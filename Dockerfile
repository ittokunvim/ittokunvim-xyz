FROM node:20.4.0-bookworm-slim as base
WORKDIR /app

RUN ["npm", "install", "-g", "npm@9.8.0"]

COPY ./package*.json ./
COPY ./tsconfig.json ./

RUN ["npm", "install"]
