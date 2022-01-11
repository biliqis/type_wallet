import { Router } from "express";
import userController from "./user.controller";

class userRouter {
    public router: Router;

    constructor (){
        this.router = Router()
        this.routes();
    
    }
    private routes():void {
        this.router.post("/user-signup", userController.userSignupController) 
        this.router.post("/user-login", userController.userLogin)
        this.router.post("/update-user", userController.updateUserController)
    }

}


export default new userRouter().router;
