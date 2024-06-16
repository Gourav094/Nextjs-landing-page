import {connect} from "@/dbConfig/db"
import { getDataFromToken } from "@/helpers/getDataFromToken"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"

connect()

export async function GET(req:NextRequest){
    const token = req.cookies.get("token")?.value || ""

    const userId = getDataFromToken(token)
    console.log("Got user data",userId)
    if(!userId){
        return NextResponse.json({
            message:"Session Expired",
            status:400
        })
    }

    const user = await User.findOne({_id:userId}).select("-password")
    return NextResponse.json({
        message:"user found",
        user,
        status:200
    })
}