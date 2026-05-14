class UpdateEquipmentStatus {
  constructor(equipmentRepository) {
    this.equipmentRepository = equipmentRepository;
  }

  async execute(id, status) {
    const validStatus = ['Disponível', 'Alugado', 'Manutenção'];
    
    if (!validStatus.includes(status)) {
      throw new Error(`Status inválido: ${status}. Deve ser um de: ${validStatus.join(', ')}`);
    }

    return await this.equipmentRepository.updateStatus(id, status);
  }
}

module.exports = UpdateEquipmentStatus;
