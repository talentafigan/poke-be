const express = require("express");
const router = express.Router();
const UserService = require("../services/User");
const UserItemService = require("../services/UserItem");
const AuthService = require("../services/Auth");

router.post("/guest", async (req, res) => {
  try {
    const createGuest = await UserService.createGuest();
    if (!createGuest) {
      return res.status(400).json({
        message: "Failed Create Guest",
      });
    }
    return res.status(200).json(createGuest);
  } catch (error) {
    return res.status(500).send({
      message: "Application Error",
    });
  }
});

router.post("/item", async (req, res) => {
  try {
    const getAuth = await AuthService.validate(req.headers.token);
    if (!getAuth) {
      return res.status(401).send({
        message: "Unauthorized",
      });
    }
    const createItem = await UserItemService.create({
      ...req.body,
      user: getAuth.user.id,
    });
    if (!createItem) {
      return res.status(400).json({
        message: "Failed Create Item",
      });
    }
    return res.status(200).json(createItem);
  } catch (error) {
    return res.status(500).send({
      message: "Application Error",
    });
  }
});

router.post("/item/bet", async (req, res) => {
  try {
    const getAuth = await AuthService.validate(req.headers.token);
    if (!getAuth) {
      return res.status(401).send({
        message: "Unauthorized",
      });
    }
    const isLucky = !!0.5 && Math.random() < 0.5;
    if (!isLucky) {
      return res.status(400).json({
        message: "Failed Catch Item",
      });
    }
    return res.status(200).json({
      message: "Success Catch Item",
    });
  } catch (error) {}
});

router.get("/item", async (req, res) => {
  try {
    const getAuth = await AuthService.validate(req.headers.token);
    if (!getAuth) {
      return res.status(401).send({
        message: "Unauthorized",
      });
    }
    const findItem = await UserItemService.get({
      user: getAuth.user.id,
    });
    return res.status(200).json(findItem);
  } catch (error) {
    return res.status(500).send({
      message: "Application Error",
    });
  }
});

router.get("/item/:id", async (req, res) => {
  try {
    const getAuth = await AuthService.validate(req.headers.token);
    if (!getAuth) {
      return res.status(401).send({
        message: "Unauthorized",
      });
    }
    const findItem = await UserItemService.findOne(req.params.id);
    if (!findItem) {
      return res.status(400).json({
        message: "Item Not Found",
      });
    }
    return res.status(200).json(findItem);
  } catch (error) {
    return res.status(500).send({
      message: "Application Error",
    });
  }
});

router.put("/item/:id", async (req, res) => {
  try {
    const getAuth = await AuthService.validate(req.headers.token);
    if (!getAuth) {
      return res.status(401).send({
        message: "Unauthorized",
      });
    }
    const findItem = await UserItemService.findOne(req.params.id);
    if (!findItem) {
      return res.status(400).json({
        message: "Item Not Found",
      });
    }
    const updateItem = await UserItemService.update(req.params.id, req.body);
    console.log(updateItem);
    if (!updateItem) {
      return res.status(400).json({
        message: "Failed Update Item",
      });
    }
    return res.status(200).json(updateItem);
  } catch (error) {
    return res.status(500).send({
      message: "Application Error",
    });
  }
});

module.exports = router;
