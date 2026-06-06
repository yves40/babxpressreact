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
  setMenuState(false);
  return (
    <>
      <header>
          <Navbar/>
      </header>
      <div className='page__container'>
        <p className='my-4 mx-4 font-light'>Welcome to Babxpress, your gateway to a world of books! 
            Explore our extensive collection, discover new titles, and find your next great read. Whether you're looking for fiction, non-fiction, or academic resources, 
            Babxpress has something for every book lover. 
            Start your literary journey with us today!</p>
      </div>
      <Footer parentHandler={menufeedback} />
    </>
  )
}

export default Home