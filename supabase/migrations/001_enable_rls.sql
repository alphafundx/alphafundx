-- =====================================================
-- AlphaFundX: Row-Level Security (RLS) Configuration
-- =====================================================
-- 
-- PURPOSE: Lock down all tables so that even if someone
-- obtains the Supabase anon/authenticated keys, they
-- cannot read or modify ANY data directly.
--
-- Your app uses Prisma + the `postgres` role via 
-- DATABASE_URL, which bypasses RLS by default (superuser).
-- This migration only blocks the anon/authenticated roles
-- that Supabase exposes through its Data API / client SDKs.
--
-- HOW TO RUN: Copy this entire file into your Supabase
-- SQL Editor (Dashboard > SQL Editor) and click "Run".
-- =====================================================

-- =====================================================
-- STEP 1: Enable RLS on ALL tables
-- =====================================================
-- Even if you don't use the Supabase client library,
-- enabling RLS is defense-in-depth. If someone ever
-- gets your anon key, they hit a brick wall.

ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Account" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Session" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "VerificationToken" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Package" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Order" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "UserPackage" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Withdrawal" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Testimonial" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "CmsContent" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "SiteSettings" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Notification" ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- STEP 2: Revoke direct table access from public roles
-- =====================================================
-- By default, Supabase grants the `anon` and 
-- `authenticated` roles access to tables in the public
-- schema. We revoke ALL of that.

REVOKE ALL ON "User" FROM anon, authenticated;
REVOKE ALL ON "Account" FROM anon, authenticated;
REVOKE ALL ON "Session" FROM anon, authenticated;
REVOKE ALL ON "VerificationToken" FROM anon, authenticated;
REVOKE ALL ON "Package" FROM anon, authenticated;
REVOKE ALL ON "Order" FROM anon, authenticated;
REVOKE ALL ON "UserPackage" FROM anon, authenticated;
REVOKE ALL ON "Withdrawal" FROM anon, authenticated;
REVOKE ALL ON "Testimonial" FROM anon, authenticated;
REVOKE ALL ON "CmsContent" FROM anon, authenticated;
REVOKE ALL ON "SiteSettings" FROM anon, authenticated;
REVOKE ALL ON "Notification" FROM anon, authenticated;

-- =====================================================
-- STEP 3: Revoke default schema privileges
-- =====================================================
-- Prevent anon/authenticated from accessing any FUTURE
-- tables created in the public schema.

ALTER DEFAULT PRIVILEGES IN SCHEMA public
  REVOKE ALL ON TABLES FROM anon, authenticated;

ALTER DEFAULT PRIVILEGES IN SCHEMA public
  REVOKE ALL ON FUNCTIONS FROM anon, authenticated;

ALTER DEFAULT PRIVILEGES IN SCHEMA public
  REVOKE ALL ON SEQUENCES FROM anon, authenticated;

-- =====================================================
-- STEP 4: Create DENY-ALL policies (belt-and-suspenders)
-- =====================================================
-- With RLS enabled and no policies, access is denied by
-- default. But we add explicit deny-all policies as 
-- documentation and defense-in-depth.

-- Note: The postgres role (used by your Prisma connection)
-- bypasses RLS entirely, so your app keeps working.

-- User table: No direct access
CREATE POLICY "deny_all_user" ON "User"
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

-- Account table: No direct access
CREATE POLICY "deny_all_account" ON "Account"
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

-- Session table: No direct access
CREATE POLICY "deny_all_session" ON "Session"
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

-- VerificationToken table: No direct access
CREATE POLICY "deny_all_verification_token" ON "VerificationToken"
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

-- Package table: No direct access
CREATE POLICY "deny_all_package" ON "Package"
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

-- Order table: No direct access
CREATE POLICY "deny_all_order" ON "Order"
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

-- UserPackage table: No direct access
CREATE POLICY "deny_all_user_package" ON "UserPackage"
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

-- Withdrawal table: No direct access
CREATE POLICY "deny_all_withdrawal" ON "Withdrawal"
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

-- Testimonial table: No direct access
CREATE POLICY "deny_all_testimonial" ON "Testimonial"
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

-- CmsContent table: No direct access
CREATE POLICY "deny_all_cms_content" ON "CmsContent"
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

-- SiteSettings table: No direct access
CREATE POLICY "deny_all_site_settings" ON "SiteSettings"
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

-- Notification table: No direct access
CREATE POLICY "deny_all_notification" ON "Notification"
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

-- =====================================================
-- STEP 5: Verify RLS is enabled on all tables
-- =====================================================
-- Run this query after the migration to confirm:

-- SELECT tablename, rowsecurity 
-- FROM pg_tables 
-- WHERE schemaname = 'public';
--
-- Every row should show rowsecurity = true.

-- =====================================================
-- DONE! Your database is now locked down.
-- =====================================================
-- 
-- Your Next.js API routes continue to work because they
-- connect as the `postgres` superuser role via Prisma,
-- which bypasses RLS.
--
-- Anyone trying to connect via the Supabase anon key,
-- authenticated key, or the Supabase JS client will be
-- completely blocked from reading or writing ANY data.
