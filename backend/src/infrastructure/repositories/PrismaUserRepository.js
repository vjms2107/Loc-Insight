const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class PrismaUserRepository {
  async findByEmail(email) {
    return await prisma.user.findUnique({
      where: { email }
    });
  }

  async findById(id) {
    return await prisma.user.findUnique({
      where: { id: parseInt(id) }
    });
  }

  async create(data) {
    return await prisma.user.create({
      data
    });
  }

  async updatePoints(id, pontos) {
    return await prisma.user.update({
      where: { id: parseInt(id) },
      data: { pontos: { increment: pontos } }
    });
  }
}

module.exports = PrismaUserRepository;
