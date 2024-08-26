import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Успешный логин', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  // два следующих теста попробовать параметризовать
  test('Ошибка при неверном логине', async () => {
    const failedLoginText = 'Epic sadface: Username and password do not match any user in this service';
    await loginPage.login('standard_user', 'secretsauce');
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain(failedLoginText);
  });

  test('Заблокированный пользователь', async () => {
    const failedLoginText = 'Epic sadface: Sorry, this user has been locked out.';
    await loginPage.login('locked_out_user', 'secretsauce');
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain(failedLoginText);
  });

  test('Незаполнен логин или пароль ТУТ СДЕЛАТЬ ПАРАМЕТРИЗОВАННЫЙ ТЕСТ', async () => {
    const failedLoginText = 'Epic sadface: Username is required';
    await loginPage.login('standard_user', 'secretsauce');
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain(failedLoginText);
  });
});
