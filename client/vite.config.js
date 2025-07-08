import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vite.dev/config/
export default defineConfig({
  base: "/suribot/",
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "../phpServer/**/*",
          dest: "services",
        },
      ],
    }),
  ],
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
});
