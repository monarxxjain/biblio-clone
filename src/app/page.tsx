"use client"

import FormQuery from "@/components/FormQuery";
import Footer from "@/components/global/Footer";
import Header from "@/components/global/Header";
import Meta from "@/components/global/Meta";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function Home() {

    const session = useSession({
    required: true,
    onUnauthenticated() {
    redirect('/login');
    },
  });
  return (
    <div className='bg-gradient-to-tr from-rose-50 to-rose-200 dark:bg-gradienthero'>
      <div className='text-white'>{session?.data?.user?.email}</div>
      <button className="text-white" onClick={()=>signOut()}>Logout</button>
    
      <Meta />
      <Header />
      <FormQuery />
      <Footer />
    </div>
  );
}
