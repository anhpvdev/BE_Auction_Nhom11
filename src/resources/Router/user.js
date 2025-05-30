const express = require("express");
const router = express.Router();
const path = require('path')
const {authen} = require("../Middleware/authenticate");

const UserController = require("../Controller/user")
const passport = require('passport');
const avatarupload = require("../Middleware/Uploads/avatar");

const userRoutes = (app) => {
  router.get('/',authen([]),UserController.home)


  router.get('/login',UserController.login)
  router.get('/auth/google', passport.authenticate('google', { scope: ['profile','email'] }))
  router.get('/google/redirect',
    passport.authenticate('google', { failureRedirect: '/login',session:false }),UserController.login_google_post  )

  router.get('/logout',UserController.logout)
  router.post('/login',UserController.login_post)

  router.get('/register',UserController.register)
  router.post('/register',UserController.register_post)


  router.get('/user/password',authen(['ALL']),UserController.userPassword)
  router.post('/user/password',authen(['ALL']),UserController.userChangePassword)
  router.get('/user/info',authen(['ALL']),UserController.userInfo)
  router.post('/user/info',authen(['ALL']),avatarupload.single('avatar'),UserController.userInfo_post)
  router.get('/user/noti',authen(['ALL']),UserController.userNoti)
  router.get('/user/history',authen(['ALL']),UserController.history_auction)
  router.get('/user/history/buy',authen(['ALL']),UserController.history_buy)
  router.get('/user/history/bid',authen(['ALL']),UserController.history_bid)

  router.get('/bid-package',authen(['ALL']),UserController.bidPackage)

  router.post('/user/bid-buy',authen(['ALL']),UserController.bidBuy)
  router.get('/user/buy/success',UserController.buy_success)
  router.get('/user/buy/error',UserController.buy_error)

  router.get('/user/auction',authen(['ALL']),UserController.auction)
  router.get('/user/auction/:id',authen(['ALL']),UserController.auction_detail)
  router.post('/user/auction',authen(['ALL']),UserController.auction_post)
  router.post('/user/auction/update',authen(['ALL']),UserController.auction_update)
   router.get('/user/auction-deny/:id',authen(['ALL']),UserController.auctiondeny_detail)
  router.post('/user/auction-deny/delete',authen(['ALL']),UserController.auctiondeny_delete)

  router.get('/auction/:id',authen(['ALL']),UserController.auction_now)
  router.get('/auction/detail/:id',authen(['ALL']),UserController.auction_now_detail)
  router.post('/auction/bid',authen(['ALL']),UserController.auction_bid)

    router.get('/search/auction',UserController.auctionSearch)
  return app.use("/", router)
}
module.exports = userRoutes

