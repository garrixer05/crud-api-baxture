import mongoose from "mongoose";
const {Schema, model, models} = mongoose;
const userSchema = new Schema({
    username:{
        type:String,
        required:[true,'Username is required']
    },
    age:{
        type:Number,
        required:[true, 'Age is required']
    },
    hobbies:{
        type:Array,
        required:[true, 'hobbies are required']
    }
});
const userModel = models.user || model('User', userSchema);
export default userModel;