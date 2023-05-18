import Task from "../models/task.js"
import { CreateError } from "../utils/CreateError.js"

///////////////////////////////////////////
export const createTask = async (req, res, next) => {

    try {
        const { title, desc } = req.body
        if (!title || !desc)
            return next(CreateError(400, "Please enter all fields"))

        await Task.create({
            title, desc, userId: req.userId, todoId: req.userId + Date.now()
        })
        res.status(200).json({ message: "task created", success: true })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error" })


    }
}
////////////////////////////////
///////////////////////////////////////
////////////////////////////////////////////
export const getMyTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({ userId: req.userId })
        if (!tasks || tasks.length === 0) return res.status(400).json({ message: "No tasks found , create a todo first" })
        res.status(200).json({ tasks, success: true })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error" })
    }

}
///////////////////////////////////////////////
//////////////////////////////////////////
///////////////////////////////////

export const deleteTask = async (req, res, next) => {

    const { id } = req.params

    try {
        if (!id) return res.status(400).json({ message: "Please enter all fields" })
        const task = await Task.findOne({ todoId: id });
        if (!task) return res.status(400).json({ message: "No  such task found" })
        const taskId = task.userId;
        if (taskId !== req.userId) return res.status(400).json({ message: "Not authorized to delete this todo" })
        const isDeleted = await Task.deleteOne({ todoId: id });

        if (!isDeleted || isDeleted === 0) return res.status(400).json({ message: "problem in deleting this todo" })
        return res.status(200).json({ message: "task deleted", success: true })

    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}
////////////////////////////////////
//////////////////////////////////////////
///////////////////////////////////////////////
export const updateTask = async (req, res, next) => {
    const { id } = req.params
    try {
        const task = await Task.findOne({ todoId: id })
        if (!task) return res.status(400).json({ message: "No such task found" })
        const taskId = task.userId;
        if (taskId !== req.userId) return res.status(400).json({ message: "Not authorized to update this task" })

        task.isCompleted = !task.isCompleted
        await task.save()
        return res.status(200).json({ message: "task updated", success: true })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }

}
///////////////////////////////////////////////////
/////////////////////////////////////////////
////////////////////////////////////////