import React, { useEffect, useState } from 'react';
import MaintenanceForm from './MaintenanceForm';
import ReturnForm from './ReturnForm';

interface Equipment {
  id: number;
  nome: string;
  categoria: string;
  status: string;
  imagemUrl: string | null;
  manualPdf: string | null;
  proximaRevisao: string | null;
}

const EquipmentList: React.FC = () => {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQRCode, setSelectedQRCode] = useState<string | null>(null);
  const [selectedMaintenance, setSelectedMaintenance] = useState<number | null>(null);
  const [selectedReturn, setSelectedReturn] = useState<Equipment | null>(null);
  const [maintenanceHistory, setMaintenanceHistory] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showReturn, setShowReturn] = useState(false);

  const fetchEquipments = async () => {
    try {
      const response = await fetch('http://localhost:3000/equipments');
      const data = await response.json();
      setEquipments(data);
    } catch (error) {
      console.error('Erro ao buscar equipamentos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipments();
    const interval = setInterval(fetchEquipments, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const response = await fetch(`http://localhost:3000/equipments/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setEquipments(prev => prev.map(eq => eq.id === id ? { ...eq, status: newStatus } : eq));
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  const handleGenerateQRCode = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/equipments/${id}/qrcode`);
      const data = await response.json();
      setSelectedQRCode(data.qrCode);
    } catch (error) {
      console.error('Erro ao gerar QR Code:', error);
    }
  };

  const handleNotifyUsage = (equipment: Equipment) => {
    const phone = '5511999999999'; 
    const message = `Olá! Notamos que você está com o equipamento *${equipment.nome}* há algum tempo.
Lembramos a importância de:
1. Verificar o nível de óleo/combustível diariamente.
2. Não ultrapassar o limite de carga.
3. Manter o equipamento limpo após o uso.
Qualquer dúvida, consulte o manual ou nos chame aqui!`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const fetchHistory = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/maintenances/equipment/${id}`);
      const data = await response.json();
      setMaintenanceHistory(data);
    } catch (error) {
      console.error('Erro ao buscar histórico:', error);
    }
  };

  const handleOpenHistory = (id: number) => {
    setSelectedMaintenance(id);
    fetchHistory(id);
    setShowHistory(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Disponível': return '#22c55e';
      case 'Alugado': return '#ef4444';
      case 'Manutenção': return '#eab308';
      default: return '#6b7280';
    }
  };

  if (loading) return <p>Carregando inventário...</p>;

  return (
    <div className="card glass" style={{ marginTop: '2rem' }}>
      <h2 style={{ marginBottom: '1.5rem', borderLeft: '4px solid var(--secondary-blue)', paddingLeft: '1rem' }}>
        Inventário Atual
      </h2>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--border-gray)' }}>
              <th style={{ padding: '1rem' }}>Equipamento</th>
              <th style={{ padding: '1rem' }}>Categoria</th>
              <th style={{ padding: '1rem' }}>Status</th>
              <th style={{ padding: '1rem' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {equipments.map(eq => (
              <tr key={eq.id} style={{ borderBottom: '1px solid var(--border-gray)' }}>
                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {eq.imagemUrl ? (
                      <img src={`http://localhost:3000${eq.imagemUrl}`} alt={eq.nome} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🏗️</div>
                    )}
                    <div>
                      <div style={{ fontWeight: '600' }}>{eq.nome}</div>
                      {eq.proximaRevisao && (
                        <div style={{ fontSize: '0.7rem', color: '#666' }}>
                          Rev: {new Date(eq.proximaRevisao).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td style={{ padding: '1rem' }}>{eq.categoria}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ 
                    padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600',
                    backgroundColor: `${getStatusColor(eq.status)}20`, color: getStatusColor(eq.status), border: `1px solid ${getStatusColor(eq.status)}`
                  }}>
                    {eq.status}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <select value={eq.status} onChange={(e) => handleStatusChange(eq.id, e.target.value)} style={{ padding: '0.4rem', fontSize: '0.8rem' }}>
                      <option value="Disponível">Disponível</option>
                      <option value="Alugado">Alugado</option>
                      <option value="Manutenção">Manutenção</option>
                    </select>
                    
                    <button onClick={() => handleGenerateQRCode(eq.id)} className="btn-secondary" style={{ padding: '0.4rem 0.6rem', fontSize: '0.75rem' }} title="QR Code">QR</button>
                    
                    {eq.status === 'Alugado' && (
                      <button onClick={() => handleNotifyUsage(eq)} className="btn-secondary" style={{ padding: '0.4rem 0.6rem', fontSize: '0.75rem', background: '#dcfce7', color: '#166534' }} title="Notificar Uso">📱</button>
                    )}

                    {eq.status === 'Alugado' && (
                      <button onClick={() => { setSelectedReturn(eq); setShowReturn(true); }} className="btn-secondary" style={{ padding: '0.4rem 0.6rem', fontSize: '0.75rem', background: '#dbeafe', color: '#1e40af' }} title="Processar Devolução">↩️</button>
                    )}

                    <button onClick={() => handleOpenHistory(eq.id)} className="btn-secondary" style={{ padding: '0.4rem 0.6rem', fontSize: '0.75rem' }} title="Manutenção">🛠️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal QR Code */}
      {selectedQRCode && (
        <div className="modal-overlay" onClick={() => setSelectedQRCode(null)}>
          <div className="card modal-content" onClick={e => e.stopPropagation()}>
            <h3>QR Code Técnico</h3>
            <img src={selectedQRCode} alt="QR Code" style={{ width: '200px', margin: '1rem 0' }} />
            <button onClick={() => setSelectedQRCode(null)} className="btn-primary" style={{ width: '100%' }}>Fechar</button>
          </div>
        </div>
      )}

      {/* Modal Histórico de Manutenção */}
      {showHistory && (
        <div className="modal-overlay" onClick={() => setShowHistory(false)}>
          <div className="card modal-content" style={{ maxWidth: '600px' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3>Histórico de Manutenção</h3>
              <button onClick={() => { setShowHistory(false); setShowForm(true); }} className="btn-primary" style={{ fontSize: '0.8rem' }}>+ Nova</button>
            </div>
            
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {maintenanceHistory.length === 0 ? <p>Nenhuma manutenção registrada.</p> : (
                maintenanceHistory.map(m => (
                  <div key={m.id} style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <strong>{new Date(m.createdAt).toLocaleDateString()}</strong>
                      <span style={{ color: '#166534', fontWeight: 'bold' }}>R$ {m.custo.toFixed(2)}</span>
                    </div>
                    <p style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>{m.descricao}</p>
                    {m.pecasTrocadas && <p style={{ fontSize: '0.8rem', color: '#666' }}>Peças: {m.pecasTrocadas}</p>}
                  </div>
                ))
              )}
            </div>
            <button onClick={() => setShowHistory(false)} className="btn-secondary" style={{ width: '100%', marginTop: '1rem' }}>Fechar</button>
          </div>
        </div>
      )}

      {/* Modal Novo Registro */}
      {showForm && selectedMaintenance && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="card modal-content" style={{ maxWidth: '500px' }} onClick={e => e.stopPropagation()}>
            <MaintenanceForm 
              equipamentoId={selectedMaintenance} 
              onSuccess={() => { setShowForm(false); handleOpenHistory(selectedMaintenance); }} 
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      {/* Modal Devolução */}
      {showReturn && selectedReturn && (
        <div className="modal-overlay" onClick={() => setShowReturn(false)}>
          <div className="card modal-content" style={{ maxWidth: '500px' }} onClick={e => e.stopPropagation()}>
            <ReturnForm 
              equipment={selectedReturn}
              onSuccess={() => { setShowReturn(false); fetchEquipments(); }}
              onCancel={() => setShowReturn(false)}
            />
          </div>
        </div>
      )}

      <style>{`
        .modal-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;
        }
        .modal-content { text-align: center; width: 90%; }
        .btn-secondary { background: #f3f4f6; color: #374151; border: none; cursor: pointer; border-radius: var(--radius-sm); transition: 0.2s; }
        .btn-secondary:hover { background: #e5e7eb; }
      `}</style>
    </div>
  );
};

export default EquipmentList;
