class CreateEquipment {
  constructor(equipmentRepository) {
    this.equipmentRepository = equipmentRepository;
  }

  async execute(data) {
    // Aqui poderiam entrar validações de regra de negócio adicionais
    return await this.equipmentRepository.create(data);
  }
}

module.exports = CreateEquipment;
