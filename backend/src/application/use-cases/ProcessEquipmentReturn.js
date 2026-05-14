class ProcessEquipmentReturn {
  constructor(equipmentRepository, userRepository) {
    this.equipmentRepository = equipmentRepository;
    this.userRepository = userRepository;
  }

  async execute({ equipamentoId, userEmail, estado, observacoes }) {
    // 1. Atualizar status do equipamento para Disponível
    const equipment = await this.equipmentRepository.findById(equipamentoId);
    if (!equipment) throw new Error('Equipamento não encontrado');

    await this.equipmentRepository.updateStatus(equipamentoId, 'Disponível');

    // 2. Bonificação de Pontos (PB13)
    if (estado === 'Bom' && userEmail) {
      const user = await this.userRepository.findByEmail(userEmail);
      if (user) {
        const PONTOS_BONUS = 100;
        await this.userRepository.updatePoints(user.id, PONTOS_BONUS);
        return { success: true, bonusAtribuido: true, pontos: PONTOS_BONUS };
      }
    }

    return { success: true, bonusAtribuido: false };
  }
}

module.exports = ProcessEquipmentReturn;
