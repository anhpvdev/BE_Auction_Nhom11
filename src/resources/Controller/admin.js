const path = require('path')

const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');

const fs = require('fs').promises;
const UserModel = require("../Model/user")
const AuctionModel = require("../Model/auction")


const db = require("../../config/connect_db")

const UserServices = {

    home: async (req, res) => {
      try {
        const page = req.query.page || 1
        const type = req.query.type || 1

        const list = await  AuctionModel.all_auction_work(page,type)

        return res.render("Admin/home.ejs",{user:req.user,list:list})

      } catch (error) {
        console.log(error)
        return res.render("err.ejs")
      }  
    },

    accept: async (req, res) => {
      try {
        const page = req.query.page || 1

        const list = await  AuctionModel.all_auction_regis(page)

        return res.render("Admin/accept.ejs",{user:req.user,list:list})

      } catch (error) {
        console.log(error)
        return res.render("err.ejs")
      }  
    },

    user:async (req, res) => {
      try {
        const page = req.query.page || 1

        const list = await UserModel.all_user(page)
        return res.render("Admin/user.ejs",{user:req.user,list:list})

      } catch (error) {
        console.log(error)
        return res.render("err.ejs")
      }  
    },
    user_detail:async (req, res) => {
      try{
        const staff = req.user
       const userID = req.params.id

        const user =await UserModel.getInfo_byId(userID);

        if(!user) return res.render("404.ejs")


        return res.render("Admin/user_detail.ejs",{user:staff,info:user})
      }catch(err){
        console.log(err)
        return res.render("err.ejs")
      }
    
    },

    user_update:async (req, res) => {
      try{
        const staff = req.user
        const {name,gender,bid,status,role,userID} = req.body

        console.log(name,gender,bid,status,role,userID)

        const update = await UserModel.hard_update_info(name,gender,bid,status,role,userID)

        if(update.affectedRows == 0) return res.render("err.ejs")
       
        return res.redirect("/admin/user")
      }catch(err){
        console.log(err)
        return res.render("err.ejs")
      }
    
    },



    accept_detail:async (req, res) => {
      try{
       const user = req.user
       const ID = req.params.id

        const auction = await AuctionModel.auction_detail(ID)

        if(!auction) return res.render("404.ejs")


        return res.render("Admin/accept_detail.ejs",{user:user,info:auction})
      }catch(err){
        console.log(err)
        return res.render("err.ejs")
      }
    
  },

  auction_detail:async (req, res) => {
      try{
       const user = req.user
       const ID = req.params.id

        const auction = await AuctionModel.auction_detail(ID)

        if(!auction) return res.render("404.ejs")


        return res.render("Admin/auction_detail.ejs",{user:user,info:auction})
      }catch(err){
        console.log(err)
        return res.render("err.ejs")
      }
    
  },

  accept_post:async (req, res) => {
      try{
        const staffID = req.user.MaNguoiDung
        const {auctionID,userID} = req.body

        const accept = await AuctionModel.auction_accept(auctionID)
        if(accept.changedRows < 1) return res.render("err.ejs")
        
        const newbid = await AuctionModel.auction_bid(staffID,auctionID)
        if(newbid.affectedRows <1) return res.render("err.ejs")

        await UserModel.updateBID(userID,-5)

        return res.redirect('/admin/')
      }catch(err){
        console.log(err)
        return res.render("err.ejs")
      }
    
  },

  accept_deny:async (req, res) => {
      try{
        const staffID = req.user.MaNguoiDung
        const {auctionID,userID,info} = req.body
        const deny = await AuctionModel.auction_deny(auctionID,info)
        if(deny.changedRows < 1) return res.render("err.ejs")

        return res.redirect('/admin/')
       
      }catch(err){
        console.log(err)
        return res.render("err.ejs")
      }
    
  },

  auction_update:async (req, res) => {
      try{
       const {auctionID,title,content,open,close,price,step} = req.body

       const auction = await UserModel.updateAuction(auctionID,title,content,open,close,price,step)

       if(auction.affectedRows < 1) return res.render("err.ejs")

        return res.redirect('/admin/')
      }catch(err){
        console.log(err)
        return res.render("err.ejs")
      }
    
  },


    

}

module.exports = UserServices