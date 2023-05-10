const {Schema, model} = require("mongoose");

const userModel = new Schema({
    username: {
        type: Schema.Types.String
    },
    age: {
        type: Schema.Types.Number
    },
    hobbies: {
        type: Schema.Types.Array
    },
})

module.exports = model("user", userModel);