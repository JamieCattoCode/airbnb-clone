/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import axios from 'axios';

function PhotoUploader() {
  const [photoLink, setPhotoLink] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);

  async function addPhotoByLink() {
    const { data: fileName } = await axios.post('/upload-by-link', { link: photoLink });
    setAddedPhotos((prev) => [...prev, fileName]);
    setPhotoLink('');
  }

  async function uploadPhoto(event) {
    const { files } = event.target;
    const data = new FormData();
    for (let i = 0; i < files.length; i += 1) {
      data.append('photos', files[i]);
    }
    const { data: responseData } = await axios.post('/upload', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    // Spread the response data in case they upload more than one at once
    setAddedPhotos((prev) => [...prev, ...responseData]);
  }
  return (
    <>
      <div className="flex gap-2">
        <input
          type="text"
          value={photoLink}
          onChange={(e) => setPhotoLink(e.target.value)}
          placeholder="Add using a link..."
        />
        <button type="button" onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">
          Add&nbsp;photo&nbsp;from&nbsp;link
        </button>
      </div>
      <div className="mt-2 grid gap-2 grid-cols-3 lg:grid-cols-6 md:grid-cols-4">
        {addedPhotos.length > 0 && addedPhotos.map((link) => (
          <div className="h-32 flex" key={link}>
            <img className="rounded-2xl w-full object-cover" src={`http://localhost:4000/uploads/${link}`} alt="destination" />
          </div>
        ))}
        <label className="h-32 cursor-pointer border bg-transparent rounded-2xl p-8 text-2xl text-gray-600 flex justify-center items-center gap-1">
          <input type="file" className="hidden" onChange={uploadPhoto} />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
          Upload
        </label>
      </div>
    </>
  );
}

export default PhotoUploader;
