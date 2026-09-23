import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';

export default function AdminBadge() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <Link
      to="/portal"
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-pan-accent text-white text-sm font-medium rounded-full shadow-lg hover:bg-red-600 transition-all animate-pulse-glow"
    >
      <Settings size={16} />
      <span className="hidden sm:inline">Portal</span>
    </Link>
  );
}
