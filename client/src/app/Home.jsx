/* eslint-disable no-unused-vars */
import {useRef} from 'react'
import { Link } from 'react-router'
import { setMenuState } from '../redux/menustate.js';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer.jsx';
import properties from '../services/properties.js';

function Home() {
  const version = "Home.jsx Jun 5 2026, 1.03";
  const module = "Home.jsx # ";
  const thenav = useRef(null);

  function menufeedback(status){
    console.log(`${module} Menu status in Home.jsx is : ${status}`);
  };

  properties.setActivePage('home');

  return (
    <>
      <header>
          <Navbar/>
      </header>
      <div className='page__container '>
        <p className='text__container'>Quelques infos. <br /><br />
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
          Attention sur un téléphone, le résultat peut être caché par le clavier.
          Evidemment, tu peux aussi utiliser l'appli sur un PC ou sur une tablette.
        </p>
      </div>
      <Footer parentHandler={menufeedback} />
    </>
  )
}

export default Home