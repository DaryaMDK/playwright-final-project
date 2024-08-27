import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MenuPage } from '../pages/MenuPage';

test.describe('Тесты для логина', () => {
  let loginPage;
  let menuPage;
  const userName = process.env.USER_NAME;
  const password = process.env.PASSWORD;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Успешный логин', async ({ page }) => {
    await loginPage.login(userName, password);
    await expect(page).toHaveURL('/inventory.html');
  });

  test('Успешный выход из аккаунта через меню', async ({ page }) => {
    menuPage = new MenuPage(page);
    await loginPage.login(userName, password);
    await menuPage.logout();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

  test('Проверка обязательного заполнеия поля username', async () => {
    const failedLoginText = 'Epic sadface: Username is required';
    await loginPage.login('', 'secretsauce');
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain(failedLoginText);
  });

  const loginScenarios = [
    {
      username: 'standard_user',
      password: 'secretsauce',
      expectedError: 'Epic sadface: Username and password do not match any user in this service',
    },
    {
      username: 'locked_out_user',
      password: 'secret_sauce',
      expectedError: 'Epic sadface: Sorry, this user has been locked out.',
    },
  ];

  loginScenarios.forEach(({ username, password, expectedError }) => {
    test(`Ошибки при логине ${username}`, async () => {
      await loginPage.login(username, password);
      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage).toContain(expectedError);
    });
  });
});
