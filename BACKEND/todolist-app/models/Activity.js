const mongoose = require('../config/db')

const ActivitySchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        default: 0
    },
    detail: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    },
    user: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Activity', ActivitySchema);