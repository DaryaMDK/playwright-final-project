export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.zipCodeInput = page.locator('#postal-code');
    this.cancelButton = page.locator('#cancel');
    this.continueButton = page.locator('#continue');
    this.errorContainer = page.locator('.error');

    this.taxSum = page.locator('.summary_tax_label');
    this.allSum = page.locator('.summary_total_label');
    this.checkoutButton = page.locator('#continue');
    this.finishButton = page.locator('#finish');
  }

  async fillYourInformation(firstName, lastName, zipCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.zipCodeInput.fill(zipCode);
    await this.continueButton.click();
  }

  async getCartCount() {
    return await this.allSum.textContent();
  }

  async goToFinishedPage() {
    await this.finishButton.click();
  }
}
