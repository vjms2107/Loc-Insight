import logo from '../assets/logo.png';
import { useState } from 'react';

interface LoginProps {
  onLogin: (user: any) => void;
  onCancel?: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onCancel }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao processar requisição');
      }

      // data contains { token, id, nome, email, role, pontos }
      localStorage.setItem('loc_insight_token', data.token);
      onLogin(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <div className="logo-container-large">
            <img src={logo} alt="Loc Insight Logo" className="logo-img-large" />
          </div>
          <h2>Bem-vindo de volta</h2>
          <p>Acesse sua conta para gerenciar seus equipamentos</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {onCancel && (
            <button 
              type="button" 
              onClick={onCancel}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: 'var(--gray-600)', 
                cursor: 'pointer', 
                fontSize: '0.85rem',
                fontWeight: 600,
                textDecoration: 'none',
                marginTop: '0.5rem'
              }}
            >
              ← Voltar ao Catálogo
            </button>
          )}
        </div>

        <div className="login-footer">
          <p style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>Acessos para Teste:</p>
          <p>Admin: admin@locinsight.com / admin123</p>
          <p>Cliente: cliente@gmail.com / cliente123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
