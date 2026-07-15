const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const stats = await prisma.content.findUnique({ where: { key: 'stats' } });
  if (stats && stats.data && stats.data.profit_split === 'Up to 90%') {
    await prisma.content.update({
      where: { key: 'stats' },
      data: {
        data: {
          ...stats.data,
          profit_split: 'Up to 80%'
        }
      }
    });
    console.log('Updated db');
  } else {
    console.log('Not in db', stats?.data);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
