import mongoose from "mongoose";

let isConnected = false;

export const connectDb = async ()=>{
    mongoose.set('strictQuery', true);
    if (isConnected){
        console.log('Mongoose is already connected');
    }
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017",{
            dbName:"Test-User"
        })
        isConnected=true;
        console.log('MongoDB connected!');
    } catch (error) {
        console.log('error');
    }
}