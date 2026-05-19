const bcrypt = require('bcryptjs');

class RegisterUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ nome, email, senha, role = 'CLIENT' }) {
    if (!nome || !email || !senha) {
      throw new Error('Nome, e-mail e senha são obrigatórios.');
    }

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('E-mail já cadastrado.');
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    const user = await this.userRepository.create({
      nome,
      email,
      senha: hashedPassword,
      role: role.toUpperCase(),
      pontos: 0
    });

    const { senha: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

module.exports = RegisterUser;
