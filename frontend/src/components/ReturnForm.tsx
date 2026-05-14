import React, { useState } from 'react';

interface ReturnFormProps {
  equipment: any;
  onSuccess: () => void;
  onCancel: () => void;
}

const ReturnForm: React.FC<ReturnFormProps> = ({ equipment, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    userEmail: '',
    estado: 'Bom',
    observacoes: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/equipments/return', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          equipamentoId: equipment.id,
          ...formData
        }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.bonusAtribuido) {
          alert(`Devolução processada! +${result.pontos} pontos atribuídos ao cliente.`);
        } else {
          alert('Devolução processada com sucesso.');
        }
        onSuccess();
      } else {
        alert('Erro ao processar devolução');
      }
    } catch (error) {
      console.error(error);
      alert('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="return-form">
      <h3>Checklist de Devolução</h3>
      <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
        Item: <strong>{equipment.nome}</strong>
      </p>

      <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
        <div className="form-group">
          <label>E-mail do Cliente (para pontos)</label>
          <input 
            type="email" 
            placeholder="cliente@email.com"
            value={formData.userEmail}
            onChange={e => setFormData({...formData, userEmail: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Estado do Equipamento</label>
          <select 
            value={formData.estado}
            onChange={e => setFormData({...formData, estado: e.target.value})}
          >
            <option value="Bom">Bom Estado (Gera Bônus 🏆)</option>
            <option value="Regular">Regular</option>
            <option value="Ruim">Ruim / Danificado</option>
          </select>
        </div>

        <div className="form-group">
          <label>Observações</label>
          <textarea 
            placeholder="Alguma avaria ou observação técnica?"
            value={formData.observacoes}
            onChange={e => setFormData({...formData, observacoes: e.target.value})}
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          <button type="button" onClick={onCancel} className="btn-secondary" style={{ flex: 1, padding: '0.75rem' }}>Cancelar</button>
          <button type="submit" className="btn-primary" style={{ flex: 1, padding: '0.75rem' }} disabled={loading}>
            {loading ? 'Processando...' : 'Finalizar Devolução'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReturnForm;
