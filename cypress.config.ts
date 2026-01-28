import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config({ path: ".env.e2e" });

export default defineConfig({
  chromeWebSecurity: false,
  env: {
    USER_EMAIL: process.env.USER_EMAIL,
    USER_PASSWORD: process.env.USER_PASSWORD,
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    testIsolation: true,
    specPattern: "src/**/*.e2e.ts",
  },
});
