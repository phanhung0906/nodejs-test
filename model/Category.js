const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
        slug: {
            type: String
        },
        title: {
            type: String
        }
    }
);

module.exports = mongoose.model("Category", categorySchema);