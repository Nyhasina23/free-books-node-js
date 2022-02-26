import mongoose from 'mongoose'

const User = mongoose.model(
    "User" , // database name
    {
        name : {
            type : String, 
            require : true
        } , 
        firstname : {
            type : String, 
            require : true
        } , 
        age : {
            type : Number , 
            require : true
        } 
    } , 
    "Users" // user table name
)

export { User }
