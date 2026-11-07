import { defineConfig, loadEnv } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

export default defineConfig(({ mode }) => {
  // Make .env values (WEBHOOK_URL etc.) available to server code via process.env.
  // Real environment variables (e.g. on Vercel) always win.
  const env = loadEnv(mode, process.cwd(), "");
  for (const [k, v] of Object.entries(env)) if (process.env[k] === undefined) process.env[k] = v;
  return {
  // 5173 is Vite's default. Port 3000 is often reserved on Windows (EACCES).
  // To use another port: set PORT in .env, e.g. PORT=4000
  server: { port: Number(process.env.PORT) || 5173 },
  resolve: { dedupe: ["react", "react-dom", "@tanstack/react-router", "@tanstack/react-query"] },
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart({ server: { entry: "server" } }),
    nitro(),
    viteReact(),
  ],
};
});
