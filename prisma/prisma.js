// This module avoids creating multiple connections during dev and frequent restarts
const { PrismaClient } = require('@prisma/client')

const globalForPrisma = global

const prisma = globalForPrisma.prisma || new PrismaClient()

if (!process.env.RENDER) globalForPrisma.prisma = prisma

module.exports = prisma
