class IUserRepository {
  async findByEmail(email) {
    throw new Error('Method not implemented');
  }

  async findById(id) {
    throw new Error('Method not implemented');
  }

  async create(userData) {
    throw new Error('Method not implemented');
  }

  async updatePoints(id, pontos) {
    throw new Error('Method not implemented');
  }
}

module.exports = IUserRepository;
