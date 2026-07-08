Phase 1 — Walkthrough
What Was Built
Phase 1 establishes the complete foundation for Tradexa: project architecture, design system, database schema, authentication, all route layouts, and every page in the application (with placeholder data where dynamic content will later come from the database).

Files Created / Modified
Design System & Config
File	Purpose
globals.css
Dark-only Tradexa theme, Martius font, glow/glass utilities, custom scrollbar, animations
layout.tsx
Root layout with Martius font, dark class, SEO metadata, Providers wrapper
next.config.ts
React Compiler, image remotePatterns, bcryptjs external
.env.example
All required env vars documented
.env
Local dev env with placeholder values
Database & Auth
File	Purpose
schema.prisma
11 models: User, Account, Session, VerificationToken, Package, Order, UserPackage, Withdrawal, Testimonial, CmsContent, SiteSettings, Notification
seed.ts
Seeds admin, demo user, 5 packages, 6 testimonials, CMS content, demo order
prisma.ts
Prisma client singleton
auth-options.ts
NextAuth credentials provider, JWT, role/status in session
middleware.ts
Protects /dashboard/* and /admin/* routes
route.ts
NextAuth API handlers
register/route.ts
User registration API
Validation Schemas
File	Schemas
auth.ts
login, register, forgotPassword, resetPassword, changePassword
user.ts
updateProfile, adminUpdateUser, adminUpdateBalance
package.ts
createPackage, updatePackage
withdrawal.ts
createWithdrawal, adminUpdateWithdrawal
cms.ts
updateCmsContent, createTestimonial, updateSiteSettings
Shared Components (10 total)
Component	File
Logo	
logo.tsx
Navbar	
navbar.tsx
Footer	
footer.tsx
Sidebar	
sidebar.tsx
TopBar	
top-bar.tsx
StatCard	
stat-card.tsx
GlowCard	
glow-card.tsx
PageHeader	
page-header.tsx
LoadingSpinner	
loading-spinner.tsx
EmptyState	
empty-state.tsx
Route Layouts (4 route groups)
Group	Layout	Purpose
(marketing)	
layout.tsx
Navbar + Footer
(auth)	
layout.tsx
Centered card, gradient bg
(dashboard)	
layout.tsx
Sidebar + TopBar (auth protected)
(admin)	
layout.tsx
Admin sidebar + TopBar (role-gated)
Pages (20 total)
Marketing: Landing page with Hero, Features, Packages, How It Works, Rules, Testimonials, FAQ, CTA

Auth (4): Login, Register, Forgot Password, Reset Password

Dashboard (5): Home, Packages, Withdrawals, Profile, Notifications

Admin (8): Dashboard, Users, Packages, Orders, Withdrawals, Testimonials, CMS, Settings

Design System Highlights
Colors: #26FF5E primary green, #19B226 secondary, #264C47 dark green, #232930 card, #1C1A21 background
Utilities: .glass, .glow, .glow-strong, .text-gradient-green, .bg-gradient-hero, .bg-grid, .border-glow, .pulse-green, .shimmer
Typography: Martius font via @font-face, loaded locally from /fonts/Martius-LV9L4.ttf
Scrollbar: Custom dark scrollbar with green accent
Selection: Green-tinted text selection
Seed Credentials
Role	Email	Password
Admin	
admin@tradexa.com
Admin@123
User	
user@tradexa.com
User@123
Setup Commands
bash

# 1. Install tsx for seed script
npm install -D tsx
# 2. Generate Prisma client
npx prisma generate
# 3. Start dev server
npm run dev
# 4. Once you have a PostgreSQL database, update .env then:
npm run db:push     # Push schema to database
npm run db:seed     # Seed demo data
npm run db:studio   # Open Prisma Studio (optional)
Next Steps — Phase 2
Phase 2 will focus on:

Connecting to a real PostgreSQL database
Wiring all pages to fetch data from the database via API routes and Server Actions
Building full CRUD for admin (users, packages, withdrawals, testimonials, CMS)
Implementing Stripe checkout flow + webhooks
Adding Recharts visualizations with real data
Making the landing page dynamic (packages/testimonials from DB)