import React from 'react'
import{ useNavigate, useParams} from 'react-router-dom'

function User() {
  const navigate = useNavigate()
  const{id}=useParams("")
  const[update,setUpdate]=React.useState(false)
  const[formData,setFormData]=React.useState({
    name:"",
    work:"",
    contact:""
  })

  const handleChange = (e)=>{
  const{name,value}=e.target
  setFormData(prevState => ({
    ...prevState,
    [name]:value
  }))
  }

  const formSubmit = async (e)=>{
    e.preventDefault()

    const{name,work,contact}=formData

    const res = await fetch("/user",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({name,work,contact})
    })
    const data = await res.json()

    if(res.status === 422 || !data){
      window.alert("Invalid Credentials")
      
    }else{
      setFormData(prevState => ({...prevState,name:"",work:"",contact:""}))
      window.alert("User added successfully!")
    }


  }

  const userDetails = async ()=>{
    try {
      
  const res =await fetch(`/user/${id}`,{
    method:"GET",
    headers:{"Content-Type":"application/json"}
  }) 
  const data2 = await res.json()
  
  if(res.status=== 422|| !data2){
    window.alert("No data Available")
  }else{setFormData(data2)
  setUpdate(true)}
  
   } catch (error) {
   console.log(error) }
  
  }
  React.useEffect(()=>{
    userDetails()
  },[])


  const updateData = async(e)=>{
  e.preventDefault()
  const{name,work,contact}=formData
  const res = await fetch(`/user/${id}`,{
 method:"PATCH",
 headers:{"Content-Type":'application/json'},
 body:JSON.stringify({name,work,contact})

  })
  const data3 =res.json()

  if(res.status === 422 || !data3){
    window.alert("Invalid Credentials")
  }else{
    // setFormData(prevState => ({...prevState,name:"",work:"",contact:""}))
    window.alert("User Updated successfully!")
    navigate("/")
  }



  }

  return (
    <section className='content'>
    <div className='form-container'>
    <form method='POST'>


      {update ?  
      <>
      <h1>Update user</h1>
      <input type="text" name='name' value={formData.name} onChange={handleChange} placeholder="Name"  autoComplete='off'/>
      <input type="text" name='work' value={formData.work} onChange={handleChange} placeholder="work"  autoComplete='off'/>
      <input type="number" name='contact' value={formData.contact} onChange={handleChange} placeholder="Contact" autoComplete='off' />
 
      <button type='submit' onClick={updateData} className='form-btn'>Update</button> </> : 

    
    
    
    
     <><h1>Add user</h1>
     <input type="text" name='name' value={formData.name} onChange={handleChange} placeholder="Name"  autoComplete='off'/>
     <input type="text" name='work' value={formData.work} onChange={handleChange} placeholder="work"  autoComplete='off'/>
     <input type="number" name='contact' value={formData.contact} onChange={handleChange} placeholder="Contact" autoComplete='off' />

     <button type='submit' onClick={formSubmit} className='form-btn'>Submit</button></>
     }
     
    </form>
    </div>
    </section>
  )
}

export default User