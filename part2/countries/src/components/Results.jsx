const Item=({country,onClick})=>{    
    return(
        <div>
            {country.name.official} 
            <button onClick={()=>onClick(country.cca2)}>show</button>
        </div>        
    )
}

const Results=({matches, onClick})=>{          
    if (matches.length>10){
        return(<p>Too many matches, specify another filter</p>)  
    }else if(matches.length===1){       
        return (<div></div>)  
    }else{
        return(
            <div>
                {matches.map((x)=> <Item key={x.cca2} country={x} onClick={onClick}/>)}
            </div>
        )
    }       
}

export default Results