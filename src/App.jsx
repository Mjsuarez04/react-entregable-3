import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import LocationInfo from './components/LocationInfo'
import ResidentInfo from './components/ResidentInfo'
import getRandomLocation from './utils/getRandomLocation'

function App() {

  // save in state location from API data
  const [location, setLocation] = useState()
  // save in a state the random location function from Js file import
  const [numberLocation, setNumberLocation] = useState(getRandomLocation())
  // save in a state the error handling (error display)
  const [hasError, setHasError] = useState(false)
  // save the info of the suggestions in a state
  // const [listLocation, setListLocation] = useState()
  // loading scream
  const [isLoading, setIsLoading] = useState(false)

  //get API info and handle errors
  useEffect(() => {
    const url = `https://rickandmortyapi.com/api/location/${numberLocation}`
    setIsLoading(true)
    axios.get(url)
    .then(res => {
      setLocation(res.data)
      setHasError(false)})
    .catch(err => {
      console.log(err)
      setHasError(true)})
    .finally(() => {
      setIsLoading(false)
      setTimeout(() => setIsLoading(false), 5000)
    })
  }, [numberLocation])

  // handle submit event
  const handleSubmit = e => {
    e.preventDefault()
    if (e.target.inputLocation.value.trim().length === 0) {
      setNumberLocation(getRandomLocation())
    } else {
      setNumberLocation(e.target.inputLocation.value.trim())
    }
    e.target.inputLocation.value = e.target.inputLocation.value.trim()
  }

  // location suggestions via a new api request
  // const handleChange = e => {
  //   const url =`https://rickandmortyapi.com/api/location/?name=${e.target.value.trim()}`
  //   axios.get(url)
  //     .then(res => setListLocation(res.data.results.map(loc => loc.name)))
  //     .catch(err => console.log(err))
  // }

  // console.log(listLocation)
  
  return (
    <div className="app">
      <h1 className='app__title'>Rick and Morty</h1>
      <form className='form' onSubmit={handleSubmit}>
        <input 
          className='form__input' 
          id='inputLocation' 
          type="text" 
          // onChange={handleChange}
        />
        <button className='form__btn'>Search</button>
      </form>
      {/* <ul>
          {
            listLocation?.map(loc => (
              <li onClick={() => setNumberLocation(loc.id)} key={loc.id}>{loc.name}</li>
            ))
          }
        </ul> */}

        {
          isLoading ? 
          <h1>One seg please😥</h1>
          :
            hasError ?
            <h2 className='app__error'>❌ Hey! you must provide an id from 1 to 126 😥</h2>
            :
            <>
              <LocationInfo location={location} />
              <div className='residents__container'>
                  {
                    location?.residents.map(url => (
                      <ResidentInfo
                        key={url} 
                        url={url}
                      />
                    ))
                  }
              </div>
            </>
        }
      </div>
  )
}

export default App
