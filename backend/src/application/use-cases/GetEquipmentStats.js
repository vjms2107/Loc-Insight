class GetEquipmentStats {
  constructor(equipmentRepository) {
    this.equipmentRepository = equipmentRepository;
  }

  async execute() {
    return await this.equipmentRepository.getStats();
  }
}

module.exports = GetEquipmentStats;
