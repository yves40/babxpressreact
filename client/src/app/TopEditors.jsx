/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useRef, useState, useEffect, } from 'react';
import { useNavigate } from "react-router-dom";
import properties from '../services/properties.js';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// -------------------------------------------------------------------------------------------------
function buildServerURL() {
  const winloc = document.location;
  if(winloc.port === properties.reactDEVport) {    // DEV or PROD ???
    return `${winloc.protocol}//${winloc.hostname}:${properties.nodeserverport}`;
  }
  return `${winloc.protocol}//${winloc.hostname}:${winloc.port}`;
}

// -------------------------------------------------------------------------------------------------
export default function TopEditors() {

  const [selectedEditors, setSelectedEditors] = useState([]);
  const results = useRef('results');                      // Search result message
  const datalist = useRef('datalist');                    // Show hide results
  const navigate = useNavigate();


  properties.setActivePage('topEditors');

    // -------------------------------------------------------------------------------------------------
  async function getTopEditors() {
        axios.get(`${buildServerURL()}/api/editors/top`, {
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
            setSelectedEditors(response.data.topeditors);
          }
      })
      .catch(error => {
        console.error("Axios error:", error);
      });    
  }
  // -------------------------------------------------------------------------------------------------
  useEffect(() => {
    getTopEditors();
  }, []);

  // -------------------------------------------------------------------------------------------------
  function handleEditorClick() {
    const editorName = event.target.getAttribute('data-editorname');
    console.log(`Editor name clicked: ${editorName}`);
    navigate(`/BooksSearch?editor=${encodeURIComponent(editorName)}`);
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
              {selectedEditors.length > 0 &&
                selectedEditors.map( (editor, index) => (
                  <div key={index} className='list__element'>
                    <span className='flex flex-row items-center'>{editor.ed_name}
                        <img className='svg-white32 ml-auto mr-4' src="svg/arrow-forward.svg" alt="" 
                              data-editorname={`${editor.ed_name}`}
                              onClick={handleEditorClick} />                      
                    </span>
                    <span className='ml-3'>{editor.bookcount} livres</span>
                  </div>
                ))}
          </div>
        </div>
    </div>
    <Footer></Footer>
    </>
  )
}
