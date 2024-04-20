import { User } from "../models/user.model.js";
import {
  changePassswordType,
  loginUserType,
  registerUserType,
  updateProfileType,
} from "../utils/Types.js";


const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        msg: "Invalid user",
      });
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error("error generating accsess and refresh token");
  }
};


const registerUser = async (req, res) => {
  const inputData = req.body;

  if (!inputData.username || !inputData.email || !inputData.password) {
    return res.status(422).json({
      msg: "All field must be require ",
    });
  }

  const parsePayLoad = registerUserType.safeParse(inputData);

  if (!parsePayLoad.success) {
    return res.status(422).json({
      msg: "Please enter valid input",
    });
  }

  const { username, password, email } = parsePayLoad.data;

  const exitedUser = await User.findOne({ username });

  if (exitedUser) {
    return res.status(200).json({
      msg: "User already exists",
    });
  }

  const user = await User.create({ username, password, email });

  //   console.log(user)
  if (!user) {
    return res.status(500).json({
      msg: "Internal server error",
    });
  }

  return res.status(200).json({
    data: user,
    msg: "User created successfullly ",
  });
};


const loginUser = async (req, res) => {
  const inputData = req.body;

  if (!inputData.email || !inputData.password) {
    return res.status(200).json({
      msg: "All field must be require",
    });
  }

  const parsePayLoad = loginUserType.safeParse(inputData);

  if (!parsePayLoad.success) {
    return res.status(422).json({
      msg: "please enter valid input",
    });
  }

  const { email, password } = parsePayLoad.data;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(422).json({
      msg: "User not found",
    });
  }

  const checkPassword = await user.isPasswordCorrect(password);

  if (!checkPassword) {
    return res.status(422).json({
      msg: "Invalid password",
    });
  }

  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(user._id);

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
      accessToken,
      msg: "User loggedin successfully",
    });
};


const logoutUser = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(
    _id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({
      msg: "User logged Out successfully",
    });
};


const changePassword = async (req, res) => {
  const { _id } = req.user;

  const inputData = req.body;

  const parsePayLoad = changePassswordType.safeParse(inputData);

  console.log(parsePayLoad);

  if (!parsePayLoad.success) {
    return res.status(400).json({
      msg: "Please enter valid password",
    });
  }
  const { password } = parsePayLoad.data;

  const user = await User.findById(_id);

  user.password = password;
  user.refreshToken = null;

  await user.save({ validateBeforeSave: false });

  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({
      msg: "Password updated successfully",
    });
};


const updateProfile = async (req, res) => {
  const { _id } = req.user;
  const inputData = req.body;

  const parsePayLoad = updateProfileType.safeParse(inputData);

  if (!parsePayLoad.success) {
    return res.status(400).json({
      msg: "Please enter valid input",
    });
  }

  const { username, email } = parsePayLoad.data;

  let updatableField ={}

  if(username){
    updatableField.username =  username
  }
  if(email){
    updatableField.email = email
  }

  const user = await User.findByIdAndUpdate(
    _id,
    {
      $set:updatableField
    },
    { new: true }
  ).select("-password -refreshToken")


  if(!user){
    return res.status(500).json({
        msg:"Failed to update user"
    })
  }

  return res.status(200).json({
    user,
    msg:"User updated successfully"
  })

};


const getCurrentUser = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findById(_id);

  return res.status(200).json({
    user,
  });
};


export {
  registerUser,
  loginUser,
  logoutUser,
  changePassword,
  getCurrentUser,
  updateProfile,
};
