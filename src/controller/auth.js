const asyncHander = require("../util/asyncHandler");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../util/errorResponse");
const User = require("../model/user");
//CONFIRM ACCOUNT
exports.confirmAccount = asyncHander(async (req, res, next) => {
  const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
 
  const isExist = await User.findById(decoded.id);
  console.log(isExist);
  if (!isExist) {
    return next(
      new ErrorHandler(
        "token is invalid or account dose not exist. please try to register again",
        400
      )
    );
  } else {
    try {
      if (isExist.confirmed) {
        return next(new ErrorHandler("Account have confirmed before", 400));
      } else {
        const user = await User.findByIdAndUpdate(
          { _id: decoded.id },
          { confirmed: true }
        );
        if (user) {
          res.redirect("http://localhost:3000/login");
        }
      }
    } catch (error) {
      return next(
        new ErrorHandler("error accure while confirming your account", 400)
      );
    }
  }
});
// USER LOGIN
exports.login = asyncHander(async (req, res, next) => {
  const { userName, password } = req.body;
  //validating userName and passcode (not empty)
  if (!userName || !userName) {
    res.status(400).json({
      message: "please provide  username and password",
    });
  }
  //validationg if userName exist in database
  const user = await User.findOne({ userName }).select("+password");
  if (!user) {
    res.status(401).json({
      message: "please provide  username and password",
    });
  }
  if (!user.confirmed) {
    res.status(401).json({
      message: "your account is not confirmed yet",
    });
  }
  //comparing enterd passcode with from databse
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    res.status(401).json({
      message: "invalid credentials",
    });
  }
  //SENDING JWT INTO COOKIE
  sendTokenResponse(user, 200, res);
});
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJWT();
  const role = user.role;
  const email = user.email;
  const names = user.name;
  const userId=user._id;
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  //ENABLELING HTTPS ONLY IN PRODUCTION
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    role,
    email,
    names,
    userId,
  });
};
