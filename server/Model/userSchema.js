const mongoose = require("mongoose");
const validator = require("validatorjs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keysecret = "jkjhgtfrdefytikjhgfvcdftyui";



const userSchema = mongoose.Schema({
          name: {
                    type: String,
                    required: true
          },
          email: {
                    type: String,
                    unique: true,
                    required: true,
                    validator(value) {
                              if (!validator.Email("@")) {
                                        throw Error("Invalid Email")
                              }
                    }

          },
          password: {
                    type: String,
                    minlength: 6,
                    required: true
          },
          cpassword: {
                    type: String,
                    minlength: 6,
                    required: true,
          },
          tokens: [{
                    token: {
                              type: String,
                              required: true
                    }
          }]
});


//hash password
userSchema.pre('save', async function (next) {
          const user = this;

          if (user.isModified('password')) {
                    user.password = await bcrypt.hash(user.password, 12);
                    user.cpassword = await bcrypt.hash(user.cpassword, 12);

          }

          next();

})



//generate token
userSchema.methods.getToken = async function () {
          const user = this;
          const token = jwt.sign({
                    _id: user._id.toString()
          }, keysecret);
          user.tokens = user.tokens.concat({
                    token
          });
          await user.save();
          return token;

}



const userdb = mongoose.model("users", userSchema);
module.exports = userdb;