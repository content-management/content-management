module.exports = {
  blogLanguage: "English",
  postCounter: 27,
  getBlogs: (req, res, next) => {
    const dbInstance = req
      .app
      .get("db");
    const {params} = req;

    dbInstance
      .get_blogs([params.id])
      .then(blogs => res.status(200).json(blogs))
      .catch(err => res.status(500).console.log(err));
  },
  //create new blog
  createBlog: (req, res, next) => {
    const dbInstance = req
      .app
      .get("db");
    const {params, body} = req;

    dbInstance
      .create_blog([params.id, body.name])
      .then(() => res.status(200).json())
      .catch(() => res.status(500).json());
  },

  deleteBlog: (req, res, next) => {
    const dbInstance = req
      .app
      .get("db");
    const {params} = req;
    console.log(params);
    dbInstance
      .delete_blog([params.id])
      .then(() => res.status(200).json())
      .catch(err => console.log(err));
  },
  changeName: (req, res, next) => {
    const dbInstance = req
      .app
      .get("db");
    // console.log("this", req.user);
    req.user.name = req.body.name;
    const {params, body} = req;
    // console.log(params.id, body);
    dbInstance
      .change_user_name([params.id, body.name])
      .then(() => res.status(200).json())
      .catch(err => console.log(err));
  }
};