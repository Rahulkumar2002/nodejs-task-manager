const asyncWrapper = require("../middleware/async")
const Task = require("../models/Task")

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({})
    res.status(200).json({ tasks })
})

const createTask = asyncWrapper(async (req, res) => {
    const task = new Task(req.body)
    const savedTask = await task.save()
    res.status(201).json({ savedTask })
})

const getTask = asyncWrapper(async (req, res, next) => {
    // const task = await Task.findById(req.body.id) // Also works perfectly.
    const { id: taskID } = req.params
    const task = await Task.findOne({ _id: taskID })
    if (!task) {
        const error = new Error('Not Found')
        error.status = 404
        return next(error)
        return res.status(404).json(`Task not found with id : ${taskID} .`)
    } else {
        res.status(200).json({ task })
    }
})
const updateTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, { new: true, runValidators: true })
    res.status(200).json({ task })
})
const deleteTask = asyncWrapper(async (req, res) => {
    // await Task.findByIdAndDelete(req.params.id)
    const { id: taskID } = req.params
    const task = await Task.findOneAndDelete({ _id: taskID })
    if (!task) {
        return res.status(404).json({ msg: `No task with taskID:${taskID} is found.` })
    } else {
        res.status(200).json({
            msg: `Your task with id:${taskID} is deleted.`,
            taskContent: task
        })
    }
})

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask }