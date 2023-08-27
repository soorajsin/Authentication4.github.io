const express = require("express");
const userdb = require("../Model/userSchema");
const {
          emit
} = require("nodemon");
const router = new express.Router();
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");



router.post("/register", async (req, res) => {
          // console.log(req.body);
          try {
                    const {
                              name,
                              email,
                              password,
                              cpassword
                    } = req.body;

                    if (!name || !email || !password || !cpassword) {
                              throw Error("Plz fill all details")
                    } else {
                              const checkAlreadyUser = await userdb.findOne({
                                        email: email
                              });

                              if (checkAlreadyUser) {
                                        res.status(422).json({
                                                  error: "Already User"
                                        })
                              } else {
                                        // console.log("done");

                                        if (password !== cpassword) {
                                                  res.status(501).json({
                                                            error: "Password Not Matched"
                                                  })
                                        } else {

                                                  const addData = new userdb({
                                                            name,
                                                            email,
                                                            password,
                                                            cpassword
                                                  });

                                                  const storeData = await addData.save();
                                                  // console.log(storeData);

                                                  res.status(201).json({
                                                            status: 201,
                                                            message: "Successfully Registerd",
                                                            storeData
                                                  })
                                        }
                              }
                    }
          } catch (error) {
                    res.status(500).json({
                              error: "Not Registered",
                              error
                    })
          }
});



//user login
router.post("/login", async (req, res) => {
          // console.log(req.body);

          try {
                    const {
                              email,
                              password
                    } = req.body;

                    if (!email || !password) {
                              throw Error('Please Enter Email And Password');
                    } else {
                              const findUser = await userdb.findOne({
                                        email
                              });
                              if (!findUser) {
                                        return res.status(403).json({
                                                  error: "User Not found"
                                        })
                              } else {
                                        const checkPassword = await bcrypt.hash(password, findUser.password);

                                        if (!checkPassword) {
                                                  return res.status(403).json({
                                                            error: "Password Not Match!"
                                                  })
                                        } else {
                                                  // console.log("done");

                                                  //generate token
                                                  const token = await findUser.getToken();
                                                  // console.log(token);




                                                  //generate cookie with expires time of one day
                                                  const oneDay = 24 * 60 * 60 * 1000; // in milliseconds
                                                  const expirationDate = new Date(Date.now() + oneDay);

                                                  res.cookie("authToken", token, {
                                                            httpOnly: true,
                                                            expires: expirationDate,
                                                            // Other options like secure, maxAge, etc. as needed
                                                  });


                                                  const result = {
                                                            findUser,
                                                            token
                                                  };

                                                  res.status(201).json({
                                                            status: 201,
                                                            message: "Login Successful!",
                                                            result
                                                  })
                                        }
                              }
                    }
          } catch (error) {

          }
});



router.get("/validate", authenticate, (req, res) => {
          // console.log("done");

          const getData = req.getData;


          if (!getData) {
                    res.status(422).json({
                              status: 422,
                              message: "Please provide data to validate!"
                    })
          } else {
                    // console.log(getData);
                    res.status(201).json({
                              status: 201,
                              message: "Validation successful!",
                              getData
                    })
          }
})



module.exports = router;