import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Role = 'admin' | 'editor' | 'content_manager' | 'viewer';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  avatar?: string;
}

export interface Permission {
  canEditProducts: boolean;
  canEditCollections: boolean;
  canEditLookbook: boolean;
  canEditHero: boolean;
  canEditAbout: boolean;
  canEditNewsletter: boolean;
  canManageUsers: boolean;
  canViewAnalytics: boolean;
  canPublish: boolean;
}

export const rolePermissions: Record<Role, Permission> = {
  admin: {
    canEditProducts: true,
    canEditCollections: true,
    canEditLookbook: true,
    canEditHero: true,
    canEditAbout: true,
    canEditNewsletter: true,
    canManageUsers: true,
    canViewAnalytics: true,
    canPublish: true,
  },
  editor: {
    canEditProducts: true,
    canEditCollections: true,
    canEditLookbook: true,
    canEditHero: false,
    canEditAbout: false,
    canEditNewsletter: false,
    canManageUsers: false,
    canViewAnalytics: false,
    canPublish: true,
  },
  content_manager: {
    canEditProducts: false,
    canEditCollections: false,
    canEditLookbook: false,
    canEditHero: true,
    canEditAbout: true,
    canEditNewsletter: true,
    canManageUsers: false,
    canViewAnalytics: false,
    canPublish: true,
  },
  viewer: {
    canEditProducts: false,
    canEditCollections: false,
    canEditLookbook: false,
    canEditHero: false,
    canEditAbout: false,
    canEditNewsletter: false,
    canManageUsers: false,
    canViewAnalytics: true,
    canPublish: false,
  },
};

// Demo users for testing
const demoUsers: User[] = [
  { id: '1', email: 'admin@pan.com', name: 'Admin User', role: 'admin' },
  { id: '2', email: 'editor@pan.com', name: 'Editor User', role: 'editor' },
  { id: '3', email: 'content@pan.com', name: 'Content Manager', role: 'content_manager' },
  { id: '4', email: 'viewer@pan.com', name: 'Viewer User', role: 'viewer' },
];

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  permissions: Permission | null;
  hasPermission: (permission: keyof Permission) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('pan_user');
    return stored ? JSON.parse(stored) : null;
  });

  const permissions = user ? rolePermissions[user.role] : null;

  const login = async (email: string, password: string): Promise<boolean> => {
    // Demo authentication - in production, this would call an API
    const foundUser = demoUsers.find(u => u.email === email);
    
    if (foundUser && password === 'demo123') {
      setUser(foundUser);
      localStorage.setItem('pan_user', JSON.stringify(foundUser));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pan_user');
  };

  const hasPermission = (permission: keyof Permission): boolean => {
    return permissions ? permissions[permission] : false;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, permissions, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
