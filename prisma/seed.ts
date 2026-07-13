import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...\n");

  // ================================
  // 1. Admin User
  // ================================
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
      phone: "+1 (555) 000-0001",
    },
  });
  console.log("✅ Admin user created:", admin.email);

  // ================================
  // 2. Demo User
  // ================================
  const userPassword = await bcrypt.hash("User@123", 12);
  const demoUser = await prisma.user.upsert({
    where: { email: "trader@alphafundx.com" },
    update: {},
    create: {
      name: "Alex Thompson",
      email: "trader@alphafundx.com",
      password: userPassword,
      role: "USER",
      status: "ACTIVE",
      phone: "+1 (555) 000-0002",
      telegramUsername: "@alextrader",
    },
  });
  console.log("✅ Demo user created:", demoUser.email);

  // ================================
  // 3. Packages
  // ================================
  const packagesData = [
    {
      name: "Starter",
      accountSize: 10000,
      description: "Perfect for beginners looking to prove their skills.",
      features: ["$10,000 Account", "80% Profit Split", "No Time Limit", "Daily Drawdown: 5%", "Max Drawdown: 10%"],
      rules: ["Minimum 5 trading days", "Daily drawdown limit: 5%", "Maximum drawdown: 10%", "No news trading restrictions"],
      originalPrice: 99,
      discountedPrice: 49,
      discountPercentage: 50,
      isPopular: false,
      displayOrder: 1,
    },
    {
      name: "Standard",
      accountSize: 25000,
      description: "Great value for intermediate traders.",
      features: ["$25,000 Account", "80% Profit Split", "No Time Limit", "Daily Drawdown: 5%", "Max Drawdown: 10%"],
      rules: ["Minimum 5 trading days", "Daily drawdown limit: 5%", "Maximum drawdown: 10%", "No news trading restrictions"],
      originalPrice: 199,
      discountedPrice: 149,
      discountPercentage: 25,
      isPopular: false,
      displayOrder: 2,
    },
    {
      name: "Professional",
      accountSize: 50000,
      description: "Our most popular choice for serious traders.",
      features: ["$50,000 Account", "85% Profit Split", "No Time Limit", "Daily Drawdown: 5%", "Max Drawdown: 10%"],
      rules: ["Minimum 5 trading days", "Daily drawdown limit: 5%", "Maximum drawdown: 10%", "No news trading restrictions"],
      originalPrice: 299,
      discountedPrice: 199,
      discountPercentage: 33,
      isPopular: true,
      displayOrder: 3,
    },
    {
      name: "Elite",
      accountSize: 100000,
      description: "For experienced traders who want more capital.",
      features: ["$100,000 Account", "90% Profit Split", "No Time Limit", "Daily Drawdown: 5%", "Max Drawdown: 10%"],
      rules: ["Minimum 5 trading days", "Daily drawdown limit: 5%", "Maximum drawdown: 10%", "No news trading restrictions"],
      originalPrice: 499,
      discountedPrice: 349,
      discountPercentage: 30,
      isPopular: false,
      displayOrder: 4,
    },
    {
      name: "Master",
      accountSize: 200000,
      description: "Maximum capital for top-tier traders.",
      features: ["$200,000 Account", "90% Profit Split", "No Time Limit", "Daily Drawdown: 5%", "Max Drawdown: 10%"],
      rules: ["Minimum 5 trading days", "Daily drawdown limit: 5%", "Maximum drawdown: 10%", "No news trading restrictions"],
      originalPrice: 899,
      discountedPrice: 599,
      discountPercentage: 33,
      isPopular: false,
      displayOrder: 5,
    },
  ];

  for (const pkg of packagesData) {
    await prisma.package.upsert({
      where: { id: `pkg-${pkg.name.toLowerCase()}` },
      update: { ...pkg },
      create: { id: `pkg-${pkg.name.toLowerCase()}`, ...pkg },
    });
  }
  console.log("✅ 5 packages created");

  // ================================
  // 4. Testimonials
  // ================================
  const testimonialsData = [
    { userName: "Alex Thompson", rating: 5, content: "AlphaFundX changed my trading career. Got funded within 2 weeks and already withdrawn over $5,000 in profits!" },
    { userName: "Sarah Chen", rating: 5, content: "The most transparent prop firm I've worked with. No hidden rules, no surprises. Highly recommended." },
    { userName: "Michael Rivera", rating: 5, content: "Instant payouts, great support team, and fair rules. This is exactly what traders need." },
    { userName: "Emma Williams", rating: 4, content: "Started with the $25K account and scaled up to $100K. The profit split is amazing!" },
    { userName: "David Park", rating: 5, content: "The scaling plan is incredible. Went from $50K to $200K in under 3 months." },
    { userName: "Fatima Al-Rashid", rating: 5, content: "As a forex trader from Dubai, finding a trustworthy prop firm was crucial. AlphaFundX exceeded all my expectations." },
  ];

  // Clear existing and re-seed
  await prisma.testimonial.deleteMany();
  for (const t of testimonialsData) {
    await prisma.testimonial.create({ data: { ...t, isActive: true } });
  }
  console.log("✅ 6 testimonials created");

  // ================================
  // 5. CMS Content
  // ================================
  const cmsData = [
    {
      key: "hero",
      title: "Hero Section",
      content: {
        heading: "Trade Without Limits",
        subheading: "Get Funded Today",
        description: "Prove your trading skills and get funded with up to $200,000 in capital. Keep up to 90% profit split with no time limits.",
        cta_primary: "Get Started Now",
        cta_secondary: "How It Works",
      },
    },
    {
      key: "about",
      title: "About Section",
      content: {
        title: "Built by Traders, For Traders",
        description: "AlphaFundX was founded with a simple belief: lack of capital shouldn't stop skilled traders from building a career.",
      },
    },
    {
      key: "stats",
      title: "Statistics Bar",
      content: {
        funded_traders: "10,000+",
        capital_funded: "$5M+",
        profit_split: "Up to 90%",
        countries: "150+",
      },
    },
    {
      key: "contact",
      title: "Contact Information",
      content: {
        email: "support@alphafundx.com",
        phone: "+1 (555) 123-4567",
        address: "Dubai, UAE",
      },
    },
    {
      key: "footer",
      title: "Footer",
      content: {
        copyright: "© 2024 AlphaFundX. All rights reserved.",
        twitter: "https://twitter.com/alphafundx",
        discord: "https://discord.gg/alphafundx",
        telegram: "https://t.me/alphafundx",
      },
    },
  ];

  for (const cms of cmsData) {
    await prisma.cmsContent.upsert({
      where: { key: cms.key },
      update: { title: cms.title, content: cms.content },
      create: { key: cms.key, title: cms.title, content: cms.content, isActive: true },
    });
  }
  console.log("✅ 5 CMS content blocks created");

  // ================================
  // 6. Site Settings
  // ================================
  const settingsData = [
    { key: "general", value: { siteName: "AlphaFundX", tagline: "Trade Without Limits — Get Funded Today" } },
    { key: "contact", value: { email: "support@alphafundx.com", phone: "+1 (555) 123-4567" } },
    { key: "social", value: { twitter: "https://twitter.com/alphafundx", discord: "https://discord.gg/alphafundx", telegram: "https://t.me/alphafundx", instagram: "https://instagram.com/alphafundx" } },
    { key: "platform", value: { maintenanceMode: false, registrationEnabled: true, withdrawalsEnabled: true, minWithdrawal: 100, maxWithdrawal: 50000, defaultProfitSplit: 80 } },
    { key: "appearance", value: { primaryColor: "#26FF5E", secondaryColor: "#19B226" } },
  ];

  for (const s of settingsData) {
    await prisma.siteSettings.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: { key: s.key, value: s.value },
    });
  }
  console.log("✅ 5 site settings configured");

  // ================================
  // 7. Demo Order + UserPackage (for demo user)
  // ================================
  const professionalPkg = await prisma.package.findFirst({ where: { name: "Professional" } });

  if (professionalPkg) {
    const existingOrder = await prisma.order.findFirst({
      where: { userId: demoUser.id, packageId: professionalPkg.id },
    });

    if (!existingOrder) {
      const order = await prisma.order.create({
        data: {
          userId: demoUser.id,
          packageId: professionalPkg.id,
          amount: professionalPkg.discountedPrice ?? professionalPkg.originalPrice,
          status: "COMPLETED",
          paymentMethod: "CRYPTO",
          paymentReference: "demo-payment-ref-001",
        },
      });

      await prisma.userPackage.create({
        data: {
          userId: demoUser.id,
          packageId: professionalPkg.id,
          orderId: order.id,
          status: "ACTIVE",
          currentBalance: 54150,
          currentProfit: 4150,
          profitPercentage: 8.3,
        },
      });

      console.log("✅ Demo order + active package created for demo user");
    }
  }

  console.log("\n🎉 Seed completed successfully!\n");
  console.log("=== Login Credentials ===");
  console.log("Admin: admin@alphafundx.com / Admin@123");
  console.log("User:  trader@alphafundx.com / User@123");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
