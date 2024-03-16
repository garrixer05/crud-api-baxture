import {Types, isObjectIdOrHexString} from "mongoose";
import { connectDb } from "../db/database.js";
import userModel from "../model/userModel.js";



export async function getUser(req,res) {
    try {
        const {userID} = req.params;
        if(!isObjectIdOrHexString(userID)){
            return res.status(400).send({"message":"Not a valid user ID"})
        }
        const oid = new Types.ObjectId(userID);
        const user = await userModel.findById(oid);
        return res.status(201).send({"user":user})
    } catch (error) {
        console.log(error);
    }
}
export async function getAllUsers(req, res) {
    try {
        const users = await userModel.find({});
        return res.status(201).send({"users":users})
    } catch (error) {
        console.log(error);
    }
}
export async function addUser(req, res) {
    try {
        const {username, age, hobbies} = req.body;
        
        if (!username || !age || !hobbies){
            return res.status(400).send("Username, age and hobbies are required!")
        }
        const newUser = {
            "username":username,
            "age":age,
            "hobbies":hobbies
        }
        await userModel.create(newUser);
        return res.status(201).send({"user":newUser});
    } catch (error) {
        console.log(error);
    }
}
export async function updateUser(req, res){
    
}
export async function deleteUser(){
}