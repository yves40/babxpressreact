/* eslint-disable no-unused-vars */
import { Provider } from 'react-redux';
import { store } from './store';
import { Routes, Route } from 'react-router'
import BookSearch from './app/BookSearch'
import Home from './app/Home'


export default function App() {
  return ( 
    <>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/BooksSearch" element={<BookSearch />} />
      </Routes>
    </Provider>
    </>
  )
}
