/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
"use client";

import { useEffect, useEffectEvent, useRef, useState} from 'react'
import axios from "axios";
import { Link } from 'react-router'
import { setMenuState } from '../redux/menustate.js';
import InputText from '../components/InputText.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import properties from '../services/properties.js';
import techinfo from '../services/techinfo.js';

export default function BookSearch() {
  
  const version = "BookSearch.jsx Jun 23 2026, 1.15 ";
  const [titlesearch, setTitlesearch] = useState('');
  const [authorsearch, setAuthorsearch] = useState('');
  const [editorsearch, setEditorsearch] = useState('');
  const [selectedbooks, setSelectedbooks] = useState([]);
  const results = useRef('results');

  properties.setActivePage('booksearch');

  function buildURLroot() {
    const winloc = document.location;
    if(winloc.port === properties.reactDEVport) {    // DEV on asusp7 ???
      return `${winloc.protocol}//${winloc.hostname}:${properties.nodeserverport}`;
    }
    return `${winloc.protocol}//${winloc.hostname}:${winloc.port}`;
  }

  async function  searchBooks() {
    // if(titlesearch.length === 0 && authorsearch.length === 0 && editorsearch.length === 0)
    //   return;
    console.log(`********** Searching now with criterias ${titlesearch}/${authorsearch}/${editorsearch}`);
    console.log(`********** ${buildURLroot()}/api/books/search`);
    results.current.innerText = `Recherche...`;

    axios.post(`${buildURLroot()}/api/books/search`, {
          headers: {
            'Content-Type': 'application/json',
          },
          params: { title: titlesearch, author: authorsearch, editor: editorsearch},
        })
      .then(response => {
          console.log(response.data);
          setSelectedbooks(response.data.selectedbooks);
          if(response.data.selectedbooks.length === 0) {
            results.current.innerText = `Pas de livre sélectionné.`;
          }
          else {
            results.current.innerText = `Résultats - ${response.data.selectedbooks.length} livre(s) trouvé(s)`;
          }
      })
      .catch(error => {
        console.error("Axios error:", error);
      });    
  }

  useEffect(() => {
    searchBooks();
  }, [titlesearch, authorsearch, editorsearch])

  function checkTitle(value) {
    setTitlesearch(value);
  }
  function checkAuthor(value) {
    setAuthorsearch(value);
  }
  function checkEditor(value) {
    setEditorsearch(value);
  }


  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className='page__container ml-5 font-bold '>
        <div className=' mt-2 text-center justify-center'>
          <InputText label="Titre" parentHandler={checkTitle} />
          <InputText label="Auteur" parentHandler={checkAuthor} />
          <InputText label="Éditeur" parentHandler={checkEditor} />
        </div>
      </div>
      <div className=' border-t-2 mt-6 pt-4 mx-4 text-gray-500'>
        <p className=' border-b-2 text-gray-500 pb-6 w-full' ref={results}>Résultats</p>
        <div className=' mb-24'>
          {selectedbooks.length > 0 &&
            <ul className=' mt-4 mx-4'>
              {selectedbooks.map( (book, index) => (
                <li key={index} className=' mb-2'>
                  <span className=' font-bold'>{book.bk_title}</span> - <span>{book.auth_fname} {book.auth_lname}</span> - <span><i>{book.ed_name}</i></span>
                </li> 
              ))}
            </ul>
          }
        </div>
      </div>
      <Footer />
    </>
  )
}
