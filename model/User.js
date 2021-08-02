const mongoose = require("mongoose");
// mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const userSchema = new Schema({
        name: {
            type: String
        },
        email: {
            type: String
        },
        phone: {
            type: String
        }
    }
);

module.exports = mongoose.model("User", userSchema);