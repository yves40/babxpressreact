/* eslint-disable no-unused-vars */
"use client";

import { useEffect, useEffectEvent, useRef, useState} from 'react'
import { Link } from 'react-router'
import { setMenuState } from '../redux/menustate.js';
import InputText from '../components/InputText.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import properties from '../services/properties.js';

export default function BookSearch() {
  
  const version = "BookSearch.jsx Jun 22 2026, 1.12";
  properties.setActivePage('booksearch');

  function checkTitle(value) {
  }
  function checkAuthor(value) {
  }
  function checkEditor(value) {
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
