import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js"

export const signUp = async (req, res, next) =>{
    const session = await mongoose.startSession();
    session.startTransaction();

    // do everything || do anything (faz tudo ou não faz nada)

     try{
        //create new user
        const {name, email, password} = req.body;

        const existingUser = await User.findOne({email});

        if(existingUser){
            const error = new Error("User already exists");
            error.statusCode = 409;
            throw error;
        }

        //encode password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

         //pass session as a parameter too in case smth goes wrong -->                  here
        const newUsers = await User.create([{name, email, password: hashedPassword}], {session});

        const token = jwt.sign({userId: newUsers[0]._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success:true,
            message: "user created successfully",
            data:{
                token,
                user: newUsers[0],
            }
        });
    }catch(error){
        //cancel user if error to not get more any trouble
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};

export const signIn = async (req, res, next) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if(!user){
            const error = new Error("User not found");
            error.statusCode(401);
            throw error;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            const error = new Error("Invalid email or password");
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

        res.status(200).json({
            sucess:true,
            message: "User signed-in successfully",
            data:{
                token,
                user,
            }
        });

    }catch(error){
        next(error);
    }
};

export const signOut = async (req, res, next) => {};