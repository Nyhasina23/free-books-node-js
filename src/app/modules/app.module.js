import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import {router} from '../routes/app.route.js'
const app = express()

app.set('view engine' , 'ejs')

app.use('/public' , express.static('public'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))
app.use(router)

export {app}