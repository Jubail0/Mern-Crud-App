import React from 'react'
import{NavLink, useParams} from 'react-router-dom'

function View() {
const{id}=useParams("")
const[eachUser,setEachUser]=React.useState({})

const userDetails = async ()=>{
  try {
    
const res =await fetch(`/view/${id}`,{
  method:"GET",
  headers:{"Content-Type":"application/json"}
}) 
const data = await res.json()
console.log(data)
if(res.status=== 422|| !data){
  window.alert("No data Available")
}else{setEachUser(data)}

 } catch (error) {
 console.log(error) }

}
React.useEffect(()=>{
  userDetails()
},[])

  return (
    <section className='content'>
      <div className='user-container'>
        <div className='card-container'>
          <h1>User Details</h1>
          
         <p>ID: {eachUser._id}</p>
         <p>Name: {eachUser.name}</p>
         <p>Work: {eachUser.work}</p>
         <p>Contact: {eachUser.contact}</p>

        <p><NavLink to='/'> <button className='back-btn'>Back</button></NavLink></p>
        
         
        </div>
      </div>
    </section>
  )
}

export default View