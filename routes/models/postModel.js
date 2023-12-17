let mongoose = require("mongoose")
let Schema = mongoose.Schema;

let postSchema = new Schema({
    loginUsername: {
        type: String,
        required: true,
    },
    loginPassword: {
        type: String,
        requierd: true,
    },
});

let postModel = mongoose.model("postModel", postSchema);

module.exports = postModel;