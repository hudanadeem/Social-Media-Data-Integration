FROM node:18-slim

ARG PORT=8080
ENV PORT $PORT

RUN npm i npm@latest -g

WORKDIR /app/backend

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm","start"]
