FROM node:alpine

WORKDIR /usr/src/app

RUN mkdir /usr/src/app/files

COPY package* ./

RUN npm ci

COPY . .

# Set container as reader or writer of file files/output.log
ENV ROLE=""

CMD ["npm", "start"]