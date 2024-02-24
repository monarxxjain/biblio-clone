import admin from "@/lib/admin";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const body: { email:string } =
    await req.json();
  // The default sort is by popularity
  // Use the URL parameter "per_page" to get 100 instead of the default 30 books
  let respData = {
    isVerified :false
  };
  try{
      const userRecord = await admin.auth().getUserByEmail(body.email);
      if (userRecord) {
          if (userRecord.emailVerified) {
            respData.isVerified=true;
            console.log("Account {email} exists and is verified.")
            
          } else {
            
            await admin.auth().deleteUser(userRecord.uid);
            console.log("Account {email} exists and is not verified.")
          }
        }
      
  
    
    
  } catch (error) {
    console.error(
      "An error has occurred with generating and saving summary.\n",
      error
    );
   
  }
  return NextResponse.json(
    { message: "ok", respData },
    {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=600, stale-while-revalidate=1800",
      },
    }
  );
};
