/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Footer from '../components/Footer.jsx';

function Home() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className='nav-links'>
        <ul>
          <li>
            <Link to="/BooksSearch">Search Books</Link>
          </li>
        </ul>
      </div>
      <div className='page__container ml-5 font-bold '>
        <p className='my-4 mx-4 font-light'>Welcome to Babxpress, your gateway to a world of books! 
            Explore our extensive collection, discover new titles, and find your next great read. Whether you're looking for fiction, non-fiction, or academic resources, 
            Babxpress has something for every book lover. 
            Start your literary journey with us today!</p>
      </div>
      <Footer />
    </>
  )
}

export default Home