import React from 'react'
import { useState } from 'react'
import { auth } from '../firebase'
import Link from 'next/link'

export default function Signup() {
    const [name,setName]=useState(``)
    const [email,setEmail]=useState(``)
    const [password,setPassword]=useState(``)
    const handleSubmit= async(e)=>{
        e.preventDefault();
        try{
        const result=  await auth.createUserWithEmailAndPassword(email,password)
        await result.user.updateProfile({
            displayName:name
        })
        M.toast({html:`Welcome ${result.user.displayName}`,classes:"green"})
    }catch(err){
        M.toast({html:err.message,classes:"red"})

        }

    }
    return (
        <div className="container">
            <h1>I am Signup</h1>
            <form onSubmit={(e)=>handleSubmit(e)} >
                <div className="input-field">
                    <input type="text" placeholder="Enter Your name" value={name} onChange={(e)=>setName(e.target.value)} />
                    <input type="email" placeholder="e-mail" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                </div>
                <button type="submit" className="#311b92 deep-purple darken-4 btn">Signup</button>
                <Link href="/login"><h6> Already have an account? Login</h6></Link>
            </form>
        </div>
    )
}
