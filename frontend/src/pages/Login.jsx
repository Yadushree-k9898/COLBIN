import {useState} from 'react'
import API from '../services/api'

export default function Login(){
    const [form, setForm] = useState({email:"", password:""})
    const [message, setMessage] = useState("")

    const handleChange = (e) =>{
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
            const res = await API.post("/login", form);
            localStorage.setItem("token", res.data.data.token);
            setMessage("Login successfull")
        }catch(error){
            setMessage(error.response?.data?.message || 'Error logging in')
        }
    }
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input name="email" placeholder='Email' value={form.email} onChange={handleChange}/>
                <input name="password" placeholder='Password' type="password" value={form.password} onChange={handleChange}/>
                <button type="submit">Login</button>
            </form>
            <p>{message}</p>
        </div>
    )
}