
import React from 'react';
import { Member } from '../types';
import { AddContactIcon, DeleteIcon, EditIcon, ShareIcon } from './icons';

type MemberCardProps = {
  member: Member;
  isAdmin: boolean;
  onEdit: (member: Member) => void;
  onDelete: (id: string) => void;
};

const MemberCard: React.FC<MemberCardProps> = ({ member, isAdmin, onEdit, onDelete }) => {
  const createVCard = () => {
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${member.contactName}
ORG:${member.companyName}
TITLE:${member.activity}
TEL;TYPE=WORK,VOICE:${member.phone}
EMAIL:${member.email}
URL:${member.website}
END:VCARD`;
    const blob = new Blob([vCard], { type: 'text/vcard;charset=utf-8' });
    return URL.createObjectURL(blob);
  };

  const handleShare = async () => {
    const shareData = {
      title: `${member.companyName} - Contact`,
      text: `Voici le contact de ${member.contactName} de l'entreprise ${member.companyName}:\nTel: ${member.phone}\nEmail: ${member.email}\nSite: ${member.website}`,
      url: member.website,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        alert('La fonction de partage n\'est pas supportée sur ce navigateur. Vous pouvez copier les informations manuellement.');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 relative">
      {isAdmin && (
        <div className="absolute top-2 right-2 flex space-x-2">
          <button onClick={() => onEdit(member)} className="p-2 bg-blue-100 rounded-full text-blue-600 hover:bg-blue-200">
            <EditIcon className="h-5 w-5" />
          </button>
          <button onClick={() => onDelete(member.id)} className="p-2 bg-red-100 rounded-full text-red-600 hover:bg-red-200">
            <DeleteIcon className="h-5 w-5" />
          </button>
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <img src={member.companyLogo} alt={`Logo de ${member.companyName}`} className="h-16 w-16 rounded-full object-cover border-2 border-club-secondary" />
          <div>
            <h2 className="text-xl font-bold text-club-primary">{member.companyName}</h2>
            <p className="text-sm text-gray-600">{member.activity}</p>
          </div>
        </div>
        <div className="space-y-3 text-gray-700">
          <p><strong>Contact:</strong> {member.contactName}</p>
          <p><strong>Téléphone:</strong> <a href={`tel:${member.phone}`} className="text-blue-600 hover:underline">{member.phone}</a></p>
          <p><strong>Email:</strong> <a href={`mailto:${member.email}`} className="text-blue-600 hover:underline">{member.email}</a></p>
          <p><strong>Site:</strong> <a href={member.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{member.website}</a></p>
        </div>
      </div>
      <div className="px-6 py-3 bg-gray-50 flex justify-end space-x-2">
        <a 
          href={createVCard()} 
          download={`${member.contactName}.vcf`}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <AddContactIcon className="h-4 w-4 mr-1" />
          Ajouter
        </a>
        <button
          onClick={handleShare}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <ShareIcon className="h-4 w-4 mr-1" />
          Partager
        </button>
      </div>
    </div>
  );
};

export default MemberCard;
   