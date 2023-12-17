let Loginform = require("../models/postModel.js")
let Post = require("../models/postModel1.js")
let Comment = require("../models/commentModel.js")
let mongoose = require("mongoose")
let page_parameters;


let getPost = (req,res)=>{
    page_parameters = {title: "blog", page_title: "blog", style: "/styles/stilePost.css"} 
    res.render("blog",{page_parameters});
}

let getPosts = (req,res)=>{
    page_parameters = {title: "posts", page_title: "posts", style: "/styles/stilePost.css"}
    
    Post.find()
    .then((post)=>res.render("posts",{page_parameters,posts:post}))
    .catch((error)=>console.log(error))
}

let getPostById = (req,res)=>{
    page_parameters = {title: "post", page_title: "post", style: "/styles/stilePost.css"}
    let id = req.params.postId;

    Promise.all([
        Post.findById(id),
        Comment.find({ pId: id })
    ])
    .then(([post, comments]) => {
        res.render("post", { page_parameters, post, comments });
    })
    .catch((error) => {
        console.log(error);
        res.status(500).send('Internal Server Error');
    });
}

let getEditPostById = (req, res) => {
    page_parameters = {title: "Edit post", page_title: "Edit post", style: "/styles/stilePost.css"}
    let id = req.params.Id;
    Post.findById(id)
    .then((post) =>
    res.render("editPosts", {page_parameters, postTitle: post.postTitle, postAuthor: post.postAuthor, postContent: post.postContent, id:
    post._id, post })
    )
    .catch((error) => {
        console.log(error);
        res.render("error");
    });
}

let getEditCommentsById = (req, res) => {
    page_parameters = {title: "Edit comment", page_title: "Edit comment", style: "/styles/stilePost.css"}
    let id = req.params.Id;
    Comment.findById(id)
    .then((comment) =>
    res.render("editComments", {page_parameters, commentAuthor: comment.commentAuthor, commentContent: comment.commentContent, id:
    comment._id, comment })
    )
    .catch((error) => {
        console.log(error);
        res.render("error");
    });
}


let getCreateCommentById = (req,res)=>{
    page_parameters = {title: "Comment", page_title: "Comment", style: "/styles/stilePost.css"} 
    res.render("createComment",{page_parameters});
}


let addPost = (req,res)=>{
    page_parameters = {title: "blog", page_title: "blog", style: "/styles/stilePost.css"}
    const {postAuthor, postTitle, postContent} = req.body;
    const post = Post({postAuthor, postTitle, postContent})
    post.save()
    .then((result)=>res.redirect("posts"))
    .catch((error)=>console.log(error))
}

let addComment = (req,res)=>{
    page_parameters = {title: "Comment", page_title: "Comment", style: "/styles/stilePost.css"}
    const pId = new mongoose.Types.ObjectId(req.params.postId);
    const {commentAuthor, commentContent} = req.body;
    const comment = Comment({commentAuthor, commentContent, pId})
    comment.save()
    .then((result)=>res.redirect(`/post/${pId}`))
    .catch((error)=>console.log(error));
}

let editPost = (req,res)=>{
    let id = req.params.Id;
    const {postAuthor, postTitle, postContent} = req.body;
    Post.findByIdAndUpdate(id, {postAuthor, postTitle, postContent})
    .then(()=>res.redirect("/posts"))
    .catch((error)=>console.log(error));
}

let editComment = (req,res)=>{
    let id = req.params.Id;
    const {commentAuthor, commentContent} = req.body;
    Comment.findByIdAndUpdate(id, {commentAuthor, commentContent})
    .then((comment)=>{ let postId = new mongoose.Types.ObjectId(comment.pId)
        res.redirect(`/post/${postId}`)
    })
    
    .catch((error)=>console.log(error));
}

let deletePost = (req,res)=>{
    page_parameters = {title: "posts", page_title: "posts", style: "/styles/stilePost.css"}
    let id = req.params.Id;
    Promise.all([
        Post.findByIdAndDelete(id),
        Comment.deleteMany({ pId: id })
    ])
    .then(([post, comments]) => {
        res.render("posts", { page_parameters, post, comments });
    })
    .catch((error) => {
        console.log(error);
        res.status(500).send('Internal Server Error');
    });
    // Post.findByIdAndDelete(id)
    // .then((post)=>res.render("/posts", page_parameters, post))
    // .catch((error)=>console.log(error));
}

let deleteComment = (req,res)=>{
    page_parameters = {title: "post", page_title: "post", style: "/styles/stilePost.css"}
    let id = req.params.Id;
    Comment.findByIdAndDelete(id)
    .then((comment)=>res.render(`/post/${id}`, page_parameters, comment))
    .catch((error)=>console.log(error));
}

module.exports = {
    
    getPost,
    getPosts,
    getPostById,
    getEditPostById,
    getEditCommentsById,
    getCreateCommentById,
   
    addPost,
    addComment,
    editPost,
    editComment,
    deletePost,
    deleteComment,
};