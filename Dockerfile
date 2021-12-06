FROM node:alpine

WORKDIR /usr/app

COPY . .

RUN npm i

EXPOSE 8080

ENTRYPOINT [ "npm", "start" ]
