AlphaFundX – Funded Trading Challenge Platform
A production-ready SaaS platform for funded trading challenges, built with Next.js 16, Prisma, PostgreSQL, and a premium dark-mode fintech UI.

Current State
The project is a freshly scaffolded Next.js 16 app (App Router) with:

Tailwind CSS v4, shadcn/ui (base-vega style), Framer Motion, Recharts, Zustand, React Hook Form + Zod, TanStack Query, Lucide icons, and Prisma already in package.json
A single shadcn Button component installed
Default starter page/layout — no custom code yet
Custom font at /fonts/Martius-LV9L4.ttf
No database schema, no auth, no API routes
IMPORTANT

This is a massive project. I'll build it in 7 phased batches to ensure quality and allow you to test incrementally. Each phase produces a working, testable milestone.

Open Questions
IMPORTANT

Database Provider: Do you have a PostgreSQL database ready (e.g. Supabase, Neon, Railway, local Docker)? I need a DATABASE_URL for Prisma. I'll set up the schema and provide a .env.example — you can fill in the real connection string.

IMPORTANT

NextAuth Secret: I'll use next-auth v4 (already installed). Do you have an NEXTAUTH_SECRET preference, or should I generate one during setup?

IMPORTANT

Payment Gateway: You mentioned "Payment integration structure." Should I create a Stripe integration skeleton (webhook handler, checkout flow), or just the database models + UI for order tracking without a specific gateway?

Phase 1 — Foundation & Design System
Set up the architectural skeleton, design tokens, custom font, global styles, and core reusable components.

Design System & Theme
[MODIFY] 
globals.css
Replace the default light/dark theme with dark-mode-only AlphaFundX palette:
Primary Green #26FF5E, Secondary Green #19B226, Dark Green #264C47
Dark Gray #232930, Background #1C1A21
Add CSS custom properties for glow effects, glassmorphism, gradients
Configure the Martius font via @font-face
Set up typography scale (display, h1–h6, body, label, caption)
[MODIFY] 
layout.tsx
Remove Google font imports, use local Martius font
Add dark class to <html> permanently (no light mode)
Add Metadata: title "AlphaFundX | Funded Trading Challenges", description, OG tags
Wrap children with Providers component (TanStack Query, Toaster, etc.)
[MODIFY] 
next.config.ts
Add image domains config for user avatars/testimonials
Configure serverActions settings
Project Architecture
Create a modular feature-based directory structure:


app/
├── (marketing)/              # Public marketing pages
│   ├── layout.tsx            # Marketing layout (Navbar + Footer)
│   ├── page.tsx              # Landing page
│   ├── about/page.tsx
│   └── contact/page.tsx
├── (auth)/                   # Auth pages (login, register, etc.)
│   ├── layout.tsx            # Centered auth layout
│   ├── login/page.tsx
│   ├── register/page.tsx
│   ├── forgot-password/page.tsx
│   └── reset-password/page.tsx
├── (dashboard)/              # User dashboard (protected)
│   ├── layout.tsx            # Dashboard layout (sidebar + topbar)
│   ├── dashboard/page.tsx
│   ├── profile/page.tsx
│   ├── withdrawals/page.tsx
│   └── notifications/page.tsx
├── (admin)/                  # Admin dashboard (protected + role-gated)
│   ├── layout.tsx            # Admin layout (sidebar + topbar)
│   ├── admin/page.tsx        # Admin analytics
│   ├── admin/users/page.tsx
│   ├── admin/packages/page.tsx
│   ├── admin/withdrawals/page.tsx
│   ├── admin/orders/page.tsx
│   ├── admin/testimonials/page.tsx
│   ├── admin/cms/page.tsx
│   └── admin/settings/page.tsx
├── api/                      # API route handlers
│   ├── auth/[...nextauth]/route.ts
│   ├── users/route.ts
│   ├── packages/route.ts
│   ├── withdrawals/route.ts
│   ├── orders/route.ts
│   ├── testimonials/route.ts
│   ├── cms/route.ts
│   └── admin/...
├── layout.tsx                # Root layout
└── globals.css
components/
├── ui/                       # shadcn primitives (button, input, dialog, etc.)
├── marketing/                # Hero, Features, Pricing cards, etc.
├── dashboard/                # Dashboard widgets, stat cards, charts
├── admin/                    # Admin-specific components
└── shared/                   # Logo, Navbar, Footer, Sidebar, Toast, etc.
lib/
├── utils.ts                  # cn() utility
├── prisma.ts                 # Prisma client singleton
├── auth.ts                   # NextAuth config
├── auth-options.ts           # Auth options export
├── validations/              # Zod schemas
│   ├── auth.ts
│   ├── user.ts
│   ├── package.ts
│   ├── withdrawal.ts
│   └── cms.ts
├── actions/                  # Server Actions
│   ├── auth.ts
│   ├── user.ts
│   ├── package.ts
│   ├── withdrawal.ts
│   └── cms.ts
└── hooks/                    # Custom React hooks
    ├── use-toast.ts
    ├── use-auth.ts
    └── use-media-query.ts
