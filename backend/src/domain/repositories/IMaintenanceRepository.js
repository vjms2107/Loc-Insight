class IMaintenanceRepository {
  async create(maintenanceData) {
    throw new Error('Method not implemented');
  }

  async findByEquipmentId(equipamentoId) {
    throw new Error('Method not implemented');
  }
}

module.exports = IMaintenanceRepository;
