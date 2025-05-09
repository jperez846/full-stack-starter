const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.friend.deleteMany()

  await prisma.friend.create({
    data: { name: 'Danny' }
  })
  await prisma.friend.create({
    data: { name: 'Elikem' }
  })
  await prisma.friend.create({
    data: { name: 'Greg' }
  })
  await prisma.friend.create({
    data: { name: 'Tabitha' }
  })
  await prisma.friend.create({
    data: { name: 'Gabe' }
  })

  console.log('🌱 Database seeded successfully.')
}

main()
  .catch(e => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
