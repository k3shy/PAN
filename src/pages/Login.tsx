import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, AlertCircle } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const success = await login(email, password);
    
    if (success) {
      navigate('/portal');
    } else {
      setError('Invalid credentials. Try demo accounts below.');
    }
    
    setLoading(false);
  };

  const demoAccounts = [
    { email: 'admin@pan.com', role: 'Admin', desc: 'Full access' },
    { email: 'editor@pan.com', role: 'Editor', desc: 'Products & collections' },
    { email: 'content@pan.com', role: 'Content Manager', desc: 'Text & content' },
    { email: 'viewer@pan.com', role: 'Viewer', desc: 'Read-only' },
  ];

  return (
    <div className="min-h-screen bg-pan-black flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-pan-accent rounded-sm flex items-center justify-center">
              <span className="text-white font-bold text-sm font-grotesk">P</span>
            </div>
          </div>
          <h1 className="text-2xl font-grotesk font-bold text-pan-white">Employee Portal</h1>
          <p className="text-sm text-pan-muted mt-2">Pins & Needle Management System</p>
        </div>

        {/* Login Form */}
        <div className="bg-pan-dark border border-white/5 rounded-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-900/20 border border-red-900/30 rounded-sm">
                <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-pan-white mb-2">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-pan-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-pan-gray border border-white/10 rounded-sm text-white placeholder-pan-muted focus:outline-none focus:border-pan-accent transition-colors"
                  placeholder="your.email@pan.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-pan-white mb-2">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-pan-muted" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-pan-gray border border-white/10 rounded-sm text-white placeholder-pan-muted focus:outline-none focus:border-pan-accent transition-colors"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-pan-accent text-white font-semibold rounded-sm hover:bg-red-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        {/* Demo Accounts */}
        <div className="mt-8">
          <p className="text-xs text-pan-muted text-center mb-4">Demo Accounts (Password: demo123)</p>
          <div className="grid grid-cols-2 gap-3">
            {demoAccounts.map((account) => (
              <button
                key={account.email}
                onClick={() => {
                  setEmail(account.email);
                  setPassword('demo123');
                }}
                className="p-3 bg-pan-dark border border-white/5 rounded-sm hover:border-pan-accent/30 transition-all text-left group"
              >
                <p className="text-xs font-semibold text-pan-white group-hover:text-pan-accent transition-colors">{account.role}</p>
                <p className="text-[10px] text-pan-muted mt-0.5">{account.email}</p>
                <p className="text-[10px] text-pan-muted/60 mt-0.5">{account.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Back to site */}
        <div className="text-center mt-8">
          <a href="/" className="text-sm text-pan-muted hover:text-pan-accent transition-colors">
            ← Back to Website
          </a>
        </div>
      </div>
    </div>
  );
}
