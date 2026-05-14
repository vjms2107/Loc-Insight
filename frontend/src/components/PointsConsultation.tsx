import React, { useState } from 'react';

const PointsConsultation: React.FC = () => {
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState<{ nome: string, pontos: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setUserData(null);

    try {
      const response = await fetch(`http://localhost:3000/users/points?email=${encodeURIComponent(email)}`);
      const data = await response.json();

      if (response.ok) {
        setUserData(data);
      } else {
        setError(data.error || 'Erro ao consultar pontos.');
      }
    } catch (err) {
      setError('Erro de conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  const handleRedeem = async () => {
    if (!userData || userData.pontos < 1000) {
      alert('Você precisa de pelo menos 1000 pontos para um resgate.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/users/redeem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, pontosAResgatar: 1000 }),
      });
      const data = await response.json();

      if (response.ok) {
        alert(`Resgate concluído! Seu código de desconto: ${data.descontoGerado}`);
        setUserData({ ...userData, pontos: data.pontosRestantes });
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert('Erro ao processar resgate.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="points-container" style={{ marginTop: '2rem', maxWidth: '600px', margin: '2rem auto' }}>
      <div className="card glass" style={{ textAlign: 'center' }}>
        <h2 style={{ marginBottom: '1rem' }}>🏆 Programa de Fidelidade</h2>
        <p style={{ color: '#666', marginBottom: '2rem' }}>
          Acumule pontos em cada locação e troque por descontos exclusivos.
          <br /><strong>1.000 pontos = R$ 50,00 de desconto!</strong>
        </p>

        <form onSubmit={handleConsult} style={{ marginBottom: '2rem' }}>
          <div className="form-group" style={{ textAlign: 'left' }}>
            <label htmlFor="email">E-mail Cadastrado</label>
            <input 
              type="email" 
              id="email" 
              placeholder="seu@email.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Consultando...' : 'Ver Meus Pontos'}
          </button>
        </form>

        {error && (
          <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', backgroundColor: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca' }}>
            {error}
          </div>
        )}

        {userData && (
          <div className="card" style={{ background: 'var(--secondary-blue)', color: 'white', border: 'none' }}>
            <p style={{ opacity: 0.8, fontSize: '0.9rem', marginBottom: '0.5rem' }}>Olá, {userData.nome}!</p>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Seu Saldo Atual:</p>
            <div style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--primary-orange)', margin: '1rem 0' }}>
              {userData.pontos} <span style={{ fontSize: '1rem', color: 'white' }}>pontos</span>
            </div>
            
            <button 
              onClick={handleRedeem} 
              className="btn-primary" 
              style={{ width: '100%', background: 'white', color: 'var(--secondary-blue)' }}
              disabled={userData.pontos < 1000 || loading}
            >
              {userData.pontos < 1000 ? 'Pontos Insuficientes' : 'Resgatar R$ 50 de Desconto'}
            </button>

            <p style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '1.5rem' }}>
              Continue alugando e cuidando bem dos equipamentos para ganhar mais pontos!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PointsConsultation;
