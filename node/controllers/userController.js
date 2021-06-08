const User = require('../models/user');
const CustomError = require('../models/customError');



const editUserByID = async (req, res, next) => {
  console.log(req.body)
  const id = req.params.id;
  let user;
  user =  await User.findOne({id});
  if(user){
    console.log(`User ${id} Found`);
  }
  else{
      return next(new CustomError(404, 'Not Found'))
  }
  if(req.body){
    user.userName = req.body.userName;
    user.email = req.body.email;
    user.city = req.body.city;
    if(req.file){
      user.profilePicture = req.file.filename;
    }
    else{
      user.profilePicture = req.body.profilePicture;
    }
  }
  else{
    return next(new CustomError(404, 'Not Found'))
}
await user.save();
res.send('user-Updated');

};

const getCurrentUser = async (req, res, next) => {
  res.send(req.user);
};

const deleteUserByID = async (req, res, next) => {
  User.findOneAndDelete(
    {
      id: req.params.id,
    },
    function (err, user) {
      if (err || !user) {
        next(new CustomError(404, 'User not Found'));
        return;
      }
      res.send(`User ID : ${user.id} is successfully Deleted`);
    }
  );
};

const getAllUsers = async (req, res, next) => {
  res.send(
    await User.find({
      userName: { $regex: req.query.name_like, $options: 'i' }, //i : case insensitive
    })
  );
};

const getUserDetailsByID = async (req, res, next) => {
  res.send(await User.findOne({ id: req.params.id }));
};

const register = async (req, res, next) => {
  // TODO: Validate req body data.
  const { userName, email, profilePicture, city } = req.body;
  const existentUser = await User.findOne({ email }).catch(() => {
    return next(CustomError(500, 'internal error'));
  });
  if (existentUser) {
    next(new CustomError(400, 'email already exists'));
    return;
  }
  const user = new User({ userName, email, profilePicture, city });
  user.profilePicture = req.file.filename;
  await user.save()
  res.send('user added successfully');
};

const login = async (req, res, next) => {
  // TODO: Validate.
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    next(new Error('Incorrect email'));
    return;
  }
  const isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword) {
    next(new Error('Incorrect password'));
    return;
  }
  const expiryDate = new Date(Date.now() + 14 * 24 * 3600 * 1000);
  const token = new Token({ userId: user._id, expiryDate });
  await token.save().catch(() => {
    throw new CustomError(500, 'internal error');
  });
  res.cookie('token', token._id, { expires: expiryDate, httpOnly: true });
  res.send(user);
};

const logout = async (req, res, next) => {
  const tokenId = req.cookies.token;
  await Token.findOneAndRemove({ _id: tokenId }).catch(() => {
    throw new CustomError(500);
  });
  res.clearCookie('token');
  res.send('logged out successfully');
};

module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
  getAllUsers,
  getUserDetailsByID,
  deleteUserByID,
  editUserByID
};
