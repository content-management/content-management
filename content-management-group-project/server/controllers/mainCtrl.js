const axios = require("axios");

// example get:
// const getSubject = (req, res, next) => {
//   console.log("params", req.params);
//   console.log("body", req.body);
//   axios
//     .get(
//       "http://openlibrary.org/subjects/" +
//         req.body.temp123 +
//         ".json?details=true"
//     )
//     .then(response => {
//       res.json(response.data);
//     })
//     .catch(console.log);
// };

module.exports = {
  getBlogs: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { params } = req;

    dbInstance
      .get_blogs([params.id])
      .then(blogs => res.status(200).json(blogs))
      .catch(err => res.status(500).console.log(err));
  },
  //create new blog
  createBlog: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { params, body } = req;

    dbInstance
      .create_blog([params.id, body.name])
      .then(() => res.status(200).json())
      .catch(() => res.status(500).json());
  },
  deleteBlog: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { params } = req;
    console.log(params);
    dbInstance
      .delete_blog([params.id])
      .then(() => res.status(200).json())
      .catch(err => console.log(err));
  },
  //all posts
  getPosts: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { params } = req;

    dbInstance
      .get_posts([params.id])
      .then(posts => res.status(200).json(posts))
      .catch(() => res.status(500).json());
  },
  //one post
  getPost: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { params } = req;

    dbInstance
      .get_post([params.id])
      .then(post => res.status(200).json(post))
      .catch(() => res.status(500).json());
  },
  // create a post
  createPost: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { params, body } = req;

    dbInstance
      .create_post([params.id, body.title, body.content, body.date, body.time])
      .then(() => res.status(200).json())
      .catch(err => res.status(500).console.log(err)); //.json());
  },
  updatePost: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { params, body } = req;

    dbInstance
      .update_post([params.id, body.title, body.content])
      .then(() => res.status(200).json())
      .catch(() => res.status(500).json());
  },
  deletePost: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { params } = req;

    dbInstance
      .delete_post([params.id])
      .then(() => res.status(200).json())
      .catch(() => res.status(500).json());
  },
  getPages: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { params } = req;

    dbInstance
      .get_pages([params.id])
      .then(pages => res.status(200).json(pages))
      .catch(err => res.status(500).console.log(err));
  },
  updatePage: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { params, body } = req;

    dbInstance
      .update_page([params.id, body.pageName, body.content])
      .then(() => res.status(200).json())
      .catch(() => res.status(500).json());
  },
  deletePage: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { params } = req;

    dbInstance
      .delete_page([params.id])
      .then(() => res.status(200).json())
      .catch(() => res.status(500).json());
  },
  createPage: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { params, body } = req;
    console.log(body);
    dbInstance
      .create_page([params.id, body.name])
      .then(() => res.status(200).json())
      .catch(() => res.status(500).json());
  }
};
