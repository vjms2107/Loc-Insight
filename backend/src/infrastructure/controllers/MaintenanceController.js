const RegisterMaintenance = require('../../application/use-cases/RegisterMaintenance');
const PrismaMaintenanceRepository = require('../repositories/PrismaMaintenanceRepository');
const PrismaEquipmentRepository = require('../repositories/PrismaEquipmentRepository');

const maintenanceRepository = new PrismaMaintenanceRepository();
const equipmentRepository = new PrismaEquipmentRepository();
const registerMaintenanceUseCase = new RegisterMaintenance(maintenanceRepository, equipmentRepository);

class MaintenanceController {
  async create(req, res) {
    try {
      const maintenance = await registerMaintenanceUseCase.execute(req.body);
      return res.status(201).json(maintenance);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: error.message });
    }
  }

  async getByEquipment(req, res) {
    try {
      const { equipamentoId } = req.params;
      const history = await maintenanceRepository.findByEquipmentId(equipamentoId);
      return res.json(history);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = new MaintenanceController();
