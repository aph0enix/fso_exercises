import axios from "axios";
import { useState, useEffect } from "react";
const COUNTRIES_URL = "https://restcountries.com/v3.1/all";
const COUNTRIES_DEV = "http://localhost:3001/all";

const Results = ({ countries, setCountryQuery}) => {
  if (countries.length === 1) {
    return <Country country={countries[0]} />;
  }
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }
  return (
    <ul>
      {countries.map((c) => (
        <li key={c.name.common}>{c.name.common} <button onClick={()=>setCountryQuery(c.name.common)}>show</button></li>
      ))}
    </ul>
  );
};
const Country = ({ country }) => {
  const [weather, setWeather] = useState([])
  
  const hook = ()=>{
    const key = process.env.REACT_APP_OPEN_WEATHER_KEY
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&APPID=${key}&units=metric`
    axios.get(url)
    .then(res=>{
      console.log(res.data.weather[0].icon)
      setWeather({temp:res.data.main.temp,wind:res.data.wind.speed,icon:res.data.weather[0].icon})
      document.getElementById("icon").src = `http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`
    })    
  }
  useEffect(hook,[]);
  const langs = Object.entries(country.languages)
  
  return (
    <>
      <div>
        <h1>{country.name.common}</h1>
      </div>
      <div>Capital: {country.capital}</div>
      <div>Area: {country.area}</div>
      <br/>
      <h3>Languages:</h3>
      <ul>
        {langs.map((lang) => (
          <li key={lang[0]}>{lang[1]}</li>
        ))}
      </ul>
      <br/>
      <img src={country.flags.png} alt={country.name.common + " flag"} />
      <h2>Weather in {country.capital}</h2>
      <div>temperature {weather.temp} Celcius</div>
      <img id="icon" src="" alt=""/>
      <div>wind {weather.wind} m/s</div>
    </>
  );
};
const App = () => {
  //console.log("Running in",process.env.NODE_ENV,"mode")
  const [countryQuery, setCountryQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const hook = () => {
    axios.get(COUNTRIES_DEV).then((res) => setCountries(res.data));
  };

  useEffect(hook, []);
  const onSearchChange = (event) => {
    setCountryQuery(event.target.value);
  };
  const filtered_countries= countries.filter(
    c=>c.name.common.toLowerCase().indexOf(countryQuery.toLowerCase()) !== -1
  ) 
  return (
    <div>
      <div>
        find countries: <input onChange={onSearchChange} value={countryQuery} />
      </div>
      <Results
        countries={filtered_countries} 
        setCountryQuery={setCountryQuery}
      />
    </div>
  );
};

export default App;
