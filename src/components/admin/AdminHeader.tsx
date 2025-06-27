
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { Link } from 'react-router-dom';
import { Settings, User } from 'lucide-react';

export const AdminHeader = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-2xl font-bold text-primary">
              Ridwan Brand
            </Link>
            <span className="text-sm text-slate-500 dark:text-slate-400">Admin Panel</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <Settings className="h-4 w-4" />
            </Button>
            
            <Button variant="outline" size="sm">
              <User className="h-4 w-4" />
              Admin
            </Button>
            
            <Link to="/">
              <Button variant="outline" size="sm">
                Back to Site
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
