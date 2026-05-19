require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const equipmentRoutes = require('./infrastructure/routes/equipmentRoutes');
const userRoutes = require('./infrastructure/routes/userRoutes');
const maintenanceRoutes = require('./infrastructure/routes/maintenanceRoutes');
const authRoutes = require('./infrastructure/routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos (uploads)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rotas
app.use('/auth', authRoutes);
app.use('/equipments', equipmentRoutes);
app.use('/users', userRoutes);
app.use('/maintenances', maintenanceRoutes);

// Rota de saúde
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Loc Insight API is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

module.exports = app;
