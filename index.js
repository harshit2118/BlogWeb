//jshint esversion:6
const express    = require("express");
const ejs        = require("ejs");
const bodyParser = require("body-parser");
const m_string   = require("lodash");
const mongoose   = require("mongoose");  
const url        = "mongodb://localhost:27017/MyBlogDB";
const path       = require("path");
const fs         = require("fs");
const multer     = require("multer");
const app        = express();

mongoose.connect(url,{ useNewUrlParser:true,useUnifiedTopology:true });
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("local"));

app.set("view engine","ejs");

const home_text    = "Welcome to my DD. If you want to share anything about your self and also want to share your deepest secrets of your life then you can easily share it with DD. DD is your best friend as DD didn't judge you for anything that you have done.";
const contact_text_emial = "hrshtjoshi238@gmail.com";
const contact_text_linkedin = "https://linkedin.com/in/harshit-joshi-5a5782149";
const contact_text_github = "https://github.com/harshit2118";

//Set Storage engine
const storage = multer.diskStorage({
    destination: "local/uploads",
    filename : (req,file,cb)=>{
        cb(null,file.fieldname +"-"+Date.now()+"-"+path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
}).single("hello");

//Creating Schema for our blogDB
blogSchema = new mongoose.Schema({
    Title : {
        type : String,
        required : [true,"Title is not inserted"]
    },
    blogPost : {
        type : String,
        required : [true,"Blog is not inserted"]
    }
    /*img :{
        data: Buffer,
        contentType: String
    }*/
});

//Creating model for our Schema
const Blog = new mongoose.model("Blog",blogSchema);

app.get("/",(req,res)=>{

    Blog.find({},(err,posts)=>{
        if(err){
            console.log("Blog not found!!!");
        }
        else{
            res.render("home",{
                homeText : home_text,
                posts  :posts
            });
        }
    });
});

app.get("/contact",(req,res)=>{
    res.render("contact",{
        mail : contact_text_emial,
        lidi : contact_text_linkedin,
        ghub : contact_text_github 
    });
});

app.get("/about",(req,res)=>{
    res.render("about");
});

app.get("/compose",(req,res)=>{
    res.render("compose");
});
app.get("/post/:t1",(req,res)=>{
    const postID = req.params.t1; 
    Blog.findOne({_id:postID},(err,posts)=>{
        if(err){
            console.log(err);
        }
        else{
                res.render("post",{
                    Title : posts.Title,
                    blogPost : posts.blogPost
                });
        }
    });
});

//Post Requests
app.post("/compose",(req,res)=>{
    upload(req,res,(err)=>{
        if(!err){
            console.log(req.file);
        }
    });
    const post_blog_text = Blog({
        Title : req.body.blog_title,
        blogPost  : req.body.blog_post
    });
    post_blog_text.save((err)=>{
        if(err){
            console.log(err);
        }
    });
    res.redirect("/");
});




//Establishing server at port 3000
app.listen("3000",() => {
        console.log("server is running in port 3000");
    });