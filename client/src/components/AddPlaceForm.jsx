import React, { useState } from 'react';
import Perks from './Perks';

function AddPlaceForm() {
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [photoLink, setPhotoLink] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);

  function inputHeader(text) {
    return (
      <h2 className="text-xl mt-4">{text}</h2>
    );
  }

  function addPhotoByLink() {
    return '';
  }

  return (
    <div>
      <form>
        {inputHeader('Title')}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title e.g. 'Beautiful apartment on the beach'"
        />
        {inputHeader('Address')}
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />
        {inputHeader('Photos')}
        <div className="flex gap-2">
          <input
            type="text"
            value={photoLink}
            onChange={(e) => setPhotoLink(e.target.value)}
            placeholder="Add using a link..."
          />
          <button type="button" className="bg-gray-200 px-4 rounded-2xl">
            Add&nbsp;photo&nbsp;from&nbsp;link
          </button>
        </div>
        <div className="mt-2 grid grid-cols-3 lg:grid-cols-6 md:grid-cols-4">
          <button type="button" className="border bg-transparent rounded-2xl p-8 text-2xl text-gray-600 flex justify-center items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            Upload
          </button>
        </div>
        {inputHeader('Description')}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="A full description of your place. Be detailed!"
        />
        {inputHeader('Perks')}
        <Perks selected={perks} onChange={setPerks} />
        {inputHeader('Extra Info')}
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
          placeholder="House rules, information about the area, etc."
        />
        {inputHeader('Check In and Check Out Times')}
        <div className="grid sm:grid-cols-3 gap-2">
          <div>
            <h3 className="mt-2 -mb-1">Check In Time</h3>
            <input type="text" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} placeholder="14:00" />
          </div>

          <div>
            <h3 className="mt-2 -mb-1">Check Out Time</h3>
            <input type="text" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} placeholder="12:00" />
          </div>

          <div>
            <h3 className="mt-2 -mb-1">Max. Number of Guests</h3>
            <input type="number" value={maxGuests} onChange={(e) => setMaxGuests(e.target.value)} placeholder="1" />
          </div>
        </div>
        <button type="submit" className="primary my-4">Add Place</button>
      </form>
    </div>
  );
}

export default AddPlaceForm;
