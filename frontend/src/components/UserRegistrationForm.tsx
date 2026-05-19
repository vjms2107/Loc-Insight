import { useState } from 'react';

const UserRegistrationForm = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [role, setRole] = useState('CLIENT');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email, senha, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao registrar usuário');
      }

      setSuccess(`Usuário ${data.nome} (${data.role}) cadastrado com sucesso!`);
      setNome('');
      setEmail('');
      setSenha('');
      setRole('CLIENT');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card" style={{ padding: '2rem' }}>
      <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary-blue)', fontWeight: 700 }}>
        Cadastrar Novo Usuário
      </h3>

      <form onSubmit={handleSubmit}>
        {error && (
          <div className="error-message" style={{ marginBottom: '1rem' }}>
            {error}
          </div>
        )}
        {success && (
          <div className="success-message" style={{ 
            marginBottom: '1rem', 
            padding: '0.75rem', 
            backgroundColor: '#e6fffa', 
            color: '#047481', 
            border: '1px solid #b2f5ea', 
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.9rem',
            fontWeight: 600
          }}>
            {success}
          </div>
        )}

        <div className="form-group" style={{ marginBottom: '1.25rem' }}>
          <label htmlFor="reg-nome">Nome Completo</label>
          <input
            type="text"
            id="reg-nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome do usuário"
            required
            style={{ width: '100%' }}
          />
        </div>

        <div className="form-group" style={{ marginBottom: '1.25rem' }}>
          <label htmlFor="reg-email">E-mail</label>
          <input
            type="email"
            id="reg-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@locinsight.com"
            required
            style={{ width: '100%' }}
          />
        </div>

        <div className="form-group" style={{ marginBottom: '1.25rem' }}>
          <label htmlFor="reg-senha">Senha</label>
          <input
            type="password"
            id="reg-senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Senha provisória"
            required
            style={{ width: '100%' }}
          />
        </div>

        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="reg-role">Perfil / Role</label>
          <select
            id="reg-role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--gray-300)',
              backgroundColor: 'white',
              fontSize: '0.9rem',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="CLIENT">CLIENT (Cliente)</option>
            <option value="ADMIN">ADMIN (Administrador)</option>
          </select>
        </div>

        <button 
          type="submit" 
          className="btn-primary" 
          disabled={isLoading}
          style={{ width: '100%', padding: '0.85rem' }}
        >
          {isLoading ? 'Cadastrando...' : 'Cadastrar Usuário'}
        </button>
      </form>
    </div>
  );
};

export default UserRegistrationForm;
