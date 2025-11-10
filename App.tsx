
import React, { useState } from 'react';
import { Member, AlbumPhoto } from './types';
import Header from './components/Header';
import DirectoryView from './components/DirectoryView';
import AlbumView from './components/AlbumView';
import MemberFormModal from './components/MemberFormModal';
import AdminLoginModal from './components/AdminLoginModal';
import { initialMembers } from './data/initialData';

const ADMIN_PASSWORD = 'admin'; // For demonstration purposes

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'directory' | 'album'>('directory');
  const [isAdmin, setIsAdmin] = useState(false);
  
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [albumPhotos, setAlbumPhotos] = useState<AlbumPhoto[]>([]);
  
  const [isMemberFormOpen, setIsMemberFormOpen] = useState(false);
  const [memberToEdit, setMemberToEdit] = useState<Member | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLogin = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAdmin(false);
  };
  
  const handleAdminClick = () => {
    if (isAdmin) {
      handleLogout();
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleOpenAddMember = () => {
    setMemberToEdit(null);
    setIsMemberFormOpen(true);
  };

  const handleOpenEditMember = (member: Member) => {
    setMemberToEdit(member);
    setIsMemberFormOpen(true);
  };

  const handleDeleteMember = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce membre ?')) {
      setMembers(prev => prev.filter(m => m.id !== id));
    }
  };

  const handleSaveMember = (member: Member) => {
    if (memberToEdit) {
      setMembers(prev => prev.map(m => (m.id === member.id ? member : m)));
    } else {
      setMembers(prev => [...prev, member]);
    }
  };

  const handleAddPhoto = (photoData: { url: string; caption: string }) => {
    const newPhoto: AlbumPhoto = {
      id: new Date().toISOString(),
      ...photoData,
    };
    setAlbumPhotos(prev => [newPhoto, ...prev]);
  };

  return (
    <div className="min-h-screen bg-club-light">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isAdmin={isAdmin}
        onAdminClick={handleAdminClick}
      />
      <main>
        {activeTab === 'directory' && (
          <DirectoryView
            members={members}
            isAdmin={isAdmin}
            onAddMember={handleOpenAddMember}
            onEditMember={handleOpenEditMember}
            onDeleteMember={handleDeleteMember}
          />
        )}
        {activeTab === 'album' && (
          <AlbumView photos={albumPhotos} onAddPhoto={handleAddPhoto} />
        )}
      </main>

      <MemberFormModal
        isOpen={isMemberFormOpen}
        onClose={() => setIsMemberFormOpen(false)}
        onSave={handleSaveMember}
        memberToEdit={memberToEdit}
      />
      
      <AdminLoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default App;
   