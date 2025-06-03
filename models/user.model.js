import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "name needs to exist"],
        trim: true,
        minLength: 3,
        maxLength: 50,
    },
    email:{
        type: String,
        required: [true, "email needs to exist"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Please fill a valid email adress"],
    },
    password:{
        type: String,
        required:[true, "user needs to have a password"],
        minLength:5,

    }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;