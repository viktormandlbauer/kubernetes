FROM node:alpine

WORKDIR /usr/src/app

RUN mkdir /usr/src/app/files

COPY package* ./

RUN npm ci

COPY . .

ENV ROLE=""

CMD ["npm", "start"]