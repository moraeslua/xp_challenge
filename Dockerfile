FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./

COPY prisma ./prisma/

RUN npm install

COPY . .

EXPOSE 3000

CMD [  "npm", "run", "start" ]