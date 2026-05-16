const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando seed...');

  // Deletar dados existentes para evitar duplicatas
  await prisma.equipment.deleteMany();
  await prisma.user.deleteMany();

  // Criar Usuários
  const admin = await prisma.user.create({
    data: {
      email: 'admin@locinsight.com',
      senha: 'admin123', // Em produção, usar hash!
      nome: 'Administrador Loc Insight',
      role: 'admin',
      pontos: 0,
    },
  });

  const cliente = await prisma.user.create({
    data: {
      email: 'cliente@gmail.com',
      senha: 'cliente123',
      nome: 'João da Silva',
      role: 'cliente',
      pontos: 150,
    },
  });

  console.log('Usuários criados:', { admin: admin.email, cliente: cliente.email });

  // Criar Equipamentos
  const equipments = [
    {
      nome: 'Betoneira 400L',
      descricao: 'Betoneira monofásica robusta para obras de pequeno e médio porte.',
      categoria: 'Construção',
      status: 'Disponível',
      imagemUrl: 'https://cdn.pixabay.com/photo/2014/07/06/17/20/cement-mixer-385317_1280.jpg',
      proximaRevisao: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 dias
    },
    {
      nome: 'Martelete Perfurador 5kg',
      descricao: 'Ideal para perfuração em concreto e alvenaria.',
      categoria: 'Ferramentas Elétricas',
      status: 'Alugado',
      imagemUrl: 'https://cdn.pixabay.com/photo/2013/07/12/19/27/drill-154773_1280.png',
      proximaRevisao: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // Vencido há 2 dias
    },
    {
      nome: 'Andaime Tubular 1.0m',
      descricao: 'Estrutura metálica para trabalhos em altura.',
      categoria: 'Acesso',
      status: 'Disponível',
      imagemUrl: 'https://cdn.pixabay.com/photo/2015/11/07/11/48/scaffold-1031317_1280.jpg',
      proximaRevisao: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
    {
      nome: 'Placa Vibratória',
      descricao: 'Compactador de solo para pavimentação.',
      categoria: 'Construção',
      status: 'Manutenção',
      imagemUrl: 'https://cdn.pixabay.com/photo/2017/08/30/17/21/construction-2697926_1280.jpg',
      proximaRevisao: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // Alerta em 3 dias
    },
    {
      nome: 'Gerador de Energia 5KVA',
      descricao: 'Fonte de energia portátil para canteiros de obra.',
      categoria: 'Energia',
      status: 'Disponível',
      proximaRevisao: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
    },
    {
      nome: 'Lixadeira de Parede',
      descricao: 'Equipamento para acabamento em gesso e massa corrida.',
      categoria: 'Ferramentas Elétricas',
      status: 'Disponível',
      proximaRevisao: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    }
  ];

  for (const eq of equipments) {
    await prisma.equipment.create({ data: eq });
  }

  console.log('Equipamentos criados!');
  console.log('Seed finalizado com sucesso.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
