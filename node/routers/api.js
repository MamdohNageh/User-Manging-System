const express = require('express');
const userRouter = require('./user');
const {
  getAllUsers,
  getUserDetailsByID,
  deleteUserByID,
  editUserByID
} = require('../controllers/userController');
const multer = require("multer");
const apiRouter = express.Router();
const path = "./uploads";


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, path);
  },
  filename: (req, file, cb) => {
      cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
  } else {
      cb("Type file is not access", false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: 1024 * 1024 * 5
});

apiRouter.use('/user', userRouter);
apiRouter.get('/users', getAllUsers);
apiRouter.get('/users/:id', getUserDetailsByID);
apiRouter.delete('/users/:id', deleteUserByID);
apiRouter.put('/users/:id',upload.single("profilePicture") ,editUserByID)

module.exports = apiRouter;
