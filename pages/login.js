import Link from "next/link"
import { useState } from "react"

export default function Login () {
    
    const [ data, setData ] = useState({ email: "", password: "" })

    const handleChange = (e) => {
        setData({ ...data, [e.target.name] : e.target.value})
    }

    const handleLogin = (e) => {
        e.preventDefault()
    }
    
    return (
        <div className="container login">
            <div className="row">
                <div style={{margin: "30px auto"}} className="col-12 col-md-7" >
                    <div style={{ padding: '25px'}} className="card">
                        <h4 className="card-title">Login</h4>
                        <form onSubmit={handleLogin} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>                   
                            <input className="form-control form-control-sm w-75 my-2" name="email" placeholder="email" onChange={handleChange}/>                    
                            <input className="form-control form-control-sm w-75 my-2" name="password" placeholder="password" onChange={handleChange}/> 
                            <button type="submit" className="btn btn-outline-primary w-75">login</button>                   
                        </form>
                        <p className="mt-2">dont have an account ? <Link href="/register">register</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}