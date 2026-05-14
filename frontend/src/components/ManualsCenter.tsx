import React, { useEffect, useState } from 'react';

interface Equipment {
  id: number;
  nome: string;
  categoria: string;
  manualPdf: string | null;
}

const ManualsCenter: React.FC = () => {
  const [manuals, setManuals] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchManuals = async () => {
      try {
        const response = await fetch('http://localhost:3000/equipments');
        const data: Equipment[] = await response.json();
        // Filtrar apenas os que possuem manual
        setManuals(data.filter(eq => eq.manualPdf));
      } catch (error) {
        console.error('Erro ao buscar manuais:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchManuals();
  }, []);

  const filteredManuals = manuals.filter(m => 
    m.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="manuals-container" style={{ marginTop: '2rem' }}>
      <div className="card glass" style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>📚 Central de Manuais</h2>
        <p style={{ color: '#666', marginBottom: '1.5rem' }}>
          Acesse manuais de uso correto e segurança para garantir a melhor experiência na sua obra.
        </p>
        <input 
          type="text" 
          placeholder="Buscar por nome do equipamento ou categoria..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100%' }}
        />
      </div>

      {loading ? (
        <p>Carregando manuais...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {filteredManuals.length === 0 ? (
            <p style={{ gridColumn: '1/-1', textAlign: 'center', padding: '2rem', color: '#666' }}>
              Nenhum manual encontrado.
            </p>
          ) : (
            filteredManuals.map(manual => (
              <div key={manual.id} className="card glass" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{manual.nome}</h3>
                    <span style={{ fontSize: '0.75rem', color: 'var(--primary-orange)', fontWeight: 'bold', textTransform: 'uppercase' }}>
                      {manual.categoria}
                    </span>
                  </div>
                  <span style={{ fontSize: '1.5rem' }}>📄</span>
                </div>
                
                <a 
                  href={`http://localhost:3000${manual.manualPdf}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ textAlign: 'center', textDecoration: 'none', fontSize: '0.9rem' }}
                >
                  Download Manual (PDF)
                </a>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ManualsCenter;
