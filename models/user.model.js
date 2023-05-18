import mongoose from 'mongoose'

const { Schema } = mongoose;


const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    image: {
        type: String,
        required: false
    }
},
    {
        timestamps: true
    }
)

const User = mongoose.model("User", UserSchema)
export default User;