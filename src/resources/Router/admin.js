const express = require("express");
const router = express.Router();
const path = require('path')
// const checkauth = require("../Middleware/checkadmin");
const AdminController = require("../Controller/admin")

const {authen} = require("../Middleware/authenticate");


const userRoutes = (app) => {


  router.get('/',authen(['Admin','Staff']),AdminController.home)

  router.get('/user',authen(['Admin','Staff']),AdminController.user)
  router.get('/user/:id',authen(['Admin','Staff']),AdminController.user_detail)
  router.post('/user/update',authen(['Admin','Staff']),AdminController.user_update)

  router.get('/accept',authen(['Admin','Staff']),AdminController.accept)
  router.get('/accept/:id',authen(['Admin','Staff']),AdminController.accept_detail)

  router.get('/auction/:id',authen(['Admin','Staff']),AdminController.auction_detail)
  router.post('/auction/accept',authen(['Admin','Staff']),AdminController.accept_post)
  router.post('/auction/update',authen(['Admin','Staff']),AdminController.auction_update)
  

  return app.use("/admin/", router)
}
module.exports = userRoutes

