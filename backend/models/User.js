import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,'please provide first name'],
        trim:true,
        minlength:2,
        maxlength:50
    },
    lastName:{
        type:String,
        required:[true,'please provide last name'],
        trim:true,
        minlength:2,
        maxlength:50
    },
    email:{
        type:String,
        required:[true,'please provide your email'],
        trim:true,
        unique:true,
        lowercase:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide valid email']
    },
    password:{
        type:String,
        required:[true,'please provide password'],
        select:false,
        minlength:6
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});


userSchema.pre('save',async function() {
    if(!this.isModified('password')){
        return;
    }
    try{
        const salt=await bcrypt.genSalt(10);
        this.password=await bcrypt.hash(this.password,salt);
    }catch(error){
        throw error;
    }
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password);
};

const User = mongoose.model('User',userSchema);

export default User;