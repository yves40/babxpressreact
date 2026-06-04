/* eslint-disable no-unused-vars */
"use client";

import { useEffect, useEffectEvent, useRef, useState, useContext } from 'react'
import Logger from '../classes/Logger.js';
import InputText from '../components/InputText.jsx';

function BookSearch() {
  
  const version = "bookshome/BookSearch.jsx Jun 4 2026, 1.06";

  const [bookscount, setBookscount] = useState(0);
  const [booktitle, setBooktitle] = useState('');
  const [bookauthor, setBookauthor] = useState('');
  const [bookeditor, setBookeditor] = useState('');
  const [selectedbooks, setSelectedbooks] = useState([]);
  
  // const logger = new Logger();

  // -----------------------------------------------------------------------------
  // New method to handle state changes and avoid this message
  // Updating state synchronously during effects can cause cascading renders
  // UseEffectEvent appeared since React 18.3 to handle such cases and avoid the warning message
  // -----------------------------------------------------------------------------
  const booktitleEvent = useEffectEvent( () => {
  });
  const bookscountEvent = useEffectEvent( () => {
  });
  const bookauthorEvent = useEffectEvent( () => {
  });
  const bookeditorEvent = useEffectEvent( () => {
  });
  // -----------------------------------------------------------------------------
  // On page load
  // -----------------------------------------------------------------------------
  // useEffect( () => {
  // }, []);

  // -----------------------------------------------------------------------------
  // Track search criterias updates
  // -----------------------------------------------------------------------------
  useEffect( () => {
    booktitleEvent();
  }, [booktitle]);
  useEffect( () => {
    bookauthorEvent();
  }, [bookauthor]);
  useEffect( () => {
    bookeditorEvent();
  }, [bookeditor]);
  useEffect( () => {
    bookscountEvent();
  }, [bookscount]);

  return (
    <div>
      <h1 className='my-4 font-bold'>Mes livres</h1>
      <div className='text-left mx-8 mt-8 w-[80%]
                    md:w-[70%]
                    lg:w-[50%]'>
        <p>Bienvenue dans la section livres. Ici, vous pouvez interroger votre collection de livres.</p>
        <p>Faire des recherches par titre, auteur, éditeur</p>
        <p className=' my-3 underline'>Quelques statistiques sur vos livres dans la base :</p>
        <div>
          <ul className='' > 
            <InputText className=' mx-4' componentid="booktitle" label="Rechercher par le titre" parentHandler={setBooktitle} timeout={2000}> </InputText>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default BookSearch;
