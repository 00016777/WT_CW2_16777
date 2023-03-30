import mongoose from "mongoose";
import validator from "validator";
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'medicine must have a name'],
        trim:true
    },
    email: {
        type:String,
        required:[true,'distributor must have an email'],
        lowercase:true,
        validate:[validator.isEmail,'please provide a valid email']
    },
    address:{
        type:String,
        required:[true,'distributor must have an address']
    },
    variety:{
        type:String,
        required:[true,'medicine must have a variety']
    }
})

const User = mongoose.model('User',userSchema);
export default User