const Input=({text,value,handler})=>{
  return(
    <div>
    {text} 
    <input        
      value={value}     
      onChange={handler}
    />
  </div>
  )  
}

const Button=({text,handler})=>{
  return(
    <div>
      <button type="submit"
        onClick={handler}                      
      >{text}</button>          
    </div>
  )
}

const Form=({newName, handlerNewName, newNumber, handlerNewNumber, handlerButton})=>{
  return(
    <form>
        <Input text="name:" value={newName} handler={handlerNewName}></Input>  
        <Input text="number:" value={newNumber} handler={handlerNewNumber}></Input> 
        <Button text="add" handler={handlerButton}></Button>
      </form>
  )
}

export default Form