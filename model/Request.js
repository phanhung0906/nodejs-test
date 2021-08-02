const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const News = require("./News")

const requestSchema = Schema({
    receiveUserId: {
        type: Schema.Types.ObjectId,
        ref: 'News'
    },
    senderName:{
        type: String,
    },
    senderEmail:{
        type: String,
    },
    senderPhone: {
        type: String,
    },
    code: {
        type: String,
    },
    supportCount: {
        type: Number,
    },
    note: {
        type: String,
    },
    type: {
        type: Number,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    },
    status: {
        type: Number,
    },
    viewAt:{
        type: Date,
        default: Date.now(),
    }
});


module.exports = mongoose.model("Request", requestSchema);