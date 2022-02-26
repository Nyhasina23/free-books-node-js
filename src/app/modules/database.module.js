import mongoose from 'mongoose'

async function load(){
    try{
        let db = await mongoose.connect(
            "mongodb://localhost:27017/User" , 
            {
                useNewUrlParser : true ,
                useUnifiedTopology : true,
            } , 
            (err) => {
                if(err) console.log("Connection error: "+err);
                else console.log("Mongodb connected");
            }
        )
        return db;

    }catch(e) { 
        throw e
    }
}


export { load }