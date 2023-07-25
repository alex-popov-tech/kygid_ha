import { Page, expect } from '@playwright/test';

export const Products = ({ page }: { page: Page }) => {
  const tableContainer = page.locator('[class *= "sectionWrapper"]').first();
  const tableBodyContainer = tableContainer.locator('tbody').first();
  const attributesContainer = page.locator('[class *= "productAttributesContainer"]').first();
  return {
    navigate: () => page.goto('/products'),
    shouldBeOpened: () => expect(page).toHaveURL(/products\?/),
    addItem: async (args: 'TCPN' | 'Software' | 'Technical Information' | 'Project') => {
      await page.locator('#create-button:has-text("New Item")').click();
      await page.locator(`ul[role="menu"] span[aria-label="${args}"]`).click();
    },
    table: {
      header: {},
      body: {
        byNumber: (value: string) => ({
          open: () =>
            tableBodyContainer.locator(`tr:has-text("${value}")`).first().locator('td:nth-of-type(1)').click(),
        }),
      },
    },
    attributes: {
      shouldBe: async (args: {
        name: string;
        description: string;
        number: string;
        revision: string;
        type: 'TCPN' | 'Software' | 'Technical Information' | 'Project';
      }) => {
        await expect(attributesContainer.locator('[class *= "attribute"]:has-text("Item Name")')).toContainText(
          args.name
        );
        await expect(attributesContainer.locator('[class *= "attribute"]:has-text("Item Description")')).toContainText(
          args.description
        );
        await expect(attributesContainer.locator('[class *= "attribute"]:has-text("Item Number")')).toContainText(
          args.number
        );
        await expect(attributesContainer.locator('[class *= "attribute"]:has-text("Item Type")')).toContainText(
          args.type
        );
        await expect(attributesContainer.locator('[class *= "attribute"]:has-text("Revision")')).toContainText(
          args.revision
        );
      },
    },
  };
};
