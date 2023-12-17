let mongoose = require("mongoose")
let Schema = mongoose.Schema;

let postSchema = new Schema({
    commentAuthor: {
        type: String,
        required: true,
    },
    commentContent: {
        type: String,
        requierd: true,
    },
    pId: {
        type: mongoose.Schema.Types.ObjectId,
         requierd: true, 
    }
}, {timestamps: true});

let postModel = mongoose.model("Comment", postSchema);

module.exports = postModel;