import { useState } from "react"

const Title=({text})=><h1>{text}</h1>

const Button=({onClick,text})=><button onClick={onClick}>{text}</button>

const Anecdote=({anecdotes,index,votes})=>{
  return(
    <>
      <p>{anecdotes[index]}</p>    
      <p>Has {votes} votes</p>       
    </> 
  )
   
}

const App=()=> {   

  const myRandom=()=> Math.floor(Math.random() * 8) 
  let [selected, setSelected] = useState(myRandom()) 
  let [votes,setVotes]=useState (new Array(8).fill(0))  

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const onNextClick=()=>setSelected(selected=myRandom())  
   
  const onVoteClick=()=>{
    const newState=[...votes]
    newState[selected]=newState[selected]+1
    setVotes(newState)
  }

  const mostVoted=()=>{
    const most=Math.max(...votes)
    return votes.indexOf(most)      
  }   

  return (
    <div>      
      <Title text="Anecdote of the day"></Title>
      <Anecdote anecdotes={anecdotes} index={selected} votes={votes[selected]}></Anecdote>
      <Button onClick={onVoteClick} text="Vote"></Button>
      <Button onClick={onNextClick} text="Next Anecdote"></Button>     
      <Title text="Anecdote with most votes"></Title>  
      <Anecdote anecdotes={anecdotes} index={mostVoted()} votes={votes[mostVoted()]}></Anecdote>      
    </div>    
  )
}

export default App