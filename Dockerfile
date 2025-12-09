FROM node:14

WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY index.js index.js
COPY app.js app.js

RUN npm install

COPY . .

ENTRYPOINT [ "node","app.js" ]