const GetUserByEmail = require('../../application/use-cases/GetUserByEmail');
const RedeemPoints = require('../../application/use-cases/RedeemPoints');
const Login = require('../../application/use-cases/Login');
const PrismaUserRepository = require('../repositories/PrismaUserRepository');

const userRepository = new PrismaUserRepository();
const getUserByEmailUseCase = new GetUserByEmail(userRepository);
const redeemPointsUseCase = new RedeemPoints(userRepository);
const loginUseCase = new Login(userRepository);

class UserController {
  async getPoints(req, res) {
    try {
      const { email } = req.query;
      if (!email) {
        return res.status(400).json({ error: 'E-mail é obrigatório.' });
      }

      const user = await getUserByEmailUseCase.execute(email);
      return res.json({
        nome: user.nome,
        pontos: user.pontos
      });
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  async redeem(req, res) {
    try {
      const result = await redeemPointsUseCase.execute(req.body);
      return res.json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, senha } = req.body;
      if (!email || !senha) {
        return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
      }

      const user = await loginUseCase.execute(email, senha);
      return res.json(user);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

module.exports = new UserController();
