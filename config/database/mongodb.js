import mongoose from "mongoose";
import { DB_URI } from "../env";

if(!DB_URI){
    throw new Error('Please define MONGODB_URI environment variable inside env.<development/production>.local');
}

const connectToDatabase = async () => {
    try{
        await mongoose.connect(DB_URI);
    }catch(error){
        console.error('Error connecting to the database: ', error);
        process.exit(1);
    }
}

export default connectToDatabase;