const express = require("express");
const router = express.Router();
const path = require('path')
// const checkauth = require("../Middleware/checkadmin");
const AdminController = require("../Controller/admin")

const {authen} = require("../Middleware/authenticate");


const userRoutes = (app) => {


  router.get('/',authen(['Admin']),AdminController.home)
  router.get('/user',authen(['Admin']),AdminController.user)

  router.get('/accept',authen(['Admin']),AdminController.accept)
  router.get('/accept/:id',authen(['Admin']),AdminController.accept_detail)
  router.post('/auction/accept',authen(['Admin']),AdminController.accept_post)
  router.post('/auction/update',authen(['Admin']),AdminController.auction_update)
  
  
  router.get('/auction/:id',authen(['Admin']),AdminController.auction_detail)

  return app.use("/admin/", router)
}
module.exports = userRoutes

