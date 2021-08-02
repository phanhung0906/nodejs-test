const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User")
const Category = require("./Category")

const newsSchema = new Schema({
    content: {
            type: String
        },
    is_crawl: {
            type: Boolean
        },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    code: {
        type: String
    },
    title: {
        type: String
    },
    slug: {
        type: String
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }
    }
);

module.exports = mongoose.model("News", newsSchema);