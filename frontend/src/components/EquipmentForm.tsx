import React, { useState } from 'react';

const EquipmentForm: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    categoria: '',
    status: 'Disponível',
  });
  const [imagem, setImagem] = useState<File | null>(null);
  const [manual, setManual] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      if (e.target.name === 'imagem') {
        setImagem(e.target.files[0]);
      } else if (e.target.name === 'manual') {
        setManual(e.target.files[0]);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const data = new FormData();
    data.append('nome', formData.nome);
    data.append('descricao', formData.descricao);
    data.append('categoria', formData.categoria);
    data.append('status', formData.status);
    if (imagem) data.append('imagem', imagem);
    if (manual) data.append('manual', manual);

    try {
      // Endpoint que será implementado no backend
      const response = await fetch('http://localhost:3000/equipments', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Equipamento cadastrado com sucesso!' });
        setFormData({ nome: '', descricao: '', categoria: '', status: 'Disponível' });
        setImagem(null);
        setManual(null);
      } else {
        setMessage({ type: 'error', text: 'Erro ao cadastrar equipamento. Verifique o backend.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro de conexão com o servidor.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card glass">
      <h2 style={{ marginBottom: '1.5rem', borderLeft: '4px solid var(--primary-orange)', paddingLeft: '1rem' }}>
        Novo Equipamento
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome do Equipamento</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
            placeholder="Ex: Betoneira 400L"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="descricao">Descrição / Ficha Técnica</label>
          <textarea
            id="descricao"
            name="descricao"
            rows={3}
            value={formData.descricao}
            onChange={handleInputChange}
            placeholder="Detalhes técnicos, potência, voltagem..."
            required
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label htmlFor="categoria">Categoria</label>
            <input
              type="text"
              id="categoria"
              name="categoria"
              value={formData.categoria}
              onChange={handleInputChange}
              placeholder="Ex: Construção"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status Inicial</label>
            <select id="status" name="status" value={formData.status} onChange={handleInputChange}>
              <option value="Disponível">Disponível</option>
              <option value="Alugado">Alugado</option>
              <option value="Manutenção">Manutenção</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="imagem">Foto do Equipamento</label>
          <input
            type="file"
            id="imagem"
            name="imagem"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="manual">Manual Técnico (PDF)</label>
          <input
            type="file"
            id="manual"
            name="manual"
            accept=".pdf"
            onChange={handleFileChange}
          />
        </div>

        {message && (
          <div style={{ 
            padding: '1rem', 
            borderRadius: 'var(--radius-md)', 
            marginBottom: '1rem',
            backgroundColor: message.type === 'success' ? '#dcfce7' : '#fee2e2',
            color: message.type === 'success' ? '#166534' : '#991b1b',
            border: `1px solid ${message.type === 'success' ? '#bbf7d0' : '#fecaca'}`
          }}>
            {message.text}
          </div>
        )}

        <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={loading}>
          {loading ? 'Enviando...' : 'Cadastrar Equipamento'}
        </button>
      </form>
    </div>
  );
};

export default EquipmentForm;
