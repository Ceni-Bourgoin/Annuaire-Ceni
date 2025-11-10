
import React from 'react';
import { AlbumPhoto } from '../types';
import { PlusIcon } from './icons';

type AlbumViewProps = {
  photos: AlbumPhoto[];
  onAddPhoto: (photoData: { url: string; caption: string }) => void;
};

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

const AlbumView: React.FC<AlbumViewProps> = ({ photos, onAddPhoto }) => {
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = await fileToBase64(file);
      const caption = prompt('Ajoutez une légende pour cette photo :', file.name) || file.name;
      onAddPhoto({ url, caption });
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold text-club-primary mb-4">Album Photo des Événements</h2>
        <p className="text-gray-600 mb-4">Partagez vos moments préférés des rencontres du club. Cliquez sur le bouton pour ajouter une photo.</p>
        <label
          htmlFor="photo-upload"
          className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-club-primary hover:bg-blue-800"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Ajouter une Photo
        </label>
        <input
          id="photo-upload"
          name="photo-upload"
          type="file"
          className="sr-only"
          accept="image/*"
          onChange={handlePhotoUpload}
        />
      </div>

      {photos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map(photo => (
            <div key={photo.id} className="group relative overflow-hidden rounded-lg shadow-lg">
              <img src={photo.url} alt={photo.caption} className="h-64 w-full object-cover transform group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white text-sm">{photo.caption}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">L'album est vide. Soyez le premier à ajouter une photo !</p>
        </div>
      )}
    </div>
  );
};

export default AlbumView;
   