"use client"

import { signIn } from 'next-auth/react'

function Login() {



    return (
      <div className='flex flex-col items-center bg-black min-h-screen w-full justify-center'>   
       <button className='bg-[#18D860] text-white p-5 rounded-full hover:bg-violet-500 transition ease-in-out' onClick={() => signIn('spotify', {callbackUrl: "/"})}> Sign in with Spotify</button>
      </div>
    );
  }
  
  export default Login;
