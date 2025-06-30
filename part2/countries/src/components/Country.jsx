const Weather=({weather})=>{       
    if (weather.length===0){
        return(
            <div>Waiting for info</div>
        )
    }else{        
        const icon=`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
        return(
         <div>
            <h2>Weather</h2>
            <p>Temperature {weather.main.temp}° Celsius</p>            
            <img src={icon}/>
            <p>Wind {weather.wind.speed} m/s</p>
        </div> 
    )
    }
    
}

const Country=({country, weather})=>{    
    if(country.length===1){                       
        return(
            <div>
                <h1>{country[0].name.official}</h1>
                <div>
                    <p>Capital: {country[0].capital[0]}</p>
                    <p>Area: {country[0].area} Km2</p>
                </div>
                <div>
                    <h2>Languages</h2>
                    <div>
                        <ul>
                            {Object.entries(country[0].languages).map(([key, value]) => 
                            <li key={key}>{value}</li>)}
                        </ul>                    
                    </div> 
                </div>
                <div>
                <img src={country[0].flags.png}/>
                </div>   
                <Weather weather={weather}></Weather> 
            </div>            
        )
    } else{
        return(<></>)
    }       
        
}

export default Country