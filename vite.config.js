// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import path from "path";
// // https://vitejs.dev/config/

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(new URL(".", import.meta.url).pathname, "./src"),
//     },
//   },
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@shadcn": path.resolve(__dirname, "src/shadcn"),
    },
  },
});