prisma/
├── schema.prisma             # Database schema
└── seed.ts                   # Seed script
types/
└── index.ts                  # Shared TypeScript types
middleware.ts                 # Route protection middleware
Core UI Components (Phase 1)
[NEW] shadcn components to install
input, label, textarea, select, dialog, dropdown-menu, sheet, tabs, badge, avatar, separator, skeleton, tooltip, popover, command, table, card, switch, checkbox, radio-group, slider, progress, alert, toast / sonner
[NEW] components/shared/
Logo — SVG AlphaFundX brand mark + wordmark
Navbar — Glassmorphic sticky navbar with animated links, CTA button
Footer — Multi-column footer with branding
Sidebar — Collapsible dashboard/admin sidebar with Lucide icons
TopBar — User avatar, notifications bell, search
StatCard — Animated stat card with icon, value, trend
PageHeader — Reusable page title + breadcrumbs
LoadingSpinner — Branded spinner
EmptyState — Illustrated empty state
GlowCard — Card with green glow border effect
Phase 2 — Database Schema & Auth
Prisma Schema
[NEW] 
schema.prisma
Models:

Model	Purpose
User	id, email, password (hashed), name, phone, role (USER/ADMIN), status (ACTIVE/SUSPENDED), telegramUsername, avatar, createdAt, updatedAt
Account	NextAuth account linking
Session	NextAuth sessions
VerificationToken	Email verification / password reset
Package	id, name, accountSize, description, features (JSON), rules (JSON), originalPrice, discountedPrice, discountPercentage, isActive, displayOrder
Order	id, userId, packageId, amount, status (PENDING/COMPLETED/CANCELLED), paymentMethod, paymentReference, createdAt
UserPackage	id, userId, packageId, orderId, status (ACTIVE/BREACHED/PASSED/COMPLETED), currentBalance, currentProfit, profitPercentage, activatedAt
Withdrawal	id, userId, userPackageId, amount, paymentMethod, paymentDetails, status (PENDING/APPROVED/REJECTED/PAID), adminNote, processedAt, createdAt
Testimonial	id, userName, userImage, rating, content, isActive, createdAt
CmsContent	id, key (unique), title, content (JSON), isActive, updatedAt
SiteSettings	id, key (unique), value (JSON)
Notification	id, userId, title, message, isRead, type, createdAt
Authentication
[NEW] 
lib/auth-options.ts
Credentials provider with bcrypt password verification
JWT strategy with role in token
Session callback exposing user.id, user.role, user.status
Sign-in callback blocking suspended users
[NEW] 
app/api/auth/[...nextauth]/route.ts
GET + POST handlers
[NEW] 
middleware.ts
Protect /dashboard/* routes → redirect to /login
Protect /admin/* routes → redirect to /login, check role === ADMIN
Allow all (marketing) and (auth) routes
[NEW] Auth pages
/login — Email + password form, "Forgot password?" link
/register — Name, email, phone, password, confirm password
/forgot-password — Email form, sends reset token
/reset-password — Token validation + new password form
Phase 3 — Marketing Landing Page
Build the premium landing website with these sections:

[MODIFY] 
app/(marketing)/page.tsx
A single-page marketing site with sections:

Hero — Full-width gradient background, animated heading ("Trade Without Limits"), glowing CTA buttons, floating stats counters
Trusted By / Stats Bar — Animated counters: "10,000+ Traders", "$5M+ Funded", "95% Payout"
Features — 6 feature cards with Lucide icons, glassmorphic cards, staggered reveal
Funding Packages — Dynamic pricing cards from DB, discount badges, popular tag, hover glow
How It Works — Step-by-step timeline (1. Choose Plan → 2. Pass Challenge → 3. Get Funded → 4. Earn Profits)
Trading Rules — Expandable rules from CMS, clean table/accordion
Benefits — Icon grid highlighting profit splits, no time limits, etc.
Testimonials — Carousel of testimonials from DB, star ratings, user avatars
FAQ — Accordion with CMS-driven Q&A
Contact / CTA — Final CTA section with contact form
Footer — Branding, links, social icons, copyright
All sections use Framer Motion motion.div with whileInView animations, staggered children, and smooth scroll.

Phase 4 — User Dashboard
[NEW] Dashboard Layout
Collapsible sidebar with: Dashboard, My Packages, Withdrawals, Profile, Notifications
Top bar with user avatar, notification bell with count badge
Responsive: sidebar becomes sheet on mobile
[NEW] Dashboard Home (/dashboard)
Active Package Card — Package name, account size, status badge
Balance & Profit — Large stat cards with animated counters
Profit Chart — Recharts area chart showing profit over time
Recent Activity — Last 5 notifications/events
Quick Actions — Request withdrawal, view rules, contact support
[NEW] Profile Page (/dashboard/profile)
View/edit: name, email, phone, Telegram username, avatar
Change password form
Account info (registration date, status)
[NEW] Withdrawals Page (/dashboard/withdrawals)
New Withdrawal Form — Amount, payment method (crypto/bank), payment details
Withdrawal History Table — TanStack Table with status badges, date, amount
Status: color-coded badges (Pending=yellow, Approved=blue, Rejected=red, Paid=green)


Phase 5 — Admin Dashboard
[NEW] Admin Layout
Extended sidebar: Dashboard, Users, Packages, Withdrawals, Orders, Testimonials, CMS, Settings
Admin-branded top bar
[NEW] Admin Analytics (/admin)
Stat cards: Total Users, Active Users, Packages Sold, Total Revenue, Pending Withdrawals
Charts: Monthly registrations (bar chart), Revenue trend (line chart), Package distribution (pie chart)
Tables: Latest 10 users, Recent 10 purchases
[NEW] User Management (/admin/users)
TanStack Table: search, sort, filter by status/role, pagination
Actions per row: View, Edit, Suspend/Activate, Delete, Reset Password
User Detail Modal/Page: Full profile, edit balance, edit profit, change status
Balance/profit edits reflect immediately on user dashboard
[NEW] Package Management (/admin/packages)
CRUD interface for packages
Drag-and-drop display order
Enable/disable toggle
Form: name, account size, description, features (multi-line), rules (multi-line), original price, discounted price, discount %
[NEW] Withdrawal Management (/admin/withdrawals)
Table with filters: Pending, Approved, Rejected, Paid
Admin actions: Approve, Reject (with note), Mark as Paid
Bulk actions for batch processing
[NEW] Order Management (/admin/orders)
View all orders, filter by status, search by user
[NEW] Testimonial Management (/admin/testimonials)
CRUD: name, image upload, rating (1-5 stars), content, active toggle
[NEW] CMS Management (/admin/cms)
Edit sections: Hero, About, Features, FAQ, Trading Rules, Stats, Contact, Footer
Rich text / JSON editor for content blocks
[NEW] Site Settings (/admin/settings)
Site name, logo, contact email, social links, default settings

Phase 6 — API Routes & Server Actions
API Routes (app/api/)
All routes use proper error handling, Zod validation, auth checks, and role guards.

Endpoint	Methods	Auth	Purpose
/api/auth/[...nextauth]	GET, POST	Public	NextAuth
/api/auth/register	POST	Public	User registration
/api/auth/forgot-password	POST	Public	Send reset token
/api/auth/reset-password	POST	Public	Reset password
/api/users/me	GET, PATCH	User	Profile CRUD
/api/users/me/password	PATCH	User	Change password
/api/packages	GET	Public	List active packages
/api/orders	POST	User	Create order
/api/orders/me	GET	User	User's orders
/api/withdrawals	GET, POST	User	User withdrawals
/api/admin/users	GET, PATCH, DELETE	Admin	User management
/api/admin/users/[id]/balance	PATCH	Admin	Edit balance
/api/admin/packages	GET, POST, PATCH, DELETE	Admin	Package CRUD
/api/admin/withdrawals	GET, PATCH	Admin	Withdrawal management
/api/admin/orders	GET	Admin	All orders
/api/admin/testimonials	GET, POST, PATCH, DELETE	Admin	Testimonial CRUD
/api/admin/cms	GET, PATCH	Admin	CMS content
/api/admin/settings	GET, PATCH	Admin	Site settings
/api/admin/analytics	GET	Admin	Dashboard stats
Server Actions (lib/actions/)
Used for forms: login, register, profile update, withdrawal request, admin CRUD operations.

Phase 7 — Polish, Testing & Documentation
Framer Motion page transitions between route groups
Loading states: skeleton loaders for all data-dependent pages
Error boundaries with branded error UI
Empty states with illustrations
Toast notifications (sonner) for all CRUD operations
Responsive testing across all breakpoints
SEO: meta tags, Open Graph, structured data
.env.example with all required variables
README.md with setup, architecture docs, deployment guide
prisma/seed.ts to seed demo data (admin user, packages, testimonials)
Verification Plan
Automated Tests
bash

npx prisma validate        # Schema validation
npx prisma db push         # DB sync test
npm run build              # Full production build
npm run lint               # ESLint check
Manual Verification
Test all auth flows (register, login, forgot/reset password)
Test user dashboard data display and updates
Test admin CRUD for users, packages, withdrawals, testimonials, CMS
Test responsive design on mobile/tablet/desktop
Verify balance/profit admin edits reflect on user dashboard
Test withdrawal request flow end-to-end
Additional Dependencies Needed
bash

npm install bcryptjs @types/bcryptjs    # Password hashing
npm install sonner                       # Toast notifications  
npm install @tanstack/react-table        # Data tables
npm install sharp                        # Image optimization
npm install uploadthing @uploadthing/react  # File uploads (testimonial images)
WARNING

Scope & Timeline: This is equivalent to ~150+ files and a production SaaS platform. I recommend we build phase-by-phase so you can review and test each milestone. Each phase will produce working, testable code. Shall I proceed with Phase 1 first?





AlphaFundX – Comprehensive Project Initialization Prompt for Claude AI

You are a Senior Full Stack Engineer, UI/UX Designer, Software Architect, and Product Designer. Your task is to build a production-ready funded trading challenge platform named AlphaFundX.

The final result should be a premium, scalable, and modern SaaS application comparable in quality to platforms like FundingPips, FTMO, FundedNext, and Funding Traders, while maintaining a unique brand identity.

This is not a prototype. Build the project as if it is going to production. Every page, component, API, database model, and feature should be implemented with scalability, maintainability, and clean architecture in mind.

Project Name

AlphaFundX

Objective

Develop a complete funded trading challenge platform consisting of:

Marketing Website
User Authentication
User Dashboard
Admin Dashboard
Package Management
Payment System Structure
Withdrawal System
CMS Features
Complete Database Integration

The platform does not include any trading execution system.

Tech Stack

Use modern technologies suitable for a scalable SaaS application.

Recommended technologies:

Next.js 15 (App Router)
React
TypeScript
Tailwind CSS
shadcn/ui
Framer Motion
Prisma ORM
PostgreSQL
Auth.js / NextAuth
React Hook Form
Zod
TanStack Table
TanStack Query
Lucide Icons

Use the latest stable versions.

Project Architecture

Create an efficient, scalable, modular, and production-ready project structure following industry best practices.

Do not create a flat structure. Organize the project in a way that is easy to maintain, reusable, and suitable for long-term development.

Separate concerns properly between:

UI
Business Logic
Database
API
Authentication
Utilities
Components
Services

Follow modern architecture patterns.

Design System

The UI should feel premium, elegant, and futuristic while remaining professional.

The overall design language should be inspired by premium fintech SaaS websites such as:

https://fundingpips.com/
https://www.fundingrock.com/pay-after-you-pass/
https://the5ers.com/hyper-growth/


Do not copy these websites. Instead, create an original design inspired by their quality and user experience.

Theme

The website should be Dark Mode only.

There should be no light mode.

Color Palette

Use only the following color palette throughout the application.

Primary Green

#26FF5E

Secondary Green

#19B226

Dark Green

#264C47

Dark Gray

#232930

Background

#1C1A21

Use these colors consistently across:

Buttons
Cards
Navigation
Sidebar
Charts
Forms
Dashboard
Badges
Hover states
Borders
Highlights

Use gradients and glow effects subtly while maintaining a premium appearance.

Typography

A custom font named Martius has already been downloaded.

Use Martius as the primary typography across the entire application.

Ensure proper typography hierarchy:

Display headings
Section headings
Titles
Body text
Buttons
Labels
Dashboard statistics

The typography should feel modern and luxurious.

UI Guidelines

The interface should include:

Rounded cards
Large spacing
Premium shadows
Soft glowing effects
Smooth hover animations
Glassmorphism where appropriate
Beautiful loading states
Skeleton loaders
Empty states
Toast notifications
Elegant transitions
Framer Motion animations

Everything should feel like a premium SaaS application.

Landing Website

Create a premium landing website including:

Hero Section
Features
Funding Packages
How It Works
Trading Rules
Benefits
Statistics
Testimonials
FAQ
Contact Section
Footer

Every section should be professionally designed.

Authentication

Implement complete authentication including:

Registration
Login
Forgot Password
Reset Password
Protected Routes
Session Management
User Dashboard

Create a beautiful user dashboard.

The dashboard should display:

Purchased Package
Package Status
Current Balance
Current Profit
Profit Percentage
Withdrawal History
Notifications
Telegram Username
Profile Information

Users should be able to:

Update profile
Change password
Update Telegram username
Submit withdrawal requests
Withdrawal System

Users can submit withdrawal requests.

Each request should include:

Amount
Payment Method
Payment Details

Statuses:

Pending
Approved
Rejected
Paid

Users should be able to track all requests.

Packages

Packages should be fully dynamic.

Each package should include:

Package Name
Account Size
Description
Features
Rules
Original Price
Discounted Price
Discount Percentage
Active Status

The pricing should automatically calculate and display discounts.

Example:

Original Price

$200

Now

$150

25% OFF

Admin Dashboard

Build a professional SaaS Admin Dashboard with a responsive sidebar and analytics.

The admin panel should feel similar to enterprise admin portals.

Include:

Dashboard Analytics
User Management
Package Management
Withdrawal Management
Orders
Testimonials
CMS
Website Settings
User Management (Important)

The admin should have complete control over users.

Each user should display:

Full Name
Email Address
Phone Number
Password (stored securely; never displayed in plaintext—provide password reset functionality instead)
Registration Date
Account Status
Purchased Packages
Current Balance
Current Profit

The admin should be able to:

Search users
Filter users
View user profile
Edit user information
Suspend user
Activate user
Delete user
Reset user password
Edit account balance
Edit current profit
Edit account status

Balance changes should instantly reflect in the user's dashboard.

Package Management

The admin should have full control over packages.

Admin should be able to:

Create Package
Edit Package
Delete Package
Enable/Disable Package
Change Package Name
Change Rules
Change Features
Change Original Price
Change Discounted Price
Change Discount Percentage
Change Display Order

All package data should be stored dynamically.

No hardcoded package information.

Rules Management

The admin should be able to edit all challenge rules without modifying code.

Rules should be managed from the dashboard.

Testimonials

Create a complete testimonial management system.

Admin can:

Add Testimonials
Edit Testimonials
Delete Testimonials
Upload User Image
Set Rating
Enable/Disable Testimonial

Testimonials should automatically appear on the homepage.

Content Management

The admin should be able to edit website content without coding.

Editable content includes:

Homepage Hero
About Section
Features
FAQs
Trading Rules
Statistics
Contact Information
Footer
Dashboard Analytics

Display useful statistics including:

Total Users
Active Users
Packages Sold
Total Revenue
Pending Withdrawals
Approved Withdrawals
Monthly Registrations
Latest Users
Recent Purchases

Use modern charts and graphs.

Tables

Use professional data tables with:

Search
Sorting
Pagination
Filters
Bulk Actions
Export Options
Forms

All forms should include:

Validation
Error messages
Success states
Loading states

Use Zod validation.

Components

Create reusable UI components throughout the project.

Avoid duplicated code.

Everything should be component-driven.

Responsiveness

The entire application should be fully responsive across:

Desktop
Laptop
Tablet
Mobile

The dashboard should also work perfectly on smaller devices.

Animations

Use Framer Motion to create:

Page transitions
Card animations
Hover effects
Statistics counters
Loading animations
Section reveals

Animations should enhance the experience without affecting performance.

Database

Design a scalable relational database using Prisma.

Use proper relationships, indexes, and validation.

Avoid redundant models.

Security

Implement production-level security including:

Password hashing
Role-based authorization
Secure authentication
Input validation
Rate limiting
CSRF protection
Environment variables
Secure API routes
Code Quality

The codebase should be:

Clean
Fully typed
Modular
Reusable
Well documented where appropriate
Easy to maintain
Optimized for performance
Production ready

Avoid unnecessary complexity.

Deliverables

Generate a complete production-ready application including:

Fully functional frontend
Backend APIs
Authentication
User Dashboard
Admin Dashboard
Database Schema
Payment integration structure
Dynamic CMS
Responsive UI
Reusable components
Proper project architecture
Environment configuration
README with installation and deployment instructions

The final product should feel like a premium fintech SaaS platform that is polished, scalable, visually stunning, and ready for future expansion.
