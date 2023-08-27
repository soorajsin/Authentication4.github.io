const jwt = require("jsonwebtoken");
const keysecret = "jkjhgtfrdefytikjhgfvcdftyui";
const userdb = require("../Model/userSchema");



const authenticate = async (req, res, next) => {
          try {
                    const token = await req.headers.authorization;
                    // console.log(token);

                    if (!token) {
                              res.status(422).json({
                                        error: "Token not get authenticate"
                              })
                    } else {
                              const tokenverify = jwt.verify(token, keysecret);
                              // console.log(tokenverify);


                              //get complete data
                              const getData = await userdb.findOne({
                                        _id: tokenverify._id
                              });
                              // console.log(getData);

                              if (!getData) {
                                        res.status(422).json({
                                                  error: "User Not Found"
                                        })
                              } else {
                                        req.getData = getData;
                                        next();
                              }
                    }

          } catch (error) {
                    // Handle other errors if needed
                    res.status(500).json({
                              error: "Internal server error"
                    });
          }
}

module.exports = authenticate;