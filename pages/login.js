import Link from "next/link"
import { useState, useEffect, useContext } from "react"
import { useLazyQuery } from "@apollo/client";
import { login } from "utils/queries";
import { Context } from "store/globalstore";
import { useRouter } from "next/router";


export default function Login () {
    const router = useRouter()
    const { state: { auth }, dispatch } = useContext(Context)
    const [ loginFunc, loginData ] = useLazyQuery(login);
    const [ data, setData ] = useState({ email: "", password: "" });
    const { email, password } = data
    
    useEffect(() => {
        if(!auth.loading && auth.accesstoken && auth.user) {
            router.push('/')
        }
    }, [auth])


    useEffect(() => {
        if(loginData.data && loginData.data.login) {
            dispatch({ type: 'AUTH', payload: {loading: false, ...loginData.data.login}})
            router.push('/')
        }
    }, [ loginData ])

    const handleChange = (e) => {
        setData({ ...data, [e.target.name] : e.target.value})
    }

    const handleLogin = (e) => {
        e.preventDefault();
        if(!email || !password) return console.log('please add all fields');

        loginFunc({
            variables : data
        })
    }
    
    if(auth.loading) return <h1>loading ...</h1>

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