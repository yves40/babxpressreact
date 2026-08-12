import axios from 'axios';
import { useRef, useState, useEffect } from 'react';
import properties from '../services/properties.js';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';


function buildURLroot() {
  const winloc = document.location;
  if(winloc.port === properties.reactDEVport) {    // DEV on asusp7 ???
    return `${winloc.protocol}//${winloc.hostname}:${properties.nodeserverport}`;
  }
  return `${winloc.protocol}//${winloc.hostname}:${winloc.port}`;
}

export default function TopAuthors() {
  // eslint-disable-next-line no-unused-vars
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const results = useRef('results');                      // Search result message
  const datalist = useRef('datalist');                    // Show hide results

  properties.setActivePage('topAuthors');


  // -------------------------------------------------------------------------------------------------
  async function getTopAuthors() {
        axios.get(`${buildURLroot()}/api/authors/top`, {
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
