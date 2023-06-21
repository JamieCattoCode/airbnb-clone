/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Navigate, useParams } from 'react-router-dom';
import Perks from './Perks';
import PhotoUploader from './PhotoUploader';

function AddPlaceForm() {
  const { id } = useParams();
  console.log(id);

  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return null;
    }
    axios.get(`/places/${id}`).then(({ data }) => {
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
    });
  }, [id]);

  function inputHeader(text) {
    return (
      <h2 className="text-xl mt-4">{text}</h2>
    );
  }

  async function savePlace(event) {
    event.preventDefault();
    const formData = {
      title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests,
    };
    if (id) {
      await axios.put(`/places/${id}`, formData);
    } else {
      await axios.post('/places', formData);
    }
    setRedirect(true);
  }

  function cancel() {
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to="/profile/places" />;
  }

  return (
    <div>
      <form onSubmit={savePlace}>
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
        <PhotoUploader addedPhotos={addedPhotos} setAddedPhotos={setAddedPhotos} />
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
        <button type="submit" className="primary my-4">Save</button>
      </form>
      <button type="button" className="primary" onClick={cancel}>Cancel</button>
    </div>
  );
}

export default AddPlaceForm;
