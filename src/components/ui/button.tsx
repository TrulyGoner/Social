import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  loading?: boolean;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-800'
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : Icon && !children ? (
        <Icon className="w-4 h-4" />
      ) : Icon ? (
        <Icon className="w-4 h-4 mr-2" />
      ) : null}
      {children}
    </button>
  );
};
