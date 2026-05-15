/* eslint-disable no-unused-vars */

import { useState, useEffect } from 'react'
import './index.css'


function App() {
  const [apiData, setApiData] = useState([])
  const [fakedata, setFakedata] = useState(
    [
      { name: 'Ken Tyrell', age: 30, email: 'ken.tyrell@example.com' },
      { name: 'Jackie Stewart', age: 30, email: 'jackie.stewart@example.com' },
      { name: 'Carlos Reuteman', age: 30, email: 'carlos.reuteman@example.com' },
      { name: 'Mario Andretti', age: 30, email: 'mario.andretti@example.com' },
    ]
  )  
  
  const fetchApi = async () => {
    try {
      const response = await fetch('http://localhost:5000/api')
      const data = await response.json()
      console.log('Data from server:', data)
      setApiData(data.fruits)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
  }, [])  // initial render

  return (
      <div className='min-h-screen w-full bg-gray-100 flex items-center justify-center flex-col gap-10'>
        <h2 className=' text-2xl font-bold italic text-green-800'>F1 from static with Vite 8.0.10</h2>
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
        <h2 className=' text-2xl font-bold italic text-green-800'>Fruits dynamic with Vite 8.0.10</h2>
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
