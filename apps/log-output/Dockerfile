FROM node:alpine

WORKDIR /usr/src/app

RUN mkdir /usr/src/app/files

COPY package* ./

RUN npm ci

COPY . .

ENV ROLE=""
ENV PORT=3000

# Endpoint to pingpong count service
# http://<svc-name>:<svc-port>/pingpong/count
ENV SVC_PINGPONGCOUNT_ENDPOINT=''

CMD ["npm", "start"]