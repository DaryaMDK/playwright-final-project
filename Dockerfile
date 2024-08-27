# Используем официальный образ Node.js версии 20.11 в качестве базового образа
FROM node:20.11

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем файлы package.json и package-lock.json внутрь контейнера
COPY package.json package-lock.json ./

COPY . .

RUN npm ci
RUN npx playwright install --with-deps
ENV CI=true

CMD npm test && cp -r allure-results /app/allure-results