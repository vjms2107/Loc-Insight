const express = require('express');
const router = express.Router();
const EquipmentController = require('../controllers/EquipmentController');
const upload = require('../config/multer');

// POST /equipments - Cadastro de novo equipamento com foto e manual
router.post('/', upload.fields([
  { name: 'imagem', maxCount: 1 },
  { name: 'manual', maxCount: 1 }
]), EquipmentController.create);

// GET /equipments - Listagem de equipamentos
router.get('/', EquipmentController.getAll);

// GET /equipments/stats - Estatísticas de ocupação (PB03)
router.get('/stats', EquipmentController.getStats);

// GET /equipments/:id/qrcode - Gerar QR Code (PB04)
router.get('/:id/qrcode', EquipmentController.generateQRCode);

// PATCH /equipments/:id/status - Atualização de status
router.patch('/:id/status', EquipmentController.updateStatus);

// POST /equipments/return - Processar devolução (PB12/PB13)
router.post('/return', EquipmentController.returnEquipment);

// PUT /equipments/:id - Atualização de equipamento
router.put('/:id', upload.fields([
  { name: 'imagem', maxCount: 1 },
  { name: 'manual', maxCount: 1 }
]), EquipmentController.update);

// DELETE /equipments/:id - Exclusão de equipamento
router.delete('/:id', EquipmentController.delete);

module.exports = router;
