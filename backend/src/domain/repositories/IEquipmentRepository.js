/**
 * @interface IEquipmentRepository
 */
class IEquipmentRepository {
  async create(equipmentData) {
    throw new Error('Method not implemented');
  }

  async findById(id) {
    throw new Error('Method not implemented');
  }

  async findAll(filters) {
    throw new Error('Method not implemented');
  }

  async updateStatus(id, status) {
    throw new Error('Method not implemented');
  }

  async getStats() {
    throw new Error('Method not implemented');
  }

  async updateRevisionDate(id, date) {
    throw new Error('Method not implemented');
  }
}

module.exports = IEquipmentRepository;
