const express = require('express');
const router = express.Router();
const MaintenanceController = require('../controllers/MaintenanceController');

// POST /maintenances - Registrar manutenção
router.post('/', MaintenanceController.create);

// GET /maintenances/equipment/:equipamentoId - Histórico por equipamento
router.get('/equipment/:equipamentoId', MaintenanceController.getByEquipment);

module.exports = router;
