import { useState } from 'react'

const Label=({text})=><h1>{text}</h1>

const Button=({onClick, text})=><button onClick={onClick}>{text}</button>

const Statistics= ({data}) =>{  

  const total=data[0]+data[1]+data[2]
  const average=(data[0]+(data[2]*(-1)))/(total)
  const positive=((data[0]/total)*100)+"%"

  if (data[0]+data[1]+data[2]===0){
    return(
      <p>No feedback given</p>
    )
  }else{
    return(
    <table>
        <tbody>
          <StatisticsLine description="Good" value={data[0]}></StatisticsLine>
          <StatisticsLine description="Neutral" value={data[1]}></StatisticsLine>
          <StatisticsLine description="Bad" value={data[2]}></StatisticsLine>
          <StatisticsLine description="All" value={total}></StatisticsLine>
          <StatisticsLine description="Average" value={average}></StatisticsLine>
          <StatisticsLine description="Positive" value={positive}></StatisticsLine>
        </tbody>  
    </table> 
    )
  }    
}

const StatisticsLine=({description,value}) =>{
  return(       
    <tr>
      <td>{description}</td>
      <td>{value}</td>
    </tr>  
  )
}

const App = () => {
  
  let [good, setGood] = useState(0)
  let [neutral, setNeutral] = useState(0)
  let[bad, setBad] = useState(0)

  const handleGoodClick=()=> setGood(good+1)
  const handleNeutralClick=()=> setNeutral(neutral+1)
  const handleBadClick=()=> setBad(bad+1)    
  
  return (
    <div>
        <Label text="Give feedback"></Label>
        <Button onClick={handleGoodClick} text="Good"></Button>
        <Button onClick={handleNeutralClick} text="Neutral"></Button>
        <Button onClick={handleBadClick} text="Bad"></Button>
        <Label text="Statistics"></Label>
        <Statistics data={[good, neutral, bad]}></Statistics>         
    </div>
  )
}

export default App

