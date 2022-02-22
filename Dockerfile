FROM node:14-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN ["npm","install"]

COPY . .

RUN ["npm","run","build"]

FROM nginx:mainline-alpine as server

WORKDIR /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d/

COPY  --from=builder /app/build ./
