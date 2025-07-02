FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install --omit=dev
RUN npm run build

EXPOSE ${PORT}
CMD ["npm", "start"]
