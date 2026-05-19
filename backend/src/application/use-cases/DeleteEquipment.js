class DeleteEquipment {
  constructor(equipmentRepository) {
    this.equipmentRepository = equipmentRepository;
  }

  async execute(id) {
    const existing = await this.equipmentRepository.findById(id);
    if (!existing) {
      throw new Error('Equipamento não encontrado');
    }

    return await this.equipmentRepository.delete(id);
  }
}

module.exports = DeleteEquipment;
