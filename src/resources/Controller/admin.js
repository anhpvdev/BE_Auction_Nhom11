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

        const list = await  AuctionModel.all_auction_regis(page)
        console.log(list)

        return res.render("Admin/home.ejs",{user:req.user,list:list})

      } catch (error) {
        console.log(error)
        return res.render("err.ejs")
      }  
    },

    user:async (req, res) => {
      try {
        const page = req.query.page || 1

        const list = await UserModel.all_user(page)
        console.log(list)

        return res.render("Admin/user.ejs",{user:req.user,list:list})

      } catch (error) {
        console.log(error)
        return res.render("err.ejs")
      }  
    },

    

}

module.exports = UserServices