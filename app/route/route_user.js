const UserController = require("../../feature/user/controller/controller");
const UserService = require("../../feature/user/service/service");
const UserRepository = require("../../feature/user/repository/repository");

const db = require("../database/mysql")
const { jwtMiddleware } = require("../../utils/jwt/jwt");
const express = require('express');

const router = express.Router();

const userRepository = new UserRepository(db);
const userService = new UserService(userRepository);
const userController = new UserController(userService); 

router.post('/register', userController.createUser.bind(userController));
router.post('/login', userController.login.bind(userController));
router.post('/send-otp', userController.sendOtpEmail.bind(userController));
router.post('/verify-otp', userController.verifyOtpEmail.bind(userController));
router.patch('/new-password', jwtMiddleware, userController.newPassword.bind(userController));
router.get("/verify", userController.VerifyAccount.bind(userController));


router.get('/users', jwtMiddleware, userController.getAllUsers.bind(userController));
router.get('/users/:id', jwtMiddleware, userController.getUserById.bind(userController));
router.put('/users/:id', jwtMiddleware, userController.updateUserById.bind(userController));
router.delete('/users/:id', jwtMiddleware, userController.deleteUserById.bind(userController));
router.patch('/users/:id', jwtMiddleware, userController.updatePassword.bind(userController));

// users
router.get('/profile', jwtMiddleware, userController.getProfile.bind(userController));
router.put('/profile', jwtMiddleware, userController.updateProfile.bind(userController));
router.patch('/profile', jwtMiddleware, userController.updatePasswordProfile.bind(userController));

module.exports = router;