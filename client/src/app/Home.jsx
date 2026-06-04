/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router'

function Home() {
  return (
      <div className=' ml-5 font-bold '>
        <h1 className=' text-4xl text-center justify-center mb-4'>My Book App</h1>
        <ul className='flex gap-4 flex-col'>
          <Link to="/BooksSearch">Search Books</Link>
        </ul>
      </div>
  )
}

export default Home