import userService from "./user.service";
import { Request, Response } from "express";

class userController {
    public userSignupController = async (req: Request, res: Response) => {
        try {
            const data = await userService.userSignUp(req, res);
            return res.status(201).json({message:"sign up successful",data})
        } catch (err: any) {
            console.error(err);
            return res.status(500).send({ message: err.message });
        }
    };


    public userLogin = async (req:Request, res:Response)=>{
        try {
            const userData = await userService.userLogin(req, res)
            return res.status(200).send({message:"user login succesful", userData})
        } catch (err:any) {
            console.error(err)
            return res.status(500).send({message:err.messge})
            
        }
    }

    public updateUserController = async(req:Request, res:Response)=>{
     try {
        const update = await userService.updateUser(req, res)
        return res.status(200).send({message:"succesfully updated"})
     } catch (err:any) {
         console.error(err.message)
         return res.status(500).send({message:err.message})
         
     }
    }


}

export default new userController();
