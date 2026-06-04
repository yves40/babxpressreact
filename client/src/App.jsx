/* eslint-disable no-unused-vars */

import { useRef } from 'react'
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router'
import { Link } from 'react-router'
import BookSearch from './app/BookSearch'
import Home from './app/Home'


export default function App() {
  return ( 
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/BooksSearch" element={<BookSearch />} />
      </Routes>
    </>
  )
}
