class UpdateEquipment {
  constructor(equipmentRepository) {
    this.equipmentRepository = equipmentRepository;
  }

  async execute(id, data) {
    const existing = await this.equipmentRepository.findById(id);
    if (!existing) {
      throw new Error('Equipamento não encontrado');
    }

    return await this.equipmentRepository.update(id, data);
  }
}

module.exports = UpdateEquipment;
