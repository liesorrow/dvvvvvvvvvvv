let express = require("express")
let router = express.Router()
let {
   
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
    deleteComment
} = require('../controllers/postControllers')



router.get('/',(req,res)=>{
    let page_parameters = {title: "blog", page_title: "My Blog", style: "/styles/stileBlog.css"}
    res.render("index",{page_parameters});
})


router.get('/blog', getPost)

router.get('/posts', getPosts)

router.get('/post/:postId', getPostById)

router.get('/editPosts/:Id', getEditPostById)

router.get('/editComments/:Id', getEditCommentsById)

router.get('/createComment/:Id', getCreateCommentById)

router.post('/blog', addPost)

router.post('/createComment/:postId', addComment)

router.put('/editPosts/:Id', editPost);

router.put('/editComments/:Id', editComment);

router.delete('/posts/:Id', deletePost);

router.delete('/post/:Id', deleteComment);

module.exports = router;