# iTafakkur Web

The web app for [iTafakkur](https://itafakkur.com) — a daily Muslim companion.

## Stack

- **Framework:** Next.js 16 (App Router, React Server Components)
- **Styling:** Tailwind CSS v4 (CSS-first config)
- **Auth:** Supabase (shared session with mobile app)
- **3D:** React Three Fiber (hero scene only)
- **Deployment:** Vercel
- **Backend:** Existing FastAPI on Railway (shared with mobile)

## Local development

```bash
npm install
cp .env.local.example .env.local
# Fill in NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY from
# the mobile app's frontend/.env (same values, shared Supabase project)
npm run dev
```

Open http://localhost:3000.

## Related repos

- **Mobile app:** `789shak/quranchat` (Expo React Native)
- **Marketing site (legacy):** `789shak/itafakkur-website` (GitHub Pages,
  will be replaced by this project at Week 8 launch)

## Deployment

Auto-deploys to Vercel on every push to `main`. Staging URL:
[itafakkur-web.vercel.app](https://itafakkur-web.vercel.app).

Production DNS cutover from GitHub Pages to Vercel is planned for
~September 2026.

## Contact

`support.itafakkur@gmail.com`
