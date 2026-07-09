import type { Response } from "express";

const responseSender = (res:Response,statusCode:number,message:string,data:unknown)=>{
   return res.status(statusCode).json({message,data})
}

export default responseSender;