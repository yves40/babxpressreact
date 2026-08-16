import axios from 'axios';
import { useRef, useState, useEffect, } from 'react';
import { useNavigate } from "react-router-dom";
import properties from '../services/properties.js';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

// -------------------------------------------------------------------------------------------------
function buildServerURL() {
  const winloc = document.location;
  if(winloc.port === properties.reactDEVport) {    // DEV or PROD ???
    return `${winloc.protocol}//${winloc.hostname}:${properties.nodeserverport}`;
  }
  return `${winloc.protocol}//${winloc.hostname}:${winloc.port}`;
}
  // -------------------------------------------------------------------------------------------------
// eslint-disable-next-line no-unused-vars
function buildClientURL() {
  const winloc = document.location;
  return `${winloc.protocol}//${winloc.hostname}:${winloc.port}`;
}

  // -------------------------------------------------------------------------------------------------
export default function TopAuthors() {

  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const results = useRef('results');                      // Search result message
  const datalist = useRef('datalist');                    // Show hide results
  const navigate = useNavigate();

  properties.setActivePage('topAuthors');

  // -------------------------------------------------------------------------------------------------
  async function getTopAuthors() {
        axios.get(`${buildServerURL()}/api/authors/top`, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
      .then(response => {
          if(response.data.status === 'error') {
            results.current.innerText = `Erreur : ${response.data.message}`;
            datalist.current.style.display = 'none';
          }
          else {
            console.log(response.data);
            results.current.innerText = `Les ${response.data.topauthors.length} auteurs préférés`;
            setSelectedAuthors(response.data.topauthors);
          }
      })
      .catch(error => {
        console.error("Axios error:", error);
      });    
  }
  // -------------------------------------------------------------------------------------------------
  useEffect(() => {
    getTopAuthors();
  }, []);
  // -------------------------------------------------------------------------------------------------
  function handleAuthorClick() {
    const authorName = event.target.getAttribute('data-authorname');
    console.log(`Author name clicked: ${authorName}`);
    navigate(`/BooksSearch?author=${encodeURIComponent(authorName)}`);
  }

  return (
    <>
    <header>
      <Navbar></Navbar>
    </header>
    <div className='page__container ml-5 text-white'>
        <div className='list__container'>
          <div className="list__header">
            <span ref={results}>Résultats</span>
          </div>
          <div className="list__data" ref={datalist}>
              {selectedAuthors.length > 0 &&
                selectedAuthors.map( (author, index) => (
                  <div key={index} className='list__element'>
                    <span className='flex flex-row items-center'>{author.prenom}  {author.nom}
                        <img className='svg-white32 ml-auto mr-4' src="svg/arrow-forward.svg" alt="" 
                              data-authorname={`${author.nom}`}
                              onClick={handleAuthorClick} />                      
                    </span>
                    <span className='ml-3'>{author.bookcount} livres</span>
                  </div>
                ))}
          </div>
        </div>
    </div>
    <Footer></Footer>
    </>
  )
}
