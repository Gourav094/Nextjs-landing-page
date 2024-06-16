import jwt from "jsonwebtoken"

export function getDataFromToken(token:string){
    const data = jwt.verify(token,process.env.TOKEN_SECRET!)
    return data;
}