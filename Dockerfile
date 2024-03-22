# Этап 1: Сборка
FROM node:16-alpine as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Этап 2: Запуск
FROM node:16-alpine
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/build ./build
COPY .env ./

# Установка PM2
RUN npm install pm2 -g

EXPOSE 3000
# Используем PM2 для запуска приложения
CMD ["pm2-runtime", "start", "build/index.html"]