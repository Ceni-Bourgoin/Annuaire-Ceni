
import React, { useState, useMemo } from 'react';
import { Member, SearchCriteria } from '../types';
import MemberCard from './MemberCard';
import { PlusIcon } from './icons';

type DirectoryViewProps = {
  members: Member[];
  isAdmin: boolean;
  onEditMember: (member: Member) => void;
  onDeleteMember: (id: string) => void;
  onAddMember: () => void;
};

const DirectoryView: React.FC<DirectoryViewProps> = ({ members, isAdmin, onEditMember, onDeleteMember, onAddMember }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria[]>([SearchCriteria.CompanyName]);

  const handleCriteriaChange = (criteria: SearchCriteria) => {
    setSearchCriteria(prev => 
      prev.includes(criteria)
        ? prev.filter(c => c !== criteria)
        : [...prev, criteria]
    );
  };

  const filteredMembers = useMemo(() => {
    if (!searchTerm.trim()) {
      return members;
    }
    const lowercasedTerm = searchTerm.toLowerCase();
    return members.filter(member => {
        if (searchCriteria.length === 0) return true;
        return searchCriteria.some(criteria => 
            member[criteria].toLowerCase().includes(lowercasedTerm)
        );
    });
  }, [members, searchTerm, searchCriteria]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 sticky top-20 z-10">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
            <input
              type="text"
              placeholder="Saisir des mots-clés..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-club-primary"
            />
            {isAdmin && (
                <button
                    onClick={onAddMember}
                    className="mt-4 md:mt-0 w-full md:w-auto flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-club-primary hover:bg-blue-800"
                >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Ajouter Membre
                </button>
            )}
        </div>
        <div className="mt-4 flex flex-wrap gap-4">
          {(Object.keys(SearchCriteria) as Array<keyof typeof SearchCriteria>).map(key => (
            <label key={key} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={searchCriteria.includes(SearchCriteria[key])}
                onChange={() => handleCriteriaChange(SearchCriteria[key])}
                className="h-4 w-4 rounded border-gray-300 text-club-primary focus:ring-club-primary"
              />
              <span className="text-gray-700 text-sm">
                {key === 'CompanyName' ? 'Nom de l’entreprise' : key === 'Activity' ? 'Activité' : 'Nom du gérant'}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredMembers.map(member => (
          <MemberCard
            key={member.id}
            member={member}
            isAdmin={isAdmin}
            onEdit={onEditMember}
            onDelete={onDeleteMember}
          />
        ))}
      </div>
      {filteredMembers.length === 0 && (
          <div className="text-center col-span-full py-16">
              <p className="text-gray-500 text-lg">Aucun membre ne correspond à votre recherche.</p>
          </div>
      )}
    </div>
  );
};

export default DirectoryView;
   