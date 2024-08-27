# Используем официальный образ Playwright, который уже включает необходимые зависимости
FROM mcr.microsoft.com/playwright:v1.46.1-jammy

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем файлы package.json и package-lock.json внутрь контейнера
COPY package.json package-lock.json ./

# Копируем остальные файлы проекта
COPY . .

# Устанавливаем зависимости
RUN npm ci

# Устанавливаем переменные окружения
ENV CI=true

# Команда для запуска тестов и копирования результатов Allure
CMD ["sh", "-c", "npm test && cp -r allure-results/* /app/allure-results"]
