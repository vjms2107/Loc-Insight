class RedeemPoints {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ email, pontosAResgatar }) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error('Usuário não encontrado');

    if (user.pontos < pontosAResgatar) {
      throw new Error('Saldo de pontos insuficiente');
    }

    // Deduzir pontos (passando valor negativo para o increment)
    await this.userRepository.updatePoints(user.id, -pontosAResgatar);

    return { 
      success: true, 
      pontosRestantes: user.pontos - pontosAResgatar,
      descontoGerado: `DESC-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    };
  }
}

module.exports = RedeemPoints;
