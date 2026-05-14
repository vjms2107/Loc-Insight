const QRCode = require('qrcode');

class GenerateEquipmentQRCode {
  constructor(equipmentRepository) {
    this.equipmentRepository = equipmentRepository;
  }

  async execute(id) {
    const equipment = await this.equipmentRepository.findById(id);
    
    if (!equipment) {
      throw new Error('Equipamento não encontrado');
    }

    // URL que o QR Code deve abrir (idealmente a URL pública do manual ou uma página de detalhes)
    // Para simplificar PB04, apontaremos para a URL do manual se existir.
    const url = equipment.manualPdf 
      ? `http://localhost:3000${equipment.manualPdf}` 
      : `http://localhost:3000/equipments/${id}`;

    const qrCodeImage = await QRCode.toDataURL(url);
    return qrCodeImage;
  }
}

module.exports = GenerateEquipmentQRCode;
