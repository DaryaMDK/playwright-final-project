export class CheckoutPage {
  constructor(page) {
    this.page = page;
    // checkout page
    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.zipCodeInput = page.locator('#postal-code');
    this.cancelButton = page.locator('#cancel');
    this.continueButton = page.locator('#continue');
    this.errorContainer = page.locator('.error');

    // вторая часть страницы
    this.taxSum = page.locator('.summary_tax_label');
    this.allSum = page.locator('.summary_total_label');
    this.checkoutButton = page.locator('#continue');
    this.finishButton = page.locator('#finish');
  }
}
