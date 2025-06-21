const Header = ({text}) => <h2>{text}</h2>

const Content = ({content}) => {    
  return(
    <div>
       {content.parts.map(item=> <Part key={item.id} part={item}></Part>)}
    </div>
  )
}   

const Part = ({part}) => <p>{part.name} {part.exercises}</p>

const Total=({part})=>{  
  const exercises=part.map(item=>item.exercises)
  const myTotal=exercises.reduce((total,current)=>total+current,0)
  return(
    <p><b>Total of {myTotal} exercises</b></p>
  )
}

const Course=({course})=>{
    return(
        <>
            <Header text={course.name}></Header>
            <Content content={course}></Content>
            <Total part={course.parts}></Total>
        </>             
    )    
}

export default Course