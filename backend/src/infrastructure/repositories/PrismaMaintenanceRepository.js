const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class PrismaMaintenanceRepository {
  async create(data) {
    return await prisma.maintenance.create({
      data: {
        equipamentoId: parseInt(data.equipamentoId),
        descricao: data.descricao,
        custo: parseFloat(data.custo),
        pecasTrocadas: data.pecasTrocadas,
      }
    });
  }

  async findByEquipmentId(equipamentoId) {
    return await prisma.maintenance.findMany({
      where: { equipamentoId: parseInt(equipamentoId) },
      orderBy: { createdAt: 'desc' }
    });
  }
}

module.exports = PrismaMaintenanceRepository;
