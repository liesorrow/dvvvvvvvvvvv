let express = require("express")
let app = express();
let path = require("path");
let mongoose = require("mongoose")
let methodOverride = require("method-override")
let postRouts = require('./routes/blogRoutes.js')

require("dotenv").config()
let db = process.env.MONGO_URL;
let PORT = process.env.PORT;

let createPath = (page) => path.join(__dirname, "views", `${page}.html`);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: false}))
app.use(methodOverride("_method"))
app.use(postRouts)

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");



async function start() {
    try {
    await mongoose.connect(db)
    .then((res)=>console.log("connected to Mongodb"))
    app.listen(PORT, ()=>{
        console.log(`Server start http//localhost: ${PORT}`)
    })
    } catch (error) {
    console.log(error);
    }}
    start();
    