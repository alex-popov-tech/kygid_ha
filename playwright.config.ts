import type { PlaywrightTestConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

const outputFolder = 'artifacts';
const isCi = !!process.env.CI;

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 2 * 60 * 1000, // Maximum time one test can run for.
  expect: {
    timeout: parseInt(process.env.TIMEOUT as string),
  },
  fullyParallel: false, // Run tests in files in parallel
  retries: parseInt(process.env.MAX_RETRIES as string, 10),
  workers: parseInt(process.env.MAX_PARALLEL_THREADS as string),
  reporter: [
    ['list'],
    ['allure-playwright', { outputFolder: `${outputFolder}/allure/`, detail: true }],
    // [
    //   'html',
    //   { open: isCi ? 'never' : 'on-failure', outputFolder: `${outputFolder}/pw-report/`, outputFile: 'index.html' },
    // ],
    ['junit', { outputFile: `${outputFolder}/junit/junit.xml` }],
  ],

  projects: [
    {
      name: 'e2e',
      use: {
        baseURL: process.env.BASE_URL,
        headless: !!process.env.CI,
        actionTimeout: parseInt(process.env.TIMEOUT as string, 10),
        trace: 'off',
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
      },
    },
  ],

  outputDir: `${outputFolder}/others/`, // Folder for test artifacts such as screenshots, videos, traces, etc.
};

export default config;
