FROM node:18.7.0

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "start"]