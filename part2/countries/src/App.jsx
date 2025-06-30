import { useState, useEffect } from 'react'
import Search from './components/Search'
import Results from './components/Results'
import Country from './components/Country'
import myCom from './services/communication'

const App=()=>{  

  const [countries,setCountries]=useState([])
  const [text,setText]=useState('')   
  const [matches,setMatches]=useState([])  
  const [countryToShow,setCountryToShow]=useState([])
  const [weather,setWeather]=useState([])  

  useEffect(()=>{
    myCom.getAll()
    .then(response=>{ 
      setCountries(response)
    })
  },[])      
 
  const onTextChange=(event)=>{   
    const results=countries.filter(x=>x.name.official.toLowerCase().includes(event.target.value.toLowerCase()))   
    if(results.length===1){
      myCom.getGeo(results[0].capitalInfo.latlng)
      .then(country=>                     
              setWeather(country)
      )
    }
    setMatches(results)
    setCountryToShow(results)
    setText(event.target.value)    
  } 

  const onShowClick=(cca2)=>{    
    const myCountry=matches.filter(x=>x.cca2===cca2)
    setCountryToShow(myCountry)    
    myCom.getGeo(myCountry[0].capitalInfo.latlng)
      .then(country=>                                
            setWeather(country)
      )   
  }

  return(
    <div>
    <Search value={text} onChange={onTextChange}></Search>
    <Results matches={matches} onClick={onShowClick}></Results>
    <Country country={countryToShow} weather={weather}></Country>
    </div>
  )

}

export default App

