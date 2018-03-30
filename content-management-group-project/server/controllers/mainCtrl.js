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

// module.exports = {
//   getSubject: getSubject
// };
