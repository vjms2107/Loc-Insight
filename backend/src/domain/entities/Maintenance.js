class Maintenance {
  constructor({ id, equipamentoId, descricao, custo, pecasTrocadas, createdAt, updatedAt }) {
    this.id = id;
    this.equipamentoId = equipamentoId;
    this.descricao = descricao;
    this.custo = custo;
    this.pecasTrocadas = pecasTrocadas;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = Maintenance;
