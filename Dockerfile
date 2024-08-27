FROM mcr.microsoft.com/playwright:v1.40.0-jammy

WORKDIR /app

RUN apt-get update && apt-get install -y openjdk-11-jdk

COPY . .

RUN npm ci
RUN npx playwright install --with-deps
ENV CI=true

CMD npm test && cp -r allure-results /app/allure-results