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

  properties.setActivePage('booksearch');

  function buildURLroot() {
    const winloc = document.location;
    if(winloc.port === properties.reactDEVport) {    // DEV on asusp7 ???
      return `${winloc.protocol}//${winloc.hostname}:${properties.nodeserverport}`;
    }
    return `${winloc.protocol}//${winloc.hostname}:${winloc.port}`;
  }

  async function  searchBooks() {
    if(titlesearch.length === 0 && authorsearch.length === 0 && editorsearch.length === 0)
      return;
    console.log(`********** Searching now with criterias ${titlesearch}/${authorsearch}/${editorsearch}`);
    console.log(`********** ${buildURLroot()}/api/books/search`);
    let params = { title: titlesearch, author: authorsearch, editor: editorsearch};
    // try {
    //   const response = await axios.post(`${buildURLroot()}/api/books/search`, {
    //       headers: {'Content-Type': 'application/json'},
    //       params: JSON.stringify(params),
    //     })
    //     console.log(response.data);  
    // }
    // catch(error) {
    //   console.log(error);
    // }
    axios.post(`${buildURLroot()}/api/books/search`, {
          headers: {'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          params: JSON.stringify(params),
        })
      .then(response => {
          console.log(response.data);
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
      <Footer />
    </>
  )
}
