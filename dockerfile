FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./database ./database
EXPOSE 3000
CMD ["npm", "start"]
