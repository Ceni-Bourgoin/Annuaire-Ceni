
import React from 'react';
import { CeniLogo } from './icons';

type HeaderProps = {
  activeTab: 'directory' | 'album';
  setActiveTab: (tab: 'directory' | 'album') => void;
  isAdmin: boolean;
  onAdminClick: () => void;
};

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, isAdmin, onAdminClick }) => {
  const tabClasses = (tabName: 'directory' | 'album') =>
    `px-4 py-2 text-sm md:text-base font-semibold rounded-md transition-colors duration-300 ${
      activeTab === tabName
        ? 'bg-club-primary text-white'
        : 'text-gray-600 hover:bg-red-100'
    }`;

  return (
    <header className="bg-white shadow-md sticky top-0 z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-4">
            <CeniLogo className="h-16 w-auto" />
            <h1 className="text-xl md:text-2xl font-bold text-club-secondary hidden sm:block">
              Club Entreprises Nord Isère
            </h1>
          </div>
          <nav className="flex items-center space-x-2 md:space-x-4">
            <button onClick={() => setActiveTab('directory')} className={tabClasses('directory')}>
              Annuaire
            </button>
            <button onClick={() => setActiveTab('album')} className={tabClasses('album')}>
              Album
            </button>
            <button
              onClick={onAdminClick}
              className="px-4 py-2 text-sm md:text-base font-semibold rounded-md transition-colors duration-300 bg-club-secondary text-white hover:bg-gray-700"
            >
              {isAdmin ? 'Déconnexion' : 'Admin'}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
