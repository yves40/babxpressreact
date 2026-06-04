/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router'

function Home() {
  return (
      <div className='navtop'>
        <ul className='flex gap-4 flex-col'>
          <Link to="/BooksSearch">Search Books</Link>
        </ul>
      </div>
  )
}

export default Home