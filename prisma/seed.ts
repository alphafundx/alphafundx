import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // ==========================================
  // 1. Create Admin User
  // ==========================================
  const adminPassword = await bcrypt.hash("Admin@123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@alphafundx.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@alphafundx.com",
      password: adminPassword,
      role: "ADMIN",
      status: "ACTIVE",
      phone: "+1234567890",
    },
  });
  console.log(`✅ Admin user created: ${admin.email}`);

  // ==========================================
  // 2. Create Packages
  // ==========================================
  const packagesData = [
    {
      name: "Starter",
      accountSize: 10000,
      description: "Perfect for beginner traders looking to prove their skills.",
      features: ["$10,000 Account", "80% Profit Split", "No Time Limit", "Daily Drawdown: 5%", "Max Drawdown: 10%", "Free Retake on Profit Target"],
      rules: ["Profit Target: 8% (Phase 1), 5% (Phase 2)", "Daily Drawdown: 5%", "Max Drawdown: 10%", "Minimum 5 Trading Days", "No Time Limit"],
      originalPrice: 99,
      discountedPrice: 49,
      discountPercentage: 50,
      isPopular: false,
      displayOrder: 1,
    },
    {
      name: "Standard",
      accountSize: 25000,
      description: "For traders ready to scale their trading career.",
      features: ["$25,000 Account", "80% Profit Split", "No Time Limit", "Daily Drawdown: 5%", "Max Drawdown: 10%", "Free Retake on Profit Target"],
      rules: ["Profit Target: 8% (Phase 1), 5% (Phase 2)", "Daily Drawdown: 5%", "Max Drawdown: 10%", "Minimum 5 Trading Days", "No Time Limit"],
      originalPrice: 199,
      discountedPrice: 149,
      discountPercentage: 25,
      isPopular: false,
      displayOrder: 2,
    },
    {
      name: "Professional",
      accountSize: 50000,
      description: "Our most popular plan. Ideal balance of size and affordability.",
      features: ["$50,000 Account", "85% Profit Split", "No Time Limit", "Daily Drawdown: 5%", "Max Drawdown: 10%", "Free Retake on Profit Target", "Priority Support"],
      rules: ["Profit Target: 8% (Phase 1), 5% (Phase 2)", "Daily Drawdown: 5%", "Max Drawdown: 10%", "Minimum 5 Trading Days", "No Time Limit"],
      originalPrice: 299,
      discountedPrice: 199,
      discountPercentage: 33,
      isPopular: true,
      displayOrder: 3,
    },
    {
      name: "Elite",
      accountSize: 100000,
      description: "For experienced traders seeking significant capital.",
      features: ["$100,000 Account", "90% Profit Split", "No Time Limit", "Daily Drawdown: 5%", "Max Drawdown: 10%", "Free Retake on Profit Target", "Priority Support", "1-on-1 Consultation"],
      rules: ["Profit Target: 8% (Phase 1), 5% (Phase 2)", "Daily Drawdown: 5%", "Max Drawdown: 10%", "Minimum 5 Trading Days", "No Time Limit"],
      originalPrice: 499,
      discountedPrice: 349,
      discountPercentage: 30,
      isPopular: false,
      displayOrder: 4,
    },
    {
      name: "Master",
      accountSize: 200000,
      description: "Maximum funding for top-tier traders.",
      features: ["$200,000 Account", "90% Profit Split", "No Time Limit", "Daily Drawdown: 5%", "Max Drawdown: 10%", "Free Retake on Profit Target", "Priority Support", "1-on-1 Consultation", "Scaling Plan Access"],
      rules: ["Profit Target: 8% (Phase 1), 5% (Phase 2)", "Daily Drawdown: 5%", "Max Drawdown: 10%", "Minimum 5 Trading Days", "No Time Limit"],
      originalPrice: 899,
      discountedPrice: 599,
      discountPercentage: 33,
      isPopular: false,
      displayOrder: 5,
    },
  ];

  for (const pkg of packagesData) {
    await prisma.package.upsert({
      where: { id: pkg.name.toLowerCase() },
      update: pkg,
      create: { id: pkg.name.toLowerCase(), ...pkg },
    });
  }
  console.log(`✅ ${packagesData.length} packages created`);

  // ==========================================
  // 3. Create CMS Content
  // ==========================================
  const cmsData = [
    {
      key: "hero",
      title: "Hero Section",
      content: {
        heading: "Trade Without Limits",
        subheading: "Get Funded Today",
        description: "Prove your trading skills and get funded with up to $200,000 in capital. Keep up to 90% profit split with no time limits.",
        ctaPrimary: "Get Started Now",
        ctaSecondary: "How It Works",
      },
    },
    {
      key: "stats",
      title: "Statistics",
      content: {
        traders: "10,000+",
        funded: "$5M+",
        profitSplit: "Up to 90%",
        countries: "150+",
      },
    },
    {
      key: "contact",
      title: "Contact Info",
      content: {
        email: "support@alphafundx.com",
        phone: "+1 (555) 123-4567",
        address: "Dubai, UAE",
      },
    },
  ];

  for (const cms of cmsData) {
    await prisma.cmsContent.upsert({
      where: { key: cms.key },
      update: cms,
      create: cms,
    });
  }
  console.log(`✅ ${cmsData.length} CMS content blocks created`);

  // ==========================================
  // 4. Create Site Settings
  // ==========================================
  const settings = [
    { key: "general", value: { siteName: "AlphaFundX", tagline: "Funded Trading Challenges" } },
    { key: "social", value: { twitter: "", instagram: "", discord: "", telegram: "" } },
  ];

  for (const setting of settings) {
    await prisma.siteSettings.upsert({
      where: { key: setting.key },
      update: setting,
      create: setting,
    });
  }
  console.log(`✅ Site settings created`);

  console.log("\n🎉 Database seeded successfully!");
  console.log("\n📋 Admin login credentials:");
  console.log("   Email:    admin@alphafundx.com");
  console.log("   Password: Admin@123");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
