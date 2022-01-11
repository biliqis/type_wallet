import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import { Request,Response } from 'express';
const expiresIn = process.env.JWT_EXP|| '1d';
const jwtSecretKey = process.env.JWT_SECRET! || 'secret';
import { User } from '../../entity/User';
import { getRepository } from 'typeorm';

class UserService {

    public generateJwt = (userObj:object):string => {
        return jwt.sign(userObj, jwtSecretKey as string, {
          expiresIn: expiresIn,
        }); 
      };

    public userSignUp =async (req:Request,res:Response):Promise<object> => {
        try {
            const user = new User()
            user.email = req.body.email
            // hash password before saving to db
            user.password =  bcrypt.hashSync(req.body.password,10)
            //save user
            await user.save()
            
            
                const token = this.generateJwt({
                  user_id: user.id
                });
                return { user, token };

        } catch (err:any) {
            console.error(err)
            throw new Error(err.message)
        }
        
    }

    public userLogin = async (req:Request, res:Response):Promise<object> =>{
        try {
      const user = await User.findOne({ where:{email:req.body.email} })
      if(!user) throw Error(" user not found")
      if (!await this.comparePassword(req.body.password, user.password)) {
        throw new Error("incorrect credentials!");
      }
      const token = this.generateJwt({
        user_id: user.id,
      })
      return {user, token}
        } catch (err:any) {
            console.error(err)
            throw new Error(err.message)
            
        }
        
    }

    public comparePassword = async(password:string, password2:string):Promise<boolean|undefined> =>{
        try {
            return await bcrypt.compare(password, password2);
        } catch (err:any) {
            console.error(err)
            throw new Error(err.message)
        }
     }

     public updateUser = async (req: Request, res:Response)=>{
         try {
             const user = await User.findOne(req.params.id)
             if (!user) return res.status(404).json({message:"user not found"})
             const UserRepo = getRepository(User)
             const update = await UserRepo.save({
                 id:user?.id,
                 ...req.body
             })
            return res.status(200).send({message: "successfully updated"})
         } catch (err:any) {
             console.error(err.message)
             throw new Error(err.message)
             
         }
     }



}


export default new UserService()