//require packages
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const bodyParser = require("body-parser");
const cors = require("cors");
const massive = require("massive");
const path = require("path");

const mc = require(`${__dirname}/controllers/mainCtrl`);

const port = 3001;

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

// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

//sessions
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 10000000000
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new Auth0Strategy(
    {
      domain: DOMAIN,
      clientSecret: CLIENT_SECRET,
      clientID: CLIENT_ID,
      scope: "openid profile",
      callbackURL: "/login"
    },
    (accessToken, refreshToken, extraParams, profile, done) => {
      console.log("1.", accessToken, "2.", refreshToken, "3.", extraParams, "4.", profile);
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
    failureRedirect: "http://localhost:3000/#/"
  }),
  (req, res) => {
    res.redirect(`http://localhost:3000/#/pickblog/${req.user.name}`);
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

//get blogs
app.get("/api/blogs/:id", mc.getBlogs);
app.post("/api/blog/:id", mc.createBlog); //create blog
app.delete("/api/deleteblog/:id", mc.deleteBlog); //delete post


//get posts
app.get("/api/posts/:id", mc.getPosts); //Get All Post
app.get("/api/post/:id", mc.getPost); //Get One Post
app.post("/api/post/:id", mc.createPost); //create post
app.put("/api/put/:id", mc.updatePost); //update post
app.delete("/api/delete/:id", mc.deletePost); //delete post

//get pages
app.get("/api/pages/:id", mc.getPages);
app.put("/api/updatePage/:id", mc.updatePage); //update page
app.post("/api/newPage/:id", mc.createPage); //create page
app.delete("/api/deletePage/:id", mc.deletePage); //delete page



// app.post("/api/Subject", getSubject);

app.listen(port, () => {
  console.log(`We Live Baby!! ${port}`);
});
