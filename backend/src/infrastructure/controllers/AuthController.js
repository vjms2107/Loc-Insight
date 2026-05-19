const jwt = require('jsonwebtoken');
const Login = require('../../application/use-cases/Login');
const RegisterUser = require('../../application/use-cases/RegisterUser');
const PrismaUserRepository = require('../repositories/PrismaUserRepository');

const userRepository = new PrismaUserRepository();
const loginUseCase = new Login(userRepository);
const registerUseCase = new RegisterUser(userRepository);

const JWT_SECRET = process.env.JWT_SECRET || 'loc_insight_secret_key_123';

class AuthController {
  async register(req, res) {
    try {
      const { nome, email, senha, role } = req.body;
      const userWithoutPassword = await registerUseCase.execute({ nome, email, senha, role });

      const token = jwt.sign(
        { id: userWithoutPassword.id, email: userWithoutPassword.email, role: userWithoutPassword.role },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      return res.status(201).json({
        token,
        ...userWithoutPassword
      });
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

      const userWithoutPassword = await loginUseCase.execute(email, senha);

      const token = jwt.sign(
        { id: userWithoutPassword.id, email: userWithoutPassword.email, role: userWithoutPassword.role },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      return res.json({
        token,
        ...userWithoutPassword
      });
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

module.exports = new AuthController();
