# AlphaFundX

A modern funded trading platform built with Next.js 16, Prisma, and Tailwind CSS v4. Traders can purchase evaluation packages, pass trading challenges, and earn real profits with up to a 90% profit split.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | PostgreSQL (via Supabase) |
| ORM | Prisma |
| Auth | NextAuth.js (Credentials) |
| State | Zustand (client), TanStack React Query (server) |
| Animations | Framer Motion |
| Forms | React Hook Form + Zod |
| UI | Custom components + Lucide Icons |
| Toasts | Sonner |

## Architecture

```
app/
├── (marketing)/     # Public pages (home, about, contact)
├── (auth)/          # Login, register, forgot/reset password
├── (dashboard)/     # User dashboard (packages, withdrawals, profile)
├── (admin)/         # Admin panel (users, packages, orders, CMS, settings)
└── api/             # API routes
    ├── users/       # User profile endpoints
    ├── packages/    # Public package listing
    ├── orders/      # Order creation & history
    ├── withdrawals/ # Withdrawal requests
    └── admin/       # Admin CRUD (protected)
```

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (recommend [Supabase](https://supabase.com))

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-org/alphafundx.git
cd alphafundx

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env with your database URL, NextAuth secret, etc.

# 4. Generate Prisma client
npx prisma generate

# 5. Push schema to database
npx prisma db push

# 6. Seed demo data
npx prisma db seed

# 7. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@alphafundx.com` | `Admin@123` |
| User | `trader@alphafundx.com` | `User@123` |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:push` | Push Prisma schema to database |
| `npm run db:seed` | Seed database with demo data |
| `npm run db:studio` | Open Prisma Studio (visual DB editor) |
| `npm run db:generate` | Regenerate Prisma client |

## Key Features

### For Traders
- **Browse Packages** — 5 funded account tiers ($10K–$200K)
- **Secure Auth** — Register, login, password reset with hashed credentials
- **Dashboard** — View active packages, balances, profit tracking
- **Withdrawals** — Request profit withdrawals with status tracking
- **Notifications** — Real-time updates on order and withdrawal status

### For Admins
- **User Management** — View, edit, suspend, or delete users
- **Package Management** — Full CRUD for trading packages
- **Order Tracking** — Monitor all platform orders
- **Withdrawal Processing** — Approve, reject, or process payouts
- **Testimonials** — Manage customer testimonials shown on the site
- **CMS** — Edit hero, about, footer, and contact content
- **Site Settings** — Configure platform-wide settings
- **Analytics** — Revenue charts, user growth, and key metrics

## Deployment

### Vercel (Recommended)

1. Push your repo to GitHub
2. Import in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy — Vercel auto-detects Next.js

### Manual

```bash
npm run build
npm run start
```

## License

Private — All rights reserved.
