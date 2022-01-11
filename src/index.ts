import "reflect-metadata"
import { createConnection } from "typeorm"
import express from 'express'
import morgan from "morgan"
import {config} from 'dotenv'
import indexRouter from './routes/index'
config({path:'/.env'})

createConnection().then(async onnection => {
    // here you can start to work with your entities
      const app = express() 
      const PORT:string|number = process.env.PORT||5000
      app.use(express.json())
      app.use(morgan('dev'))
  
      app.use('/api/v1',indexRouter)
  
      app.listen(PORT, ():void=> console.log(` Database connected and this app is running on port ${PORT}`))
    }).catch(error => console.error(error));