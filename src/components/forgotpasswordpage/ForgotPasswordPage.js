'use client'
import { sendPasswordResetEmail } from 'firebase/auth';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { auth } from '@/lib/firebase';

const ForgotPasswordPage = () =>{
    const [email, setEmail] = useState('');
const resetEmail = () => {
sendPasswordResetEmail(auth,email);
};
    return (
        <main className="w-full h-screen flex flex-col items-center mt-12 sm:px-4">
            <div className="w-full space-y-6 text-gray-600 sm:max-w-md bg-white rounded">
                <div className="text-center">
                    <div className="mt-5 space-y-2">
                        <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Forgot Password</h3>
                        {/* <p className="">Don't have an account? <a href="javascript:void(0)" className="font-medium text-indigo-600 hover:text-indigo-500">Sign up</a></p> */}
                    </div>
                </div>
                <div className="bg-white  p-4 py-6 space-y-8 sm:p-6 sm:rounded-lg">            
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="space-y-5"
                    >
                        <div>
                            <label className="font-medium">
                                Email
                            </label>
                            <input
    onChange={(e)=>setEmail(e.target.value)}
                                type="email"
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            />
                        </div>
                       
                        <button
                        onClick={()=>resetEmail()}
                        disable={!email}
                            className=" disabled:opacity-40 w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                        >
                            Send Forgot Password Email
                        </button>
                    </form>
                    
                </div>
            
            </div>
        </main>
    )
}

export default ForgotPasswordPage