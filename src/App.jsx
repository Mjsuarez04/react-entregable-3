import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import LocationInfo from "./components/LocationInfo";
import ResidentInfo from "./components/ResidentInfo";
import getRandomLocation from "./utils/getRandomLocation";

function App() {
  // save in state infoLoc from API data
  const [infoLoc, setInfoLoc] = useState();
  // save in a state the random infoLoc function from Js file import
  const [numberLocation, setNumberLocation] = useState(getRandomLocation());
  // save in a state the error handling (error display)
  const [hasError, setHasError] = useState(false);
  // save the info of the suggestions in a state
  const [listLocation, setListLocation] = useState();
  //
  const [getValue, setGetValue] = useState()
  //
  const [isShow, setIsShow] = useState(false)
  // loading scream
  const [isLoading, setIsLoading] = useState(false);


  //get API info and handle errors
  useEffect(() => {
    const url = `https://rickandmortyapi.com/api/location/${numberLocation}`;
    setIsLoading(true);
    axios
      .get(url)
      .then((res) => {
        setInfoLoc(res.data);
        setHasError(false);
        setIsShow(false)
      })
      .catch((err) => {
        console.log(err);
        setHasError(true);
        setIsShow(false)
      })
      .finally(() => {
        setIsLoading(false);
        setTimeout(() => setIsLoading(false), 5000);
      });
  }, [numberLocation]);

  // handle submit event
  const handleSubmit = (e) => {
    e.preventDefault();
    setHasError(false);
    clearSelectValue();
    if (e.target.inputLocation.value.trim().length === 0 ||  e.target.inputLocation.value.trim() === '0') {
      setHasError(true);
    } else {
      setNumberLocation(e.target.inputLocation.value.trim());
      e.target.inputLocation.value = e.target.inputLocation.value.trim();
    } 
  };

  const handleChange = e => {
    clearSelectValue()
    const inputValue = e.target.value.trim();
    if (inputValue) {
      const url = `https://rickandmortyapi.com/api/location/?name=${inputValue}`;
      axios.get(url)
        .then(res => setListLocation(res.data.results))
        .catch(err => console.log(err));
      setIsShow(true);
    } else {
      setListLocation([]);
      setIsShow(false);
    }
  };
  const handleFocus = e => {
    e.target.value = ""
  }
  const clearSelectValue = () => {
    setGetValue(undefined);
  };
  const handleClickList = (loc) => {
    setNumberLocation(loc.id)
    setGetValue(loc.name)
  }

  return (
    <div className="app" onClick={() => setIsShow(false)}>
      <div className="img__container">
        <img className="banner__img" src="https://i.pinimg.com/originals/5b/66/7d/5b667d877265b876259a1633403b0ec9.jpg" alt="" />
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="form__input"
          id="inputLocation"
          type="text"
          value={getValue}
          onChange={handleChange}
          onFocus={handleFocus}
        />
        <button className="form__btn"><i class='bx bx-search'></i></button>
        {isShow &&
        <ul className="sugerencias">
          {listLocation?.map(loc => (
            <li className="lista" onClick={() => handleClickList(loc)} key={loc.id}>
              {loc.name}
            </li>
          ))}
        </ul>
        } 
      </form>

      {isLoading ? (
        <h1>One seg please😥</h1>
      ) : hasError ? (
        <h2 className="app__error">
          <img className="error__img" src="https://www.pngplay.com/wp-content/uploads/14/Rick-And-Morty-Angry-PNG-Clipart-Background.png" alt="" />
          ❌ Hey! you must provide an id from 1 to 126 😥
        </h2>
      ) : (
        <>
          <LocationInfo infoLoc={infoLoc} />
          <div className="residents__container">
            {infoLoc?.residents.map(url => (
              <ResidentInfo key={url} url={url} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
