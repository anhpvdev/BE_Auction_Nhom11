const express = require("express");
const router = express.Router();
const path = require('path')
// const checkauth = require("../Middleware/checkuser");
const PageController = require("../Controller/page")


const pageRoutes = (app) => {

  router.get('/all-tag',PageController.tag_all)
  
  return app.use("/page", router)
}
module.exports = pageRoutes

