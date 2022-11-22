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

router.get("/fetch-me", async (req, res) => {
  try {
    const getAuth = await AuthService.validate(req.headers.token);
    if (!getAuth) {
      return res.status(401).send({
        message: "Unauthorized",
      });
    }
    const findToken = await AuthService.findByToken(req.headers.token);
    const findUser = await UserService.findOne(findToken.user);
    if (!findUser) {
      return res.status(400).json({
        message: "Failed Fetch User",
      });
    }
    return res.status(200).json(findUser);
  } catch (error) {
    return res.status(500).send({
      message: "Application Error",
    });
  }
});

module.exports = router;
