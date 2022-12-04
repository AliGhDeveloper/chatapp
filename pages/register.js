import Link from "next/link"
import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { register } from 'utils/queries';
import { useRouter } from "next/router";

export default function Register () {
    
    const [ data, setData ] = useState({ username : "", email: "", password: "" });
    const { username, email, password } = data
    const [ addUser, userData ] = useMutation(register);
    const router = useRouter();

    console.log(userData)
    useEffect(() => {
        if(userData.data && userData.data.addUser) {
            router.push('/login')
        }
    }, [userData])

    const handleChange = (e) => {
        setData({ ...data, [e.target.name] : e.target.value})
    }

    const handleLogin = (e) => {
        e.preventDefault();
        if(!username || !password || !email) return console.log('please add all fields')
        addUser({
            variables : data,
        })
    }
    
    return (
        <div className="container login">
            <div className="row">
                <div style={{margin: "30px auto"}} className="col-12 col-md-7" >
                    <div style={{ padding: '25px'}} className="card">
                        <h4 className="card-title">Register</h4>
                        <form onSubmit={handleLogin} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>                   
                            <input className="form-control form-control-sm w-75 my-2" name="username" placeholder="username" onChange={handleChange}/>                    
                            <input className="form-control form-control-sm w-75 my-2" name="email" placeholder="email" onChange={handleChange}/>                    
                            <input className="form-control form-control-sm w-75 my-2" name="password" placeholder="password" onChange={handleChange}/> 
                            <button type="submit" className="btn btn-outline-primary w-75">Register</button>                   
                        </form>
                        <p className="mt-2">already have an account ? <Link href="/login">login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}