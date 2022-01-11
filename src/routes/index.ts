import { Router } from "express"
import userRoutes from "../modules/user/user.routes"
class indexRouter {
    public router = Router()

    constructor(){
        this.allRoutes()

    }

    private allRoutes = ():void => {
        this.router.use('/', userRoutes)

    }




}

export default new indexRouter().router