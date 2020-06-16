FROM node:10-alpine

WORKDIR /usr/app
COPY package.json package-lock.json ./

RUN npm i
 
COPY . .

CMD [ "npm", "start" ]