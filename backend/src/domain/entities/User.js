class User {
  constructor({ id, nome, email, telefone, tipo, pontos, createdAt, updatedAt }) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
    this.tipo = tipo;
    this.pontos = pontos;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = User;
