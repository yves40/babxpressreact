
import { useState, useEffect } from 'react'
import './compiled.css'


function App() {
  const [apiData, setApiData] = useState([])
  
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
    fetchApi()
  }, [])  // initial render

  return (
    <>
      <div className='min-h-screen w-full bg-gray-100 flex items-center justify-center flex-col gap-10'>
        <h2 className=' text-2xl font-bold italic text-green-800'>Fruits from API:</h2>
        <ul className=' text-red-600 text-2xl font-semibold'>
          {apiData.map((fruit, index) => (
            <li key={index}>{fruit}</li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
