//jshint esversion:6
const express    = require("express");
const ejs        = require("ejs");
const bodyParser = require("body-parser");
const m_string   = require("lodash");
const app        = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("local"));

app.set("view engine","ejs");

const home_text    = "Welcome to my DD. If you want to share anything about your self and also want to share your deepest secrets of your life then you can easily share it with DD. DD is your best friend as DD didn't judge you for anything that you have done.";
const about_text   =  "DD is your personal online diary or blog where you can write about your self daily. DD is a standalon project which is developed by <b>Harshit Joshi</b> as it web development projects. ";
const contact_text_emial = "hrshtjoshi238@gmail.com";
const contact_text_linkedin = "https://linkedin.com/in/harshit-joshi-5a5782149";
const contact_text_github = "https://github.com/harshit2118";
const my_posts     = [];

app.get("/",(req,res)=>{
    res.render("home",{
        homeText : home_text,
        my_posts  :my_posts
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
    res.render("about",{
        aboutText : about_text
    });
});
app.get("/compose",(req,res)=>{
    res.render("compose",{
        
    });
});
app.get("/post/:t1",(req,res)=>{
    my_posts.forEach(x=>{
        if(m_string.lowerCase(x.title)===m_string.lowerCase(req.params.t1)){
            res.render("post",{
                title : x.title,
                post : x.body
            });
        }
    });
});
//Post Requests
app.post("/compose",(req,res)=>{
    const post_blog_text = {
        title : req.body.blog_title,
        body  : req.body.blog_post
    };
    my_posts.push(post_blog_text);
    res.redirect("/");
});




//Establishing server at port 3000
app.listen("3000",() => {
        console.log("server is running in port 3000");
    });