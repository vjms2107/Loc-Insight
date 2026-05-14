class Equipment {
  constructor({ id, nome, descricao, categoria, status, imagemUrl, manualPdf, createdAt, updatedAt }) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.categoria = categoria;
    this.status = status;
    this.imagemUrl = imagemUrl;
    this.manualPdf = manualPdf;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = Equipment;
