import React from 'react'
import{NavLink}from "react-router-dom"
// import{useParams} from 'react-router-dom'


function Home() {
  // const{id}=useParams("")
  const[getData,setGetData]=React.useState([])
  
  const fetchData = async ()=>{
    
    const res = await fetch("/getdata",{
    method:"GET",
    headers:{"Content-Type":"application/json"},

  })
   const data = await res.json()
    
   if(res.status === 422 || !data){
    window.alert("Failed to add!")
   }else{
    setGetData(data)
    
   }

  }
  React.useEffect(()=>{
    fetchData()
   },[])

   const deleteData = async(id)=>{
    
    const res =  await fetch(`/delete/${id}`,{
      method:"DELETE",
      headers:{"Content-Type":"application/json"}
    })
    const deleteData = await res.json()

   if(res.status === 422 || !deleteData){
    console.log("error")
   }else{
    window.alert("User Deleted")
    fetchData()
   }
   }

  return (
    <section className='content'>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Work</th>
            <th>Contact</th>
            <th colSpan="3">Action</th>
            
          </tr>
          </thead>
          {getData.map((item,index)=>
          <tbody key={index}>
          <tr>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.work}</td>
            <td>{item.contact}</td>
            <td><NavLink to={`/view/${item._id}`}><button className='action-btn'><i className="fa-solid fa-eye"></i></button></NavLink></td>
            <td><NavLink to={`/user/${item._id}`}><button className='action-btn'><i className="fa-solid fa-pen-to-square"></i></button></NavLink></td>
            <td><NavLink to={`/delete/${item._id}`}><button onClick={()=>deleteData(item._id)} className='action-btn'><i className="fa-solid fa-trash-can"></i></button></NavLink></td>
          </tr>
          </tbody>
          )}

      </table>
    </section>
  )
}

export default Home