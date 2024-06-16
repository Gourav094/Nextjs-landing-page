import { NextResponse } from "next/server";

export async function GET(){
    try{
        const response =  NextResponse.json({
            message:"Logout successfully",
            status:200,
            success:true
        })
        response.cookies.set("token","",{httpOnly:true})
        return response
    }catch(error:any){
        return NextResponse.json({
            error:error.message,
            status:400
        })
    }
}