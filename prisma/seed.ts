import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ==========================================
  // 1. Create Admin User
  // ==========================================
  const adminPassword = await bcrypt.hash("Admin@123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@tradexa.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@tradexa.com",
      password: adminPassword,
      role: "ADMIN",
      status: "ACTIVE",
      phone: "+1234567890",
    },
  });
  console.log(`✅ Admin user created: ${admin.email}`);

  // ==========================================
  // 2. Create Demo User
  // ==========================================
  const userPassword = await bcrypt.hash("User@123", 12);
  const user = await prisma.user.upsert({
    where: { email: "user@tradexa.com" },
    update: {},
    create: {
      name: "John Trader",
      email: "user@tradexa.com",
      password: userPassword,
      role: "USER",
      status: "ACTIVE",
      phone: "+1987654321",
      telegramUsername: "@johntrader",
    },
  });
  console.log(`✅ Demo user created: ${user.email}`);

  // ==========================================
  // 3. Create Packages
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
  // 4. Create Testimonials
  // ==========================================
  const testimonialsData = [
    {
      userName: "Alex Thompson",
      rating: 5,
      content: "Tradexa changed my trading career. Got funded within 2 weeks and already withdrawn over $5,000 in profits! The rules are fair and the support team is incredible.",
      isActive: true,
    },
    {
      userName: "Sarah Chen",
      rating: 5,
      content: "The most transparent prop firm I've worked with. No hidden rules, no surprises. I passed Phase 1 in 8 days and Phase 2 in 5 days. Highly recommended.",
      isActive: true,
    },
    {
      userName: "Michael Rivera",
      rating: 5,
      content: "Instant payouts, great support team, and fair rules. This is exactly what traders need. I've been funded for 3 months and have withdrawn $12,000 so far.",
      isActive: true,
    },
    {
      userName: "Emma Williams",
      rating: 4,
      content: "Started with the $25K account and scaled up to $100K through their scaling plan. The profit split is amazing and withdrawals are processed within 24 hours.",
      isActive: true,
    },
    {
      userName: "David Park",
      rating: 5,
      content: "Best prop firm in the industry. The no time limit policy took all the pressure off and I could trade comfortably. Got funded in 3 weeks at my own pace.",
      isActive: true,
    },
    {
      userName: "Lisa Johnson",
      rating: 5,
      content: "The dashboard is so clean and easy to use. I can track my progress in real-time. Already recommended Tradexa to 5 of my trading friends.",
      isActive: true,
    },
  ];

  for (const testimonial of testimonialsData) {
    await prisma.testimonial.create({ data: testimonial });
  }
  console.log(`✅ ${testimonialsData.length} testimonials created`);

  // ==========================================
  // 5. Create CMS Content
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
        email: "support@tradexa.com",
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
  // 6. Create Site Settings
  // ==========================================
  const settings = [
    { key: "general", value: { siteName: "Tradexa", tagline: "Funded Trading Challenges" } },
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

  // ==========================================
  // 7. Create Demo Order + UserPackage for demo user
  // ==========================================
  const order = await prisma.order.create({
    data: {
      userId: user.id,
      packageId: "professional",
      amount: 199,
      status: "COMPLETED",
      paymentMethod: "stripe",
      paymentReference: "demo_payment_123",
    },
  });

  await prisma.userPackage.create({
    data: {
      userId: user.id,
      packageId: "professional",
      orderId: order.id,
      status: "ACTIVE",
      currentBalance: 50000,
      currentProfit: 3250,
      profitPercentage: 6.5,
    },
  });
  console.log(`✅ Demo order and user package created`);

  // ==========================================
  // 8. Create Demo Notifications
  // ==========================================
  await prisma.notification.createMany({
    data: [
      {
        userId: user.id,
        title: "Welcome to Tradexa!",
        message: "Your account has been created successfully. Start by choosing a funding package.",
        type: "SYSTEM",
      },
      {
        userId: user.id,
        title: "Package Activated",
        message: "Your Professional $50,000 package has been activated. Good luck trading!",
        type: "PACKAGE",
      },
      {
        userId: user.id,
        title: "Profit Milestone",
        message: "Congratulations! You've reached 5% profit on your funded account.",
        type: "SUCCESS",
      },
    ],
  });
  console.log(`✅ Demo notifications created`);

  console.log("\n🎉 Database seeded successfully!");
  console.log("\n📋 Login credentials:");
  console.log("   Admin: admin@tradexa.com / Admin@123");
  console.log("   User:  user@tradexa.com / User@123");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
