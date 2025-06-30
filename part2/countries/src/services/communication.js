import axios from 'axios'
const baseUrl= 'https://studies.cs.helsinki.fi/restcountries/api/all' 
const apiGeo= `https://api.openweathermap.org/data/2.5/weather?`

const api_key = import.meta.env.VITE_SOME_KEY
const getAll=()=>{
    const request=axios.get(baseUrl)
    return request.then(response=>response.data)  
}

const getGeo=(latlng)=>{       
    const request=axios.get(apiGeo+`lat=${latlng[0]}&lon=${latlng[1]}&appid=${api_key}&units=metric`)
    return request.then(response=>response.data)
}

export default { getAll, getGeo}

