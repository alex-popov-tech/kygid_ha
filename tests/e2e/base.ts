import { test as base } from '@playwright/test';
import { App } from 'src/e2e';

type MyFixtures = {
  app: ReturnType<typeof App>;
  pause: () => Promise<void>;
};

export const test = base.extend<MyFixtures>({
  pause: async ({ page }, use) => {
    await use(() => page.pause());
  },
  app: async ({ context, page }, use) => {
    const app = App({ context, page });
    await use(app);
    await page.close();
    await context.close();
  },
});
