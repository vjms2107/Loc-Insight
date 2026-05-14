class RegisterMaintenance {
  constructor(maintenanceRepository, equipmentRepository) {
    this.maintenanceRepository = maintenanceRepository;
    this.equipmentRepository = equipmentRepository;
  }

  async execute(data) {
    const maintenance = await this.maintenanceRepository.create(data);

    // Ao registrar uma manutenção, podemos opcionalmente atualizar a data da próxima revisão
    // Para simplificar, vamos colocar +90 dias se for uma manutenção preventiva
    if (data.proximaRevisao) {
        await this.equipmentRepository.updateRevisionDate(data.equipamentoId, data.proximaRevisao);
    }

    return maintenance;
  }
}

module.exports = RegisterMaintenance;
