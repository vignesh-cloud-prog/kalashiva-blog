import React from 'react'
import Link from "next/link";

export default function Tabs() {
    return (
        <div>
           <nav>
               <Link href="/"><a >Home</a></Link>
               <Link href="/ಲೇಖನ"><a >ಲೇಖನ</a></Link>
               <Link href="/ಕಥೆ"><a >ಕಥೆ</a></Link>
               <Link href="/ಕವಿತೆ"><a >ಕವಿತೆ</a></Link>
               </nav> 
        </div>
    )
}

