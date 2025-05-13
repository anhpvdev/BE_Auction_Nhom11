const express = require("express");
const router = express.Router();
const path = require('path')
// const checkauth = require("../Middleware/checkadmin");
const AdminController = require("../Controller/admin")

const {authen} = require("../Middleware/authenticate");


const userRoutes = (app) => {


  router.get('/',authen(['Admin']),AdminController.home)
   router.get('/user',authen(['Admin']),AdminController.user)
  
  return app.use("/admin/", router)
}
module.exports = userRoutes

