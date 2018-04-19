require('dotenv').config();
const express = require("express");
const session = require("express-session");
const { json } = require("body-parser");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const bodyParser = require("body-parser");
const cors = require("cors");
const massive = require("massive");
const path = require("path");
const Bundler = require("parcel-bundler");

const poc = require(`${__dirname}/controllers/postCtrl`);
const pac = require(`${__dirname}/controllers/pageCtrl`);
const bc = require(`${__dirname}/controllers/blogCtrl`);



const port =  3001;

const app = express();

const {
  CONNECTION_STRING,
  DOMAIN,
  CLIENT_ID,
  CLIENT_SECRET,
  SESSION_SECRET
} = process.env;

//Connect to database
massive(CONNECTION_STRING)
  .then(db => {
    // console.log(db);
    app.set("db", db);
  })
  .catch(console.log);

app.use(bodyParser.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(json());
app.use(cors());

// USED FOR SERVING PRODUCTION FILES!!!!!
app.use(express.static(`${__dirname}/../build/`)); // CREATES AN OPTIMIZED
// BUNDLE OF BUILD FOLDER

//sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 10000000000 * 10000
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());


  passport.use(
    new Auth0Strategy(
    {
      domain: process.env.DOMAIN,
      clientSecret: process.env.CLIENT_SECRET,
      clientID: process.env.CLIENT_ID,
      scope: "openid profile",
      callbackURL: "/login"
    },
    (accessToken, refreshToken, extraParams, profile, done) => {
      console.log('profileid', profile.id);
      app
        .get("db")
        .getUserByAuthId([profile.id])
        .then(response => {
          if (!response[0]) {
            app
              .get("db")
              .createUserByAuthId([profile.id, profile.displayName])
              .then(created => done(null, created[0]));

          } else {
            return done(null, response[0]);
          }
        });
    }
  )
  );


passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.get(
  "/login",
  passport.authenticate("auth0", {
    failureRedirect: "www.contentum.now.sh/#/"
  }),
  function (req, res) {
    res.redirect(`contentum.now.sh/#/pickblog/${req.user.name}`);
  }
);

app.get("/api/me", (req, res) => {
  if (req.user) res.status(200).json(req.user);
  else res.status(500).json({ message: "Please Login" });
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("`http://localhost:3000/#/`");
  });
});


//EndPoints
//change user name
app.put("/api/changeName/:id", bc.changeName);

//get blogs
app.get("/api/blogs/:id", bc.getBlogs);
app.post("/api/blog/:id", bc.createBlog); //create blog
app.delete("/api/deleteblog/:id", bc.deleteBlog); //delete post


//get posts
app.get("/api/posts/:id", poc.getPosts); //Get All Post
app.get("/api/post/:id", poc.getPost); //Get One Post
app.post("/api/post/:id", poc.createPost); //create post
app.put("/api/put/:id", poc.updatePost); //update post
app.delete("/api/delete/:id", poc.deletePost); //delete post

//get pages
app.get("/api/pages/:id", pac.getPages);
app.get("/api/page/:id", pac.getPage);
app.put("/api/updatePage/:id", pac.updatePage); //update page
app.post("/api/newPage/:id", pac.createPage); //create page
app.delete("/api/deletePage/:id", pac.deletePage); //delete page



// app.post("/api/Subject", getSubject);


let bundler = new Bundler("src/index.html");

app.use(bodyParser.json());

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.use(bundler.middleware());

app.listen(port, () => {
  console.log(`We Live Baby!! ${port}`);
  console.log('domain', DOMAIN);
  console.log('secret', SESSION_SECRET)
  console.log('client secret', CLIENT_SECRET)
  console.log('client id', CLIENT_ID)

});
