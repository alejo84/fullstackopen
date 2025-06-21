const Persons=({persons, onDelete})=>persons.map(item=><Person key={item.id} person={item} onDelete={()=>onDelete(item.id)}></Person>)

const Person=({person, onDelete})=>{    
    return(
        <div>
            {person.name} {person.number}
            <button onClick={onDelete}>delete</button>        
        </div>  
    )
}


export default Persons