import React, { useEffect, useState } from 'react';

interface Equipment {
  id: number;
  nome: string;
  descricao: string;
  categoria: string;
  status: string;
  imagemUrl: string | null;
}

const EquipmentCatalog: React.FC = () => {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchEquipments = async () => {
    try {
      const url = new URL('http://localhost:3000/equipments');
      if (searchTerm) url.searchParams.append('nome', searchTerm);
      if (selectedCategory) url.searchParams.append('categoria', selectedCategory);

      const response = await fetch(url.toString());
      const data = await response.json();
      setEquipments(data);
    } catch (error) {
      console.error('Erro ao buscar catálogo:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchEquipments();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, selectedCategory]);

  const handleWhatsAppCheckout = (equipment: Equipment) => {
    const phone = '5511999999999'; // Número fictício da locadora
    const message = `Olá! Tenho interesse em alugar o equipamento:
*${equipment.nome}*
ID: #${equipment.id}
Categoria: ${equipment.categoria}
Status Atual: ${equipment.status}

Poderia me passar mais informações sobre valores e disponibilidade?`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      'Disponível': '#22c55e',
      'Alugado': '#ef4444',
      'Manutenção': '#eab308'
    };
    const color = colors[status] || '#6b7280';

    return (
      <span style={{ 
        padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold',
        backgroundColor: `${color}20`, color, border: `1px solid ${color}`
      }}>
        {status}
      </span>
    );
  };

  // Extrair categorias únicas para o filtro
  const categories = Array.from(new Set(equipments.map(e => e.categoria))).filter(Boolean);

  return (
    <div className="catalog-container" style={{ marginTop: '2rem' }}>
      <div className="catalog-filters card glass" style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <div className="form-group" style={{ flex: 2, marginBottom: 0 }}>
          <label>Buscar Equipamento</label>
          <input 
            type="text" 
            placeholder="Ex: Escavadeira, Betoneira..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
          <label>Categoria</label>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">Todas</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
      </div>

      {loading ? (
        <p>Carregando catálogo...</p>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '2rem' 
        }}>
          {equipments.length === 0 ? (
            <p style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem', color: '#666' }}>
              Nenhum equipamento encontrado com esses filtros.
            </p>
          ) : (
            equipments.map(eq => (
              <div key={eq.id} className="card equipment-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s ease' }}>
                <div style={{ height: '200px', overflow: 'hidden', position: 'relative', background: '#eee' }}>
                  {eq.imagemUrl ? (
                    <img 
                      src={`http://localhost:3000${eq.imagemUrl}`} 
                      alt={eq.nome} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>🏗️</div>
                  )}
                  <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                    {getStatusBadge(eq.status)}
                  </div>
                </div>

                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--primary-orange)', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                    {eq.categoria}
                  </div>
                  <h3 style={{ marginBottom: '0.75rem', fontSize: '1.25rem' }}>{eq.nome}</h3>
                  <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1.5rem', flex: 1 }}>
                    {eq.descricao.length > 100 ? eq.descricao.substring(0, 100) + '...' : eq.descricao}
                  </p>

                  <button 
                    className="btn-primary" 
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                    onClick={() => handleWhatsAppCheckout(eq)}
                  >
                    <span>📱</span> Alugar via WhatsApp
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <style>{`
        .equipment-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.15);
        }
      `}</style>
    </div>
  );
};

export default EquipmentCatalog;
