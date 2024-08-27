# Используем официальный образ Node.js версии 20.11 в качестве базового образа
FROM node:20.11

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Устанавливаем JDK для Allure
RUN apt-get update && apt-get install -y openjdk-11-jdk

# Копируем файлы package.json и package-lock.json внутрь контейнера
COPY package.json package-lock.json ./

# Копируем остальные файлы проекта
COPY . .

# Устанавливаем зависимости
RUN npm ci

# Устанавливаем зависимости Playwright
RUN npx playwright install --with-deps

# Устанавливаем переменные окружения
ENV CI=true

# Команда для запуска тестов и копирования результатов Allure
CMD ["sh", "-c", "npm test && cp -r allure-results/* /app/allure-results"]
