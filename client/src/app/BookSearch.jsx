/* eslint-disable no-unused-vars */
"use client";

import { useEffect, useEffectEvent, useRef, useState} from 'react'
import { Link } from 'react-router'
import Logger from '../classes/Logger.js';
import InputText from '../components/InputText.jsx';

export default function BookSearch() {
  
  const version = "BookSearch.jsx Jun 4 2026, 1.10";
  const logger = new Logger('BookSearch.jsx');
  logger.debug('BookSearch component rendered');

function checkTitle(value) {
  logger.debug(`checkTitle called with value: ${value}`); 
}
function checkAuthor(value) {
  logger.debug(`checkAuthor called with value: ${value}`); 
}
function checkEditor(value) {
  logger.debug(`checkEditor called with value: ${value}`); 
}

  return (
    <div className='page__container ml-5 font-bold '>
      <h2 className='my-4 font-light'>{version}</h2>
      <div className=' mt-2 text-center justify-center'>
        <InputText label="Titre" parentHandler={checkTitle} />
        <InputText label="Auteur" parentHandler={checkAuthor} />
        <InputText label="Éditeur" parentHandler={checkEditor} />
      </div>
      <div className="navtop">
        <Link to="/">Home</Link>
      </div>
    </div>
  )
}
