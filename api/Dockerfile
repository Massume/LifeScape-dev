FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate && npx prisma migrate deploy
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
