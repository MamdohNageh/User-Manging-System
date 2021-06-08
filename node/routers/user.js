const express = require('express');
const { getCurrentUser, register, logout, login } = require('../controllers/userController');
const checkAuth = require('../middleware/checkAuth');
const multer = require("multer");
const userRouter = express.Router();
const path = "./uploads";

userRouter.get('/', checkAuth, getCurrentUser);


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

userRouter.post('/login', login); 
userRouter.post('/register', upload.single("profilePicture") ,register);
userRouter.post('/logout', checkAuth, logout);

module.exports = userRouter;