const {Schema, model} = require("mongoose")

const UserInputSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        materials: {
            type: String,
            required: true,
        },
        recyclable: {
            type: String,
            required: true,
        },
        reuseable: {
            type: String,
            required: true,
        },
        phonenumber: {
            type: Number,
            required:true,
        },
        address: {
            type:String,
            required:true,
        },
        complete: {
            type: Boolean,
            default: false,
        }
    }, 
    {
        timestamps: true
    }
);

const UserInput = model("UserInput", UserInputSchema);
module.exports = UserInput;