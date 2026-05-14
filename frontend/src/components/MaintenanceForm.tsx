import React, { useState } from 'react';

interface MaintenanceFormProps {
  equipamentoId: number;
  onSuccess: () => void;
  onCancel: () => void;
}

const MaintenanceForm: React.FC<MaintenanceFormProps> = ({ equipamentoId, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    descricao: '',
    custo: '',
    pecasTrocadas: '',
    proximaRevisao: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/maintenances', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          equipamentoId,
          custo: parseFloat(formData.custo)
        }),
      });

      if (response.ok) {
        onSuccess();
      } else {
        alert('Erro ao registrar manutenção');
      }
    } catch (error) {
      console.error(error);
      alert('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="maintenance-form">
      <h3>Registrar Manutenção</h3>
      <form onSubmit={handleSubmit} style={{ textAlign: 'left', marginTop: '1rem' }}>
        <div className="form-group">
          <label>Descrição do Serviço</label>
          <textarea 
            required 
            placeholder="Ex: Troca de óleo, limpeza de filtros..."
            value={formData.descricao}
            onChange={e => setFormData({...formData, descricao: e.target.value})}
          />
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label>Custo (R$)</label>
            <input 
              type="number" 
              step="0.01" 
              required 
              value={formData.custo}
              onChange={e => setFormData({...formData, custo: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Próxima Revisão</label>
            <input 
              type="date" 
              value={formData.proximaRevisao}
              onChange={e => setFormData({...formData, proximaRevisao: e.target.value})}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Peças Trocadas</label>
          <input 
            type="text" 
            placeholder="Filtro de ar, Junta do motor..."
            value={formData.pecasTrocadas}
            onChange={e => setFormData({...formData, pecasTrocadas: e.target.value})}
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          <button type="button" onClick={onCancel} className="btn-secondary" style={{ flex: 1, padding: '0.75rem' }}>Cancelar</button>
          <button type="submit" className="btn-primary" style={{ flex: 1, padding: '0.75rem' }} disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar Registro'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MaintenanceForm;
