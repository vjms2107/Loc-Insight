const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class PrismaEquipmentRepository {
  async create(data) {
    return await prisma.equipment.create({
      data: {
        nome: data.nome,
        descricao: data.descricao,
        categoria: data.categoria,
        status: data.status,
        imagemUrl: data.imagemUrl,
        manualPdf: data.manualPdf,
      }
    });
  }

  async findById(id) {
    return await prisma.equipment.findUnique({
      where: { id: parseInt(id) }
    });
  }

  async findAll(filters = {}) {
    const { nome, categoria } = filters;
    const where = {};

    if (nome) {
      where.nome = {
        contains: nome,
        mode: 'insensitive',
      };
    }

    if (categoria) {
      where.categoria = {
        equals: categoria,
      };
    }

    return await prisma.equipment.findMany({ where });
  }

  async updateStatus(id, status) {
    return await prisma.equipment.update({
      where: { id: parseInt(id) },
      data: { status }
    });
  }

  async getStats() {
    const stats = await prisma.equipment.groupBy({
      by: ['status'],
      _count: {
        status: true,
      },
    });

    // Formata para um objeto mais fácil de consumir
    return stats.reduce((acc, curr) => {
      acc[curr.status] = curr._count.status;
      return acc;
    }, { 'Disponível': 0, 'Alugado': 0, 'Manutenção': 0 });
  }

  async updateRevisionDate(id, date) {
    return await prisma.equipment.update({
      where: { id: parseInt(id) },
      data: { proximaRevisao: new Date(date) }
    });
  }

  async update(id, data) {
    return await prisma.equipment.update({
      where: { id: parseInt(id) },
      data: {
        nome: data.nome,
        descricao: data.descricao,
        categoria: data.categoria,
        status: data.status,
        imagemUrl: data.imagemUrl !== undefined ? data.imagemUrl : undefined,
        manualPdf: data.manualPdf !== undefined ? data.manualPdf : undefined,
        proximaRevisao: data.proximaRevisao !== undefined ? (data.proximaRevisao ? new Date(data.proximaRevisao) : null) : undefined,
      }
    });
  }

  async delete(id) {
    return await prisma.equipment.delete({
      where: { id: parseInt(id) }
    });
  }
}

module.exports = PrismaEquipmentRepository;
