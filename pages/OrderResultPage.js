import { expect } from '@playwright/test';

export class OrderResultPage {
  constructor(page) {
    this.page = page;
    this.backHomeButton = page.locator('#back-to-products');
    this.finishButton = page.locator('#finish');
    this.title = page.locator('.title');
    this.completeHeaderTitle = page.locator('.complete-header');
  }

  async checkResultPage(expectedTitle, completeHeaderTitle) {
    const title = await this.title.textContent();
    const completeHeader = await this.completeHeaderTitle.textContent();
    expect(this.backHomeButton).toBeVisible();
    expect(title).toContain(expectedTitle);
    expect(completeHeader).toContain(completeHeaderTitle);
  }
}
