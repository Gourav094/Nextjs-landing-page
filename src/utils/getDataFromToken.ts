import jwt from "jsonwebtoken"

export function getDataFromToken(token:any){
    const data:any = jwt.verify(token,process.env.TOKEN_SECRET!)
    return data.id;
}