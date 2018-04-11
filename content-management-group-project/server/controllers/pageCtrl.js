module.exports = {
  getPages: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { params } = req;

    dbInstance
      .get_pages([params.id])
      .then(pages => res.status(200).json(pages))
      .catch(err => res.status(500).console.log(err));
  },
  getPage: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { params } = req;

    dbInstance
      .get_page([params.id])
      .then(page => res.status(200).json(page))
      .catch(() => res.status(500).json());
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