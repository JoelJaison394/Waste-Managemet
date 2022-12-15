const {Schema, model} = require("mongoose")

const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        name: {
            type:String,
            required:true,
        },
        role: {
            type:String,
            required:true,
        }
    }, 
    {
        timestamps: true
    }
);

const User = model("User", UserSchema);
module.exports = User;