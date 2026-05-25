/* eslint-disable no-unused-vars */

import { useRef } from 'react'
import { useState, useEffect } from 'react'


function App() {
  const [apiData, setApiData] = useState([])
  const [booksCount, setBooksCount] = useState(0)
  const [serverEnvVariables, setserverEnvVariables] = useState({})
  const [fakedata, setFakedata] = useState(
    [
      { name: 'Ken Tyrell', age: 30, email: 'ken.tyrell@example.com' },
      { name: 'Jackie Stewart', age: 30, email: 'jackie.stewart@example.com' },
      { name: 'Carlos Reuteman', age: 30, email: 'carlos.reuteman@example.com' },
      { name: 'Mario Andretti', age: 30, email: 'mario.andretti@example.com' },
    ]
  )  
  const marteau = useRef(null);
  const serverEnv = useRef(null);
// -----------------------------------
  
  const fetchApi = async () => {
    marteau.current.style.display = 'none';
    const protocol = location.protocol;
    const host = location.hostname;
    const port = location.port;
    const url = `${protocol}//${host}:${port}/api/fake`; 
    console.log(url);
    
    try {
      const response = await fetch(url)
      const data = await response.json()
      console.log('Data from server:', data)
      setApiData(data.fruits)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
// -----------------------------------

  const getServerEnv = async () => {
    const protocol = location.protocol; 
    const host = location.hostname;
    const port = location.port;
    const url = `${protocol}//${host}:${port}/api/tech/env`; 
    try {
      console.log(url);
      
      const response = await fetch(url)
      const data = await response.json()
      console.log(data);
      setserverEnvVariables(data.serverenv);
    } catch (error) {
      console.error('Error fetching environment variables:', error)
    }
  }
// -----------------------------------

  const fetchBooksCount = async () => {

    getServerEnv();

    const protocol = location.protocol;
    const host = location.hostname;
    const port = location.port;
    const url = `${protocol}//${host}:${port}/api/books/count`; 
    console.log(`Fetching books count from ${url}`);
    try {
      const response = await fetch(url)
      const data = await response.json()
      console.log('Books count from server:', data.count)
      setBooksCount(data.count)
    } catch (error) {
      console.error('Error fetching books count:', error)
    }
  }

  useEffect(() => {     
  }, [])  // initial render

  return (
      <div className='min-h-screen w-full bg-gray-100 flex items-center justify-center flex-col gap-10'>
        <h2 className=' text-2xl font-bold italic text-green-800 my-4'>F1 from static Data</h2>
        <ul className='text-gray-600 text-2xl font-semibold'>
          {fakedata.map((person, index) => (
            <li key={index} className='hover:text-blue-300'>
              {person.email} - {person.name}
            </li>
          ))}
        </ul>

        <button onClick={fetchApi} className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
          Fetch API Data
        </button>
        <button onClick={fetchBooksCount} className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
          How many books
        </button>
        <p className='text-xl font-bold text-gray-800'>Books Count: {booksCount}</p>
        <h2 ref={serverEnv} className=' text-2xl font-bold italic text-green-800'>Server env: {serverEnvVariables.serverenv}</h2>
        <img src="images/tools.jpg" alt="" ref={marteau} className='w-40 h-40 object-cover rounded-r-3xl border-2 border-gray-300'/>
        <ul className='text-gray-600 text-2xl font-semibold'>
          {apiData.map((fruit, index) => (
            <li key={index} className='hover:text-blue-300'>
              {fruit}
            </li>
          ))}
        </ul>

      </div>
  )
}

export default App
