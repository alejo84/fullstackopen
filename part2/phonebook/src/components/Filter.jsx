const Filter=({value,handler})=>{    
    return(
    <div>
      <input
        value={value}
        onChange={handler}> 
      </input>
    </div>
    )  
}

export default Filter