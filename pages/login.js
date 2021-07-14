import React from 'react'
import { useState } from 'react'
import { auth } from '../firebase'
import Link from 'next/link'

export default function Login() {
    const [email,setEmail]=useState(``)
    const [password,setPassword]=useState(``)
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const result=  await auth.signInWithEmailAndPassword(email,password)
            
            M.toast({html:`Welcome ${result.user.displayName}`,classes:"green"})
        }catch(err){
            M.toast({html:err.message,classes:"red"})
    
            }
        console.log(email,password);
    }
    return (
        <div className="container">
            <h1>I am Login</h1>
            <form onSubmit={(e)=>handleSubmit(e)} >
                <div className="input-field">
                    <input type="text" placeholder="e-mail" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                </div>
                <button type="submit" className="#311b92 deep-purple darken-4 btn">Login</button>
                <Link href="/signup"><h6> Don't have an account Signup</h6></Link>
            </form>
        </div>
    )
}
