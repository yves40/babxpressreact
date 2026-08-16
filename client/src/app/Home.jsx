/* eslint-disable no-unused-vars */
import axios from 'axios';
import {useRef, useEffect, useState } from 'react'
import { Link } from 'react-router'
import { setMenuState } from '../redux/menustate.js';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer.jsx';
import properties from '../services/properties.js';

function Home() {
  const version = "Home.jsx Aug 16 2026, 1.05";
  const module = "Home.jsx # ";
  const thenav = useRef(null);
  const [bookscount, setBooksCount] = useState(0);
  const [authorscount, setAuthorsCount] = useState(0);
  const [editorscount, setEditorsCount] = useState(0);
  const [feedbackmessage, setFeedbackMessage] = useState('');

  function menufeedback(status){
    console.log(`${module} Menu status in Home.jsx is : ${status}`);
  };

  // -------------------------------------------------------------------------------------------------
  function buildServerURL() {
    const winloc = document.location;
    if(winloc.port === properties.reactDEVport) {    // DEV on asusp7 ???
      return `${winloc.protocol}//${winloc.hostname}:${properties.nodeserverport}`;
    }
    return `${winloc.protocol}//${winloc.hostname}:${winloc.port}`;
  }
  //----------------------------------------------------------------
  async function fetchBooksCounts() {
    axios.get(`${buildServerURL()}/api/books/count`, {
          headers: {
            'Content-Type': 'application/json',
          }, 
        })
      .then(response => {
          if(response.data.status === 'error') { setBooksCount(0);}
          else { setBooksCount(response.data.count);}
      })
      .catch(error => {
        console.error("Axios error:", error);
      });    
  }
  //----------------------------------------------------------------
  async function fetchAuthorsCounts() {
    axios.get(`${buildServerURL()}/api/authors/count`, {
          headers: {
            'Content-Type': 'application/json',
          }, 
        })
      .then(response => {
          if(response.data.status === 'error') { 
            setAuthorsCount(0);
            setFeedbackMessage(`Erreur : ${response.data.message}`);
          }
          else { 
            setAuthorsCount(response.data.count);
            setFeedbackMessage("Statistiques collectées");
          }
      })
      .catch(error => {
        console.error("Axios error:", error);
      });    
  }
  //----------------------------------------------------------------
  async function fetchEditorsCounts() {
    axios.get(`${buildServerURL()}/api/editors/count`, {
          headers: {
            'Content-Type': 'application/json',
          }, 
        })
      .then(response => {
          if(response.data.status === 'error') { setEditorsCount(0);}
          else { setEditorsCount(response.data.count);}
      })
      .catch(error => {
        console.error("Axios error:", error);
      });    
  }
  //----------------------------------------------------------------
  useEffect(() => {
    fetchBooksCounts();
    fetchAuthorsCounts();
    fetchEditorsCounts();
  }, []);

  //----------------------------------------------------------------
  properties.setActivePage('home');

  return (
    <>
      <header>
          <Navbar/>
      </header>
      <div className='page__container '>
        <p className='text__container'>Quelques infos. <br /><br />
          <span className=' text-amber-300'>{feedbackmessage}</span><br />
          <span>Tu as lu : {bookscount} livres</span><br />
          <span >Ecrits par : {authorscount} auteurs</span><br />
          <span >Qui travallaient pour {editorscount} éditeurs </span><br /><br />
          Les recherches se font par titre, auteur, ou éditeur. Ces critères pouvant être combinés par 2. 
          <span className=' font-bold'> Il n'y a donc pas de recherche sur 3 critères en même temps. </span>
          La saisie d'un seul mot ou même d'une partie de ce mot dans l'un des critères déclenche une 
          recherche immédiate sur ce dernier.
          <br /><br />
          La recherche d'auteur <span className=' font-bold'>ne s'effectue que sur le nom de famille de l'auteur</span> . La saisie d'Olivier ADAM ne déclenche une recherche que sur ADAM.
          Une recherche par titre sélectionne simplement tous les titres contenant la chaine saisie.
          Une recherche par éditeur sélectionne simplement tous les éditeurs dont la raison sociale 
          contient la chaine saisie.
          <br /><br />
          La recherche se déclenche automatiquement lorsque l'un des critères est modifié. 
          Evidemment, tu peux aussi utiliser l'appli sur un PC ou sur une tablette.
        </p>
      </div>
      <Footer parentHandler={menufeedback} />
    </>
  )
}

export default Home