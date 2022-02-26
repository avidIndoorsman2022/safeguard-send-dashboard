import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/safeguard-send-dashboard/",
  // Commented out result:
  //   "npm run build"
  //   "npm run deploy"
  //   result: updated locally on /dist
  //   result: update remotely on /gh-pages
  //   result: no update on git

  // Uncommented out result:
  //   "npm run build"
  //   "npm run deploy"
  //   result: updated locally on /dist
  //   result: update remotely on /gh-pages
  //   result: index.html update on git
});
