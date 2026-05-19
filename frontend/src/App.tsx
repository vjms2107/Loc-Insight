import { useState, useEffect } from 'react'
import EquipmentForm from './components/EquipmentForm'
import EquipmentList from './components/EquipmentList'
import EquipmentCatalog from './components/EquipmentCatalog'
import ManualsCenter from './components/ManualsCenter'
import PointsConsultation from './components/PointsConsultation'
import UserRegistrationForm from './components/UserRegistrationForm'
import Login from './components/Login'
import logo from './assets/Gemini_Generated_Image_bsc36kbsc36kbsc3-removebg-preview.png'
import './App.css'

function App() {
  const [user, setUser] = useState<any>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [stats, setStats] = useState({ 'Disponível': 0, 'Alugado': 0, 'Manutenção': 0 });
  const [equipments, setEquipments] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'admin' | 'catalog' | 'manuals' | 'points'>('catalog');

  const fetchData = async () => {
    try {
      // Fetch Stats
      const statsRes = await fetch('http://localhost:3000/equipments/stats');
      const statsData = await statsRes.json();
      setStats(statsData);

      // Fetch Equipments for Alerts
      const equipRes = await fetch('http://localhost:3000/equipments');
      const equipData = await equipRes.json();
      setEquipments(equipData);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  // Persistência simples de login
  useEffect(() => {
    const savedUser = localStorage.getItem('loc_insight_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      if (parsedUser.role === 'ADMIN') {
        setActiveTab('admin');
      }
    }
  }, []);

  const handleLogin = (loggedUser: any) => {
    setUser(loggedUser);
    setShowLogin(false);
    localStorage.setItem('loc_insight_user', JSON.stringify(loggedUser));
    if (loggedUser.role === 'ADMIN') {
      setActiveTab('admin');
    } else {
      setActiveTab('catalog');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('loc_insight_user');
    localStorage.removeItem('loc_insight_token');
    setActiveTab('catalog');
  };

  const total = stats['Disponível'] + stats['Alugado'] + stats['Manutenção'];
  const occupancyRate = total > 0 ? Math.round((stats['Alugado'] / total) * 100) : 0;

  // Alertas de Preventiva
  const alerts = equipments.filter(eq => {
    if (!eq.proximaRevisao) return false;
    const proxima = new Date(eq.proximaRevisao);
    const hoje = new Date();
    const diffTime = proxima.getTime() - hoje.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  });

  if (showLogin && !user) {
    return <Login onLogin={handleLogin} onCancel={() => setShowLogin(false)} />;
  }

  return (
    <div className="app-container">
      <header className="header">
        <div className="container header-content">
          <div className="logo">
            <img src={logo} alt="Loc Insight" className="logo-img" />
          </div>

          <nav className="nav">
            {user && user.role === 'ADMIN' && (
              <button
                className={`nav-btn ${activeTab === 'admin' ? 'active' : ''}`}
                onClick={() => setActiveTab('admin')}
              >
                Gestão
              </button>
            )}
            <button
              className={`nav-btn ${activeTab === 'catalog' ? 'active' : ''}`}
              onClick={() => setActiveTab('catalog')}
            >
              Catálogo
            </button>
            {user && (
              <>
                <button
                  className={`nav-btn ${activeTab === 'manuals' ? 'active' : ''}`}
                  onClick={() => setActiveTab('manuals')}
                >
                  Manuais
                </button>
                <button
                  className={`nav-btn ${activeTab === 'points' ? 'active' : ''}`}
                  onClick={() => setActiveTab('points')}
                >
                  Fidelidade
                </button>
              </>
            )}
          </nav>

          {user ? (
            <div className="user-profile">
              <div className="user-info">
                <span className="user-name">{user.nome}</span>
                <span className="user-role">{user.role}</span>
              </div>
              <button onClick={handleLogout} className="logout-btn">Sair</button>
            </div>
          ) : (
            <button 
              onClick={() => setShowLogin(true)} 
              className="login-nav-btn"
              style={{
                padding: '0.5rem 1.25rem',
                backgroundColor: 'var(--primary-orange)',
                color: 'white',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 700,
                fontSize: '0.9rem',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(1.1)')}
              onMouseLeave={(e) => (e.currentTarget.style.filter = 'none')}
            >
              Entrar
            </button>
          )}
        </div>
      </header>

      <main className="main-content container">
        {activeTab === 'admin' && user && user.role === 'ADMIN' && (
          <>
            <div className="page-header">
              <h1>Painel de Gestão</h1>
              <p>Controle total da frota e alertas de manutenção.</p>
            </div>

            <div className="content-grid">
              <div className="form-section">
                <EquipmentForm />

                <div style={{ marginTop: '2rem' }}>
                  <UserRegistrationForm />
                </div>

                {alerts.length > 0 && (
                  <div className="card" style={{ marginTop: '2rem', borderLeft: '4px solid var(--danger)' }}>
                    <h3 style={{ color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                      ⚠️ Revisões Próximas ({alerts.length})
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {alerts.map(eq => (
                        <div key={eq.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: 'var(--gray-50)', borderRadius: 'var(--radius-sm)' }}>
                          <span style={{ fontWeight: '600' }}>{eq.nome}</span>
                          <span style={{ fontSize: '0.8rem', color: 'var(--danger)', fontWeight: '600' }}>
                            {new Date(eq.proximaRevisao).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="info-section">
                <div className="card" style={{ height: '100%', background: 'var(--secondary-blue)', color: 'white' }}>
                  <h3 style={{ color: 'white', marginBottom: '1.5rem' }}>Status da Frota</h3>

                  <div style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                      <span>Taxa de Ocupação</span>
                      <span>{occupancyRate}%</span>
                    </div>
                    <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                      <div style={{ width: `${occupancyRate}%`, height: '100%', background: 'var(--primary-orange)', transition: 'width 0.8s ease' }}></div>
                    </div>
                  </div>

                  <div className="stats">
                    <div className="stat-item" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                      <span className="stat-label">Total de Itens</span>
                      <span className="stat-value">{total}</span>
                    </div>
                    <div className="stat-item" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                      <span className="stat-label">Disponíveis</span>
                      <span className="stat-value" style={{ color: '#4ade80' }}>{stats['Disponível']}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Em Manutenção</span>
                      <span className="stat-value" style={{ color: '#facc15' }}>{stats['Manutenção']}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="list-section">
              <div className="page-header" style={{ marginTop: '3rem' }}>
                <h2>Inventário Detalhado</h2>
              </div>
              <EquipmentList />
            </div>
          </>
        )}

        {activeTab === 'catalog' && (
          <>
            <div className="page-header">
              <h1>Equipamentos Disponíveis</h1>
              <p>Soluções completas para sua obra com o melhor custo-benefício.</p>
            </div>
            <EquipmentCatalog />
          </>
        )}

        {activeTab === 'manuals' && user && <ManualsCenter />}

        {activeTab === 'points' && user && <PointsConsultation />}
      </main>

      <footer className="footer">
        <div className="container">
          <div className="logo" style={{ justifyContent: 'center', marginBottom: '1rem', opacity: 0.6 }}>
            <img src={logo} alt="Loc Insight" className="logo-img" style={{ height: '30px' }} />
          </div>
          <p>&copy; 2026 Loc Insight - Inteligência em Locação de Equipamentos</p>
        </div>
      </footer>
    </div>
  )
}

export default App
