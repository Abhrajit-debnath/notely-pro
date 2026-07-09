import bcrypt from "bcrypt";
import { logger } from "../../config/logger.js";

const hashPassword = async(password:string)=>{
    try {
        const hashedPassword = await bcrypt.hash(password,10);
        return hashedPassword;
    } catch (error) {
        logger.error(error);
    }
}

const comparePassword = async(password:string,hashedPassword:string)=>{
    try {
        const isMatch = await bcrypt.compare(password,hashedPassword);
        return isMatch;
    } catch (error) {
        logger.error(error);
    }
}

export {hashPassword,comparePassword};