FROM node:11

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY .nuxt .

RUN npm install
RUN npm run build

ENV HOST 0.0.0.0
