class GetUserByEmail {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(email) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Usuário não encontrado com este e-mail.');
    }
    return user;
  }
}

module.exports = GetUserByEmail;
