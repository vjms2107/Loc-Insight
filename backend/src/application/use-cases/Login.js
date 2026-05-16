class Login {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(email, password) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    // Em produção, usar bcrypt para comparar hashes!
    if (user.senha !== password) {
      throw new Error('Senha incorreta.');
    }

    // Retorna o usuário sem a senha
    const { senha, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

module.exports = Login;
