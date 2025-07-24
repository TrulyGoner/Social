import React from 'react';
import { BarChart3, Moon, Sun, Settings, User } from 'lucide-react';
import { Button } from '../ui/button';
import { useTheme } from '../../hooks/useTheme';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <BarChart3 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Social Dashboard
            </h1>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              icon={theme === 'dark' ? Sun : Moon}
              onClick={toggleTheme}
              aria-label="Toggle theme"
            />
            
            <Button
              variant="ghost"
              size="sm"
              icon={Settings}
              aria-label="Settings"
            />
            
            <Button
              variant="ghost"
              size="sm"
              icon={User}
              aria-label="Profile"
            />
          </div>
        </div>
      </div>
    </header>
  );
};