import { Page } from '@playwright/test';
import { Toasts } from '@src/e2e/widgets/toasts';

export const Login = ({ page }: { page: Page }) => ({
  toasts: Toasts({ page }),
  navigate: () => page.goto('/login'),
  set: async (args: { email: string; password: string }) => {
    await page.locator('[name="email"]').fill(args.email);
    await page.locator('[name="password"]').fill(args.password);
  },
  submit: () => page.locator('[name="Log In"]').click(),
});
