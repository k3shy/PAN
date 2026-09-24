import { Shield, User, Eye, Edit3 } from 'lucide-react';
import { Role } from '../../context/AuthContext';

const users = [
  { id: '1', email: 'admin@pan.com', name: 'Admin User', role: 'admin' as Role, status: 'Active' },
  { id: '2', email: 'editor@pan.com', name: 'Editor User', role: 'editor' as Role, status: 'Active' },
  { id: '3', email: 'content@pan.com', name: 'Content Manager', role: 'content_manager' as Role, status: 'Active' },
  { id: '4', email: 'viewer@pan.com', name: 'Viewer User', role: 'viewer' as Role, status: 'Active' },
];

const roleDescriptions: Record<Role, string> = {
  admin: 'Full access to all features including user management',
  editor: 'Can edit products, collections, and lookbook',
  content_manager: 'Can edit hero, about, and newsletter sections',
  viewer: 'Read-only access with analytics viewing',
};

const roleIcons: Record<Role, typeof Shield> = {
  admin: Shield,
  editor: Edit3,
  content_manager: Edit3,
  viewer: Eye,
};

const roleColors: Record<Role, string> = {
  admin: 'text-red-400 bg-red-400/10 border-red-400/30',
  editor: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
  content_manager: 'text-purple-400 bg-purple-400/10 border-purple-400/30',
  viewer: 'text-green-400 bg-green-400/10 border-green-400/30',
};

export default function UsersManager() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-grotesk font-bold text-pan-white">User Management</h2>
        <p className="text-sm text-pan-muted mt-1">Manage employee accounts and permissions</p>
      </div>

      {/* Role Guide */}
      <div className="bg-pan-dark border border-white/5 rounded-sm p-6">
        <h3 className="text-sm font-semibold text-pan-white mb-4">Role Permissions Guide</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(Object.keys(roleDescriptions) as Role[]).map(role => {
            const Icon = roleIcons[role];
            return (
              <div key={role} className="flex items-start gap-3 p-3 bg-pan-gray rounded-sm">
                <div className={`w-8 h-8 rounded-sm flex items-center justify-center border ${roleColors[role]}`}>
                  <Icon size={14} />
                </div>
                <div>
                  <p className="text-sm font-medium text-pan-white capitalize">{role.replace('_', ' ')}</p>
                  <p className="text-xs text-pan-muted mt-0.5">{roleDescriptions[role]}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Users List */}
      <div className="bg-pan-dark border border-white/5 rounded-sm overflow-hidden">
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-pan-white">Employees ({users.length})</h3>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-pan-accent text-white text-xs font-medium rounded-sm hover:bg-red-600 transition-all">
            <User size={14} />
            Add Employee
          </button>
        </div>

        <div className="divide-y divide-white/5">
          {users.map(user => {
            const Icon = roleIcons[user.role];
            return (
              <div key={user.id} className="flex items-center gap-4 p-4 hover:bg-pan-gray/50 transition-colors">
                <div className="w-10 h-10 bg-pan-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-pan-accent font-bold text-sm">{user.name.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-pan-white">{user.name}</p>
                  <p className="text-xs text-pan-muted">{user.email}</p>
                </div>
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-sm border text-xs ${roleColors[user.role]}`}>
                  <Icon size={12} />
                  <span className="capitalize">{user.role.replace('_', ' ')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-xs text-pan-muted">{user.status}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Note */}
      <div className="bg-yellow-900/10 border border-yellow-900/20 rounded-sm p-4">
        <p className="text-xs text-yellow-400">
          <strong>Note:</strong> This is a demo portal. In production, user management would be connected to a backend database with proper authentication and authorization.
        </p>
      </div>
    </div>
  );
}
