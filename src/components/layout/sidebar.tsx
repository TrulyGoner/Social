import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  BarChart3, 
  Settings, 
} from 'lucide-react';
import { ROUTES } from '../../utils/constants/config';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
  badge?: string;
}

const navigation: NavItem[] = [
  { name: 'Dashboard', href: ROUTES.dashboard, icon: LayoutDashboard },
  { name: 'Posts', href: ROUTES.posts, icon: FileText },
  { name: 'Analytics', href: ROUTES.analytics, icon: BarChart3 },
  { name: 'Settings', href: ROUTES.settings, icon: Settings },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      {/* Navigation */}
      <nav className="mt-8 px-4 space-y-2" style={{ marginTop: '20px' }}>
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={`
                group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors
                ${isActive 
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200' 
                  : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                }
              `}
            >
              <Icon className={`
                mr-3 h-5 w-5 flex-shrink-0
                ${isActive 
                  ? 'text-blue-500 dark:text-blue-400' 
                  : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'
                }
              `} />
              {item.name}
              {item.badge && (
                <span className="ml-auto bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};