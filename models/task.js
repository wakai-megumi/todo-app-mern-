import mongoose from 'mongoose'

const { Schema } = mongoose;


const taskSchema = new Schema({
    todoId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        required: false
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    }
)

const Task = mongoose.model("tasks", taskSchema)
export default Task;