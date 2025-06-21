const ErrorMessage=({message})=>{
    if(message==null){
        return null
    }else{
        return(
            <div className='error'>
                <br/>
                {message}
            </div>
        )
    }
}

export default (ErrorMessage)