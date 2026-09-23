import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useContent } from '../context/ContentContext';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Layers,
  Image,
  FileText,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Save,
  RotateCcw,
  ExternalLink,
  Menu,
  X,
} from 'lucide-react';
import ProductsEditor from '../components/portal/ProductsEditor';
import CollectionsEditor from '../components/portal/CollectionsEditor';
import LookbookEditor from '../components/portal/LookbookEditor';
import HeroEditor from '../components/portal/HeroEditor';
import AboutEditor from '../components/portal/AboutEditor';
import UsersManager from '../components/portal/UsersManager';
import AnalyticsView from '../components/portal/AnalyticsView';

type Tab = 'dashboard' | 'products' | 'collections' | 'lookbook' | 'hero' | 'about' | 'users' | 'analytics';

export default function Portal() {
  const { user, logout, hasPermission, permissions } = useAuth();
  const { hasUnsavedChanges, saveChanges, resetContent } = useContent();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { id: 'dashboard' as Tab, label: 'Dashboard', icon: LayoutDashboard, show: true },
    { id: 'products' as Tab, label: 'Products', icon: Package, show: permissions?.canEditProducts },
    { id: 'collections' as Tab, label: 'Collections', icon: Layers, show: permissions?.canEditCollections },
    { id: 'lookbook' as Tab, label: 'Lookbook', icon: Image, show: permissions?.canEditLookbook },
    { id: 'hero' as Tab, label: 'Hero Section', icon: FileText, show: permissions?.canEditHero },
    { id: 'about' as Tab, label: 'About Section', icon: FileText, show: permissions?.canEditAbout },
    { id: 'users' as Tab, label: 'User Management', icon: Users, show: permissions?.canManageUsers },
    { id: 'analytics' as Tab, label: 'Analytics', icon: BarChart3, show: permissions?.canViewAnalytics },
  ].filter(item => item.show);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView onNavigate={setActiveTab} />;
      case 'products':
        return <ProductsEditor />;
      case 'collections':
        return <CollectionsEditor />;
      case 'lookbook':
        return <LookbookEditor />;
      case 'hero':
        return <HeroEditor />;
      case 'about':
        return <AboutEditor />;
      case 'users':
        return <UsersManager />;
      case 'analytics':
        return <AnalyticsView />;
      default:
        return <DashboardView onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-pan-black flex">
      {/* Sidebar Overlay (Mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-pan-dark border-r border-white/5 flex flex-col transform transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-pan-accent rounded-sm flex items-center justify-center">
              <span className="text-white font-bold text-xs font-grotesk">P</span>
            </div>
            <div>
              <h2 className="text-sm font-grotesk font-bold text-pan-white">P.A.N Portal</h2>
              <p className="text-[10px] text-pan-muted">Content Management</p>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-pan-accent/20 rounded-full flex items-center justify-center">
              <span className="text-pan-accent font-bold text-sm">{user?.name.charAt(0)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-pan-white truncate">{user?.name}</p>
              <p className="text-xs text-pan-muted capitalize">{user?.role.replace('_', ' ')}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium transition-all ${
                activeTab === item.id
                  ? 'bg-pan-accent text-white'
                  : 'text-pan-muted hover:text-pan-white hover:bg-pan-light'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/5 space-y-2">
          <a
            href="/"
            target="_blank"
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-pan-muted hover:text-pan-white hover:bg-pan-light rounded-sm transition-all"
          >
            <ExternalLink size={16} />
            View Live Site
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-pan-muted hover:text-red-400 hover:bg-pan-light rounded-sm transition-all"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-pan-dark/95 backdrop-blur-md border-b border-white/5 px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-pan-muted hover:text-pan-white"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h1 className="text-lg font-grotesk font-bold text-pan-white capitalize">
                {activeTab === 'dashboard' ? 'Dashboard' : activeTab.replace('_', ' ')}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              {hasUnsavedChanges && (
                <span className="text-xs text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full">
                  Unsaved changes
                </span>
              )}
              <button
                onClick={saveChanges}
                disabled={!hasUnsavedChanges}
                className="flex items-center gap-2 px-4 py-2 bg-pan-accent text-white text-sm font-medium rounded-sm hover:bg-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={16} />
                <span className="hidden sm:inline">Save Changes</span>
              </button>
              <button
                onClick={() => setShowResetConfirm(true)}
                className="flex items-center gap-2 px-4 py-2 border border-white/10 text-pan-muted text-sm font-medium rounded-sm hover:border-white/30 hover:text-pan-white transition-all"
              >
                <RotateCcw size={16} />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          {renderContent()}
        </main>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-pan-dark border border-white/10 rounded-sm p-6 max-w-md w-full">
            <h3 className="text-lg font-grotesk font-bold text-pan-white mb-2">Reset All Content?</h3>
            <p className="text-sm text-pan-muted mb-6">
              This will reset all content to the default values. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 px-4 py-2 border border-white/10 text-pan-muted rounded-sm hover:border-white/30 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetContent();
                  setShowResetConfirm(false);
                }}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-sm hover:bg-red-700 transition-all"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DashboardView({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  const { user, permissions } = useAuth();
  const { content } = useContent();

  const stats = [
    { label: 'Total Products', value: content.products.length, icon: Package },
    { label: 'Collections', value: content.collections.length, icon: Layers },
    { label: 'Lookbook Items', value: content.lookbook.length, icon: Image },
    { label: 'New Items', value: content.products.filter(p => p.isNew).length, icon: BarChart3 },
  ];

  const quickActions = [
    { label: 'Edit Products', tab: 'products' as Tab, show: permissions?.canEditProducts },
    { label: 'Edit Collections', tab: 'collections' as Tab, show: permissions?.canEditCollections },
    { label: 'Edit Lookbook', tab: 'lookbook' as Tab, show: permissions?.canEditLookbook },
    { label: 'Edit Hero', tab: 'hero' as Tab, show: permissions?.canEditHero },
    { label: 'Edit About', tab: 'about' as Tab, show: permissions?.canEditAbout },
    { label: 'Manage Users', tab: 'users' as Tab, show: permissions?.canManageUsers },
  ].filter(action => action.show);

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="bg-gradient-to-br from-pan-accent/10 to-pan-dark border border-pan-accent/20 rounded-sm p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-grotesk font-bold text-pan-white mb-2">
          Welcome back, {user?.name.split(' ')[0]}! 👋
        </h2>
        <p className="text-pan-muted">
          You're logged in as <span className="text-pan-accent font-medium capitalize">{user?.role.replace('_', ' ')}</span>.
          Last updated: {new Date(content.lastUpdated).toLocaleDateString()}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-pan-dark border border-white/5 rounded-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <stat.icon size={20} className="text-pan-accent" />
            </div>
            <p className="text-2xl font-grotesk font-bold text-pan-white">{stat.value}</p>
            <p className="text-xs text-pan-muted mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-grotesk font-bold text-pan-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => onNavigate(action.tab)}
              className="p-4 bg-pan-dark border border-white/5 rounded-sm hover:border-pan-accent/30 transition-all text-left group"
            >
              <p className="text-sm font-medium text-pan-white group-hover:text-pan-accent transition-colors">
                {action.label}
              </p>
              <p className="text-xs text-pan-muted mt-1">Click to edit</p>
            </button>
          ))}
        </div>
      </div>

      {/* Permissions Overview */}
      <div>
        <h3 className="text-lg font-grotesk font-bold text-pan-white mb-4">Your Permissions</h3>
        <div className="bg-pan-dark border border-white/5 rounded-sm p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {permissions && Object.entries(permissions).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${value ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm text-pan-muted capitalize">
                  {key.replace('can', '').replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <span className={`text-xs ml-auto ${value ? 'text-green-400' : 'text-red-400'}`}>
                  {value ? 'Yes' : 'No'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
