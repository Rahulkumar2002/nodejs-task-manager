const { getAllTasks, createTask, updateTask, getTask, deleteTask } = require("../controllers/tasks")
const router = require("express").Router()

router.get("/", getAllTasks)
router.post("/", createTask)
router.get("/:id", getTask)
router.patch("/:id", updateTask)
router.delete("/:id", deleteTask)

module.exports = router 