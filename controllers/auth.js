const express = require("express");
const router = express.Router();
const UserService = require("../services/User");
const AuthService = require("../services/Auth");

router.post("/login", async (req, res) => {
  try {
    const findUser = await UserService.findBy({
      username: req.body.username,
      password: req.body.password,
    });
    if (!findUser) {
      res.status(400).status({
        message: "User Not Found",
      });
      return;
    }
    const createAuth = await AuthService.create(findUser.id);
    if (createAuth) {
      res.status(200).json({
        client: findUser,
        auth: createAuth,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Application Error",
    });
  }
});

module.exports = router;
