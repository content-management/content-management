module.exports = {
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
      .create_post([
        params.id,
        body.title,
        body.content,
        body.date,
        body.time,
        body.categories
      ])
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
  }
};
