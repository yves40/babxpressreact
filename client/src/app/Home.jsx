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
      <div className='page__container'>
        <p className='my-4 mx-4 font-light'>Baboule, je sais que tu attendais avec impatience
          cette application. J'espère qu'elle te sera utile la prochaine fois que tu iras acheter un livre.
          Les recherches se font par titre, auteur, ou éditeur. Ces critères pouvant être combinés par 2. 
          <span className=' underline font-bold'>Pas de recherche sur les 3 critères en même temps.</span>
          La saisie d'un seul mot ou même d'une partie de ce mot dans l'un des critères déclenche une 
          recherche immédiate sur ce dernier.
        </p>
        <ul className=' text-left my-4 mx-4 list-disc text-blue-700'>
          <li>
            Pour chercher les livres écrits par Olivier ADAM, tu peux saisir ADAM, AD, ADA, etc.
            ATTENTION !!!! La recherche d'auteur <span className=' underline font-bold'>ne s'effectue que sur le nom de famille de l'auteur</span> . Si tu 
            écris Olivier ADAM il ne cherchera que ADAM.
          </li>
          <li>
            Une recherche par titre sélectionne simplement tous les titres contenant la chaine saisie.
          </li>
          <li>
            Une recherche par éditeur sélectionne simplement tous les éditeurs dont la raison sociale 
            contient la chaine saisie.
          </li>
        </ul>
        <p>
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