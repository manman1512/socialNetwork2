const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = (req, res, next) => {
  const authorization = req.headers["authorization"];
  const noSecurePath = ["/api/posts/getAllPost", "/api/posts/getPostById/*", "/api/categories", "/api/posts/getposts"]
  // console.log(new RegExp("/api/posts/like-post").test(req.path));
  const matches = noSecurePath.filter(pattern => {
    return new RegExp(pattern).test(req.path)
  })
  if(matches.length > 0 && req.method === "GET"){
    return next();
  }else{
    if (authorization) {
      // console.log("🚀 ~ file: middleware.js ~ line 14 ~ authorization", authorization)
      const token = authorization.split(" ")[1];
      // console.log("🚀 ~ file: middleware.js ~ line 8 ~ token", token)
      try {
        req.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // [afsmnf,fsfnafnj374]
        // console.log(req.user);
        next();
      } catch (error) {
        console.log(error);
        return res
          .status(400)
          .json({ success: false, message: "Token sai hoac het han!" });
      }
    } else{
      return res
          .status(400)
          .json({ success: false, message: "Authorization undefined!" });
    }

  }
  // console.log("🚀 ~ file: middleware.js ~ line 6 ~ authorization", authorization)
  
};
