import { Page } from '@playwright/test';

export const EditProduct = ({ page }: { page: Page }) => ({
  create: () => page.locator('button[type="submit"]:has-text("Create")').click(),
  productNewAttributes: {
    set: async (args: { name: string; description: string; number: string; revision: string }) => {
      const container = page
        .locator('button:has-text("Product New Attributes")')
        .locator('xpath=./following-sibling::*');

      await container.locator('[name="NAME"]').fill(args.name);
      await container.locator('[name="DESCRIPTIONSHORT"]').fill(args.description);
      await container.locator('[name="SKU"]').fill(args.number);
      await container.locator('[name="REVISION"]').fill(args.revision);
    },
  },
});
