# Readmi Solutions

Marketing website for Readmi Solutions — *Powering Your Digital Growth. Built with a Human Touch.*

Built with TanStack Start (React 19), Tailwind CSS 4 and Nitro.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Deploy (Vercel)

Import the repo in Vercel. Nitro detects Vercel automatically; no extra settings needed.
Build command: `npm run build`. Leave the output directory empty.

## Deploy (Cloudflare, later)

Set `NITRO_PRESET=cloudflare_module` (or `cloudflare_pages`) in the build environment.
