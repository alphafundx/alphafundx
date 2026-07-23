import { prisma } from "./lib/prisma";
import bcrypt from "bcryptjs";

async function updateAdmin() {
  // ==========================================
  // CHANGE THESE VALUES BEFORE RUNNING
  // ==========================================
  const newEmail = "alphafundx.pro@gmail.com";
  const newPassword = "Rahul@3647";
  // ==========================================

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Find the existing admin
    const admin = await prisma.user.findFirst({
      where: { role: "ADMIN" }
    });

    if (!admin) {
      console.log("❌ No admin found in the database. Creating one...");
      const newAdmin = await prisma.user.create({
        data: {
          name: "Admin",
          email: newEmail,
          password: hashedPassword,
          role: "ADMIN",
          status: "ACTIVE",
          phone: "+1 (555) 000-0001",
        }
      });
      console.log(`✅ Admin created successfully: ${newAdmin.email}`);
      return;
    }

    // Update existing admin
    const updatedAdmin = await prisma.user.update({
      where: { id: admin.id },
      data: {
        email: newEmail,
        password: hashedPassword,
      },
    });

    console.log("✅ Admin credentials updated successfully in the Database!");
    console.log(`✉️  New Email: ${updatedAdmin.email}`);
    console.log(`🔑 New Password: ${newPassword}`);

  } catch (error) {
    console.error("❌ Error updating admin:", error);
  } finally {
    await prisma.$disconnect();
  }
}

updateAdmin();
