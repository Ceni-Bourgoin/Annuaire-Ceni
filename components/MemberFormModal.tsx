
import React, { useState, useEffect } from 'react';
import { Member } from '../types';
import { CloseIcon } from './icons';

type MemberFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (member: Member) => void;
  memberToEdit: Member | null;
};

const initialFormState: Omit<Member, 'id'> = {
  companyName: '',
  companyLogo: 'https://picsum.photos/seed/placeholder/200',
  activity: '',
  contactName: '',
  phone: '',
  email: '',
  website: '',
};

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

const MemberFormModal: React.FC<MemberFormModalProps> = ({ isOpen, onClose, onSave, memberToEdit }) => {
  const [formData, setFormData] = useState<Omit<Member, 'id'>>(initialFormState);
  const [logoPreview, setLogoPreview] = useState<string>(initialFormState.companyLogo);

  useEffect(() => {
    if (memberToEdit) {
      setFormData(memberToEdit);
      setLogoPreview(memberToEdit.companyLogo);
    } else {
      setFormData(initialFormState);
      setLogoPreview(initialFormState.companyLogo);
    }
  }, [memberToEdit, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const base64Logo = await fileToBase64(file);
      setFormData(prev => ({ ...prev, companyLogo: base64Logo }));
      setLogoPreview(base64Logo);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const memberData: Member = {
      ...formData,
      id: memberToEdit ? memberToEdit.id : new Date().toISOString(),
    };
    onSave(memberData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-club-primary">{memberToEdit ? 'Modifier le membre' : 'Ajouter un membre'}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <CloseIcon className="h-6 w-6" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center space-x-4">
              <img src={logoPreview} alt="Aperçu du logo" className="h-20 w-20 rounded-full object-cover border-2 border-club-secondary" />
              <div>
                <label htmlFor="companyLogo" className="block text-sm font-medium text-gray-700">Logo de l'entreprise</label>
                <input type="file" name="companyLogo" id="companyLogo" onChange={handleLogoChange} accept="image/*" className="mt-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
              </div>
            </div>
            {Object.keys(initialFormState).filter(k => k !== 'companyLogo').map(key => (
              <div key={key}>
                <label htmlFor={key} className="block text-sm font-medium text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                <input
                  type="text"
                  name={key}
                  id={key}
                  value={formData[key as keyof typeof formData]}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-club-primary focus:border-club-primary sm:text-sm"
                />
              </div>
            ))}
            <div className="flex justify-end pt-4">
              <button type="button" onClick={onClose} className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Annuler</button>
              <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-club-primary hover:bg-blue-800">Sauvegarder</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MemberFormModal;
   