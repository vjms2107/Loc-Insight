const CreateEquipment = require('../../application/use-cases/CreateEquipment');
const UpdateEquipmentStatus = require('../../application/use-cases/UpdateEquipmentStatus');
const GetEquipmentStats = require('../../application/use-cases/GetEquipmentStats');
const GenerateEquipmentQRCode = require('../../application/use-cases/GenerateEquipmentQRCode');
const ProcessEquipmentReturn = require('../../application/use-cases/ProcessEquipmentReturn');
const UpdateEquipment = require('../../application/use-cases/UpdateEquipment');
const DeleteEquipment = require('../../application/use-cases/DeleteEquipment');
const PrismaEquipmentRepository = require('../repositories/PrismaEquipmentRepository');
const PrismaUserRepository = require('../repositories/PrismaUserRepository');

const equipmentRepository = new PrismaEquipmentRepository();
const userRepository = new PrismaUserRepository();
const createEquipmentUseCase = new CreateEquipment(equipmentRepository);
const updateEquipmentStatusUseCase = new UpdateEquipmentStatus(equipmentRepository);
const getEquipmentStatsUseCase = new GetEquipmentStats(equipmentRepository);
const generateEquipmentQRCodeUseCase = new GenerateEquipmentQRCode(equipmentRepository);
const processEquipmentReturnUseCase = new ProcessEquipmentReturn(equipmentRepository, userRepository);
const updateEquipmentUseCase = new UpdateEquipment(equipmentRepository);
const deleteEquipmentUseCase = new DeleteEquipment(equipmentRepository);

class EquipmentController {
  async create(req, res) {
    try {
      const { nome, descricao, categoria, status } = req.body;
      
      // Extrair caminhos dos arquivos se existirem
      const imagemUrl = req.files && req.files['imagem'] ? `/uploads/${req.files['imagem'][0].filename}` : null;
      const manualPdf = req.files && req.files['manual'] ? `/uploads/${req.files['manual'][0].filename}` : null;

      const equipment = await createEquipmentUseCase.execute({
        nome,
        descricao,
        categoria,
        status,
        imagemUrl,
        manualPdf
      });

      return res.status(201).json(equipment);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getAll(req, res) {
    try {
      const { nome, categoria } = req.query;
      const equipments = await equipmentRepository.findAll({ nome, categoria });
      return res.json(equipments);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const equipment = await updateEquipmentStatusUseCase.execute(id, status);
      return res.json(equipment);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: error.message });
    }
  }

  async getStats(req, res) {
    try {
      const stats = await getEquipmentStatsUseCase.execute();
      return res.json(stats);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async generateQRCode(req, res) {
    try {
      const { id } = req.params;
      const qrCode = await generateEquipmentQRCodeUseCase.execute(id);
      return res.json({ qrCode });
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  async returnEquipment(req, res) {
    try {
      const result = await processEquipmentReturnUseCase.execute(req.body);
      return res.json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, descricao, categoria, status, proximaRevisao } = req.body;

      const imagemUrl = req.files && req.files['imagem'] ? `/uploads/${req.files['imagem'][0].filename}` : undefined;
      const manualPdf = req.files && req.files['manual'] ? `/uploads/${req.files['manual'][0].filename}` : undefined;

      const updateData = {
        nome,
        descricao,
        categoria,
        status,
        proximaRevisao,
      };

      if (imagemUrl !== undefined) updateData.imagemUrl = imagemUrl;
      if (manualPdf !== undefined) updateData.manualPdf = manualPdf;

      const equipment = await updateEquipmentUseCase.execute(id, updateData);
      return res.json(equipment);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await deleteEquipmentUseCase.execute(id);
      return res.json({ message: 'Equipamento excluído com sucesso' });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new EquipmentController();
