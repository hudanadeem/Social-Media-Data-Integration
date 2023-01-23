FROM node:18-slim

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ARG PORT=3000
ENV PORT $PORT

RUN npm i npm@latest -g

WORKDIR /app/frontend

COPY package.json package-lock.json ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]
