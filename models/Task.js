const mongoose = require("mongoose")

const TaskSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'It is must to provide a name!'],
        trim: true,
        maxlength: [20, 'Name can have max length upto 20 characters.']
    },
    completed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model("Task", TaskSchema)