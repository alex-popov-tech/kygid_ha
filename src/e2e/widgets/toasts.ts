import { Page, expect } from '@playwright/test';

export const Toasts = ({ page }: { page: Page }) => ({
  shouldBe: async (...toasts: string[]) => {
    const elements = page.locator('.Toastify__toast');
    await expect
      .poll(async () => {
        const texts = await Promise.all(
          Array(await elements.all().then((it) => it.length))
            .fill('')
            .map((_, i) => elements.nth(i).innerText())
        );
        return { texts, length: texts.length };
      })
      .toMatchObject({ length: toasts.length, texts: toasts });
  },
});
