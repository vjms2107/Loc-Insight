import { useState, useEffect } from 'react'
import EquipmentForm from './components/EquipmentForm'
import EquipmentList from './components/EquipmentList'
import EquipmentCatalog from './components/EquipmentCatalog'
import ManualsCenter from './components/ManualsCenter'
import PointsConsultation from './components/PointsConsultation'
import './App.css'

function App() {
  const [stats, setStats] = useState({ 'Disponível': 0, 'Alugado': 0, 'Manutenção': 0 });
  const [equipments, setEquipments] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'admin' | 'catalog' | 'manuals' | 'points'>('admin');

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

  const total = stats['Disponível'] + stats['Alugado'] + stats['Manutenção'];
  const occupancyRate = total > 0 ? Math.round((stats['Alugado'] / total) * 100) : 0;

  // PB09: Alertas de Preventiva
  const alerts = equipments.filter(eq => {
    if (!eq.proximaRevisao) return false;
    const proxima = new Date(eq.proximaRevisao);
    const hoje = new Date();
    const diffTime = proxima.getTime() - hoje.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7; // Alerta se for em 7 dias ou menos (ou se já passou)
  });

  return (
    <div className="app-container">
      <header className="header">
        <div className="container header-content">
          <div className="logo">
            <span className="logo-icon">🏗️</span>
            <span className="logo-text">Loc <span className="highlight">Insight</span></span>
          </div>
          <nav className="nav">
            <button 
              className={`nav-btn ${activeTab === 'admin' ? 'active' : ''}`} 
              onClick={() => setActiveTab('admin')}
            >
              Gestão
            </button>
            <button 
              className={`nav-btn ${activeTab === 'catalog' ? 'active' : ''}`} 
              onClick={() => setActiveTab('catalog')}
            >
              Catálogo
            </button>
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
          </nav>
        </div>
      </header>

      <main className="main-content container">
        {activeTab === 'admin' && (
          <>
            <div className="page-header">
              <h1>Gestão de Ativos</h1>
              <p>Gerenciamento interno de frota e inventário técnico.</p>
            </div>

            <div className="content-grid">
              <div className="form-section">
                <EquipmentForm />
                
                {/* PB09: Widget de Alertas */}
                {alerts.length > 0 && (
                  <div className="card" style={{ marginTop: '2rem', border: '1px solid #fee2e2', background: '#fff' }}>
                    <h3 style={{ color: '#991b1b', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                      ⚠️ Alertas de Preventiva ({alerts.length})
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {alerts.map(eq => (
                        <div key={eq.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: '#fef2f2', borderRadius: 'var(--radius-sm)' }}>
                          <span style={{ fontWeight: '600' }}>{eq.nome}</span>
                          <span style={{ fontSize: '0.8rem', color: '#dc2626' }}>
                            Revisão em: {new Date(eq.proximaRevisao).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="info-section">
                <div className="card" style={{ height: '100%', background: 'var(--secondary-blue)', color: 'white' }}>
                  <h3 style={{ color: 'white', marginBottom: '1rem' }}>Resumo da Frota</h3>
                  
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                      <span>Taxa de Ocupação</span>
                      <span>{occupancyRate}%</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                      <div style={{ width: `${occupancyRate}%`, height: '100%', background: 'var(--primary-orange)', transition: 'width 0.5s ease' }}></div>
                    </div>
                  </div>

                  <div className="stats">
                    <div className="stat-item">
                      <span className="stat-label">Total de Itens</span>
                      <span className="stat-value">{total}</span>
                    </div>
                    <div className="stat-item">
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
              <EquipmentList />
            </div>
          </>
        )}

        {activeTab === 'catalog' && (
          <>
            <div className="page-header">
              <h1>Nosso Catálogo</h1>
              <p>Explore nossos equipamentos disponíveis para locação imediata.</p>
            </div>
            <EquipmentCatalog />
          </>
        )}

        {activeTab === 'manuals' && <ManualsCenter />}
        
        {activeTab === 'points' && <PointsConsultation />}
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2026 Loc Insight - Sistema de Gestão de Locação</p>
        </div>
      </footer>
    </div>
  )
}

      <footer className="footer">
        <div className="container">
          <p>&copy; 2026 Loc Insight - Sistema de Gestão de Locação</p>
        </div>
      </footer>
    </div>
  )
}

export default App
