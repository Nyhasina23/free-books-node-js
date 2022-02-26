import {User} from '../models/user.model.js'

class Controller {

    static getData (cb) {
        User.find((err , data) => { 
            if(err)console.log("Error can't get user "+err); 
            cb(data)
        })
    }

    static AddUserData(_name , _firstname , _age , cb) {
        const newUser = new User({
            name : _name , 
            firstname : _firstname , 
            age : _age
        });
    
        newUser.save((err , data) => {
            if(err) console.log("Error can't create user "+err);
            else{
                cb(data)
            }
        })

    }

    static UpdateUser(id ,_name , _firstname , _age , cb) {
                const updateRecord = {
                    name : _name , 
                    firstname : _firstname , 
                    age : _age
                }
                User.findByIdAndUpdate(
                    id , 
                    { $set : updateRecord }, 
                    {new : true} ,
                    (err , data) => {
                        if(err) console.log("Error can't update data : "+err);
                        else cb(data)
                    }
                )
    }

    static DeleteUser(id , cb) {
        User.findByIdAndRemove(
            id , 
            (err , data) => {
                if(err) console.log("Error can't delete data : "+err);
                else cb(data)
            }
        );
    }

}

export {Controller}