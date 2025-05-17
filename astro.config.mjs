// @ts-check
import { defineConfig } from "astro/config";

import preact from "@astrojs/preact";
import vercel from "@astrojs/vercel";
import { envField } from "astro/config";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
  integrations: [preact()],
  env: {
    schema: {
      BLOB_READ_WRITE_TOKEN: envField.string({
        context: "server",
        access: "secret",
      }),
    },
  },
});
