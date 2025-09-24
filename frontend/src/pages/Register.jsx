import {useState} from 'react'
import API from '../services/api'

export default function Register(){
    const [form, setForm] = useState({ name:"", email:"", password:""})
    const [message, setMessage] = useState("")

    const handleChange = (e) =>{
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit =  async (e) =>{
        e.preventDefault();
        try{
            const res = await API.post("/register", form);
            localStorage.setItem("token", res.data.data.token)
            setMessage("Registration Successfull!")
        }catch(error){
            setMessage(error.response?.data?.message || 'Error registering')
        }
    }
    return(
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder='Name' value={form.name} onChange={handleChange}/>
                <input name="email" placeholder='Email' value={form.email} onChange={handleChange}/>
                <input name="password" placeholder='Password' value={form.password} onChange={handleChange}/>
                <button type="submit">Register</button>
            </form>
            <p>{message}</p>
        </div>
    )
}