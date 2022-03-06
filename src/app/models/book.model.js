import mongoose from 'mongoose'
var BookImage = new mongoose.Schema(
    {
        title : {
            type : String, 
            require : true
        } , 
        desc : {
            type : String, 
            require : true
        } , 
        year : {
            type : Date , 
            require : true
        },
        image : {
            data : Buffer , 
            contentType : String
        }
    } 
)
const Book = new mongoose.model('Book' , BookImage , 'Books') 
export { Book }
