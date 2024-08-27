import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';
import { ItemPage } from '../pages/ItemPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { OrderResultPage } from '../pages/OrderResultPage';

test.describe('Тесты для товаров', () => {
  let productPage;
  let loginPage;
  let cartPage;
  let itemPage;
  let checkoutPage;
  let orderResultPage;
  const userName = process.env.USER_NAME;
  const password = process.env.PASSWORD;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    itemPage = new ItemPage(page);
    checkoutPage = new CheckoutPage(page);
    orderResultPage = new OrderResultPage(page);

    await loginPage.goto();
    await loginPage.login(userName, password);
  });

  test('Просмотр товара', async () => {
    const expectedTitle = 'Sauce Labs Bolt T-Shirt';
    const expectedPrice = '$15.99';
    await productPage.viewProduct(2);
    await itemPage.checkProduct(expectedTitle, expectedPrice);
    const isVisible = await itemPage.isImageVisible();
    expect(isVisible).toBe(true);
  });

  test('Добавление товара в корзину с главной', async () => {
    const expectedTitle = 'Sauce Labs Backpack';
    await productPage.addItemToCart();
    await productPage.goToCart();
    const title = await productPage.getCartCount();
    expect(title).toContain(expectedTitle);
  });

  test('Добавление товара в корзину со страницы товара', async () => {
    const expectedTitle = 'Sauce Labs Fleece Jacket';
    await productPage.viewProduct(3);
    await itemPage.addItemToCart();
    await productPage.goToCart();
    const title = await productPage.getCartCount();
    expect(title).toContain(expectedTitle);
  });

  test('Удаление товара', async () => {
    await productPage.addItemToCart();
    await productPage.goToCart();
    await productPage.getCartCount();
    await cartPage.goToContinueShopping();
    await cartPage.deleteProduct();
    await productPage.goToCart();

    const isEmpty = await cartPage.isCartEmpty();
    expect(isEmpty).toBe(true);
    const isBadgeEmpty = await cartPage.isCartBadgeEmpty();
    expect(isBadgeEmpty).toBe(true);
  });

  test('Сортировка стоимости по возрастанию', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.switchSort({ value: 'lohi' });
    const isSorted = await productPage.pricesSortedAsc();
    expect(isSorted).toBe(true);
  });

  test('Проверка общей стоимости товаров', async ({ page }) => {
    const expectedSum = '140.34';
    await productPage.addAllProductToCart();
    await productPage.goToCart();
    await cartPage.goToCheckout();
    await checkoutPage.fillYourInformation('vasya', 'pupkin', '100102');
    const title = await checkoutPage.getCartCount();
    expect(title).toContain(expectedSum);
  });

  test('Успешное оформление заказа', async () => {
    await productPage.addAllProductToCart();
    await productPage.goToCart();
    await cartPage.goToCheckout();
    await checkoutPage.fillYourInformation('ivan', 'ivanov', '100100');
    await checkoutPage.goToFinishedPage();
    await orderResultPage.checkResultPage('Checkout: Complete!', 'Thank you for your order!');
  });
});
