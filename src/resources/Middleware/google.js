require('dotenv').config();

const passport = require('passport')
const db = require('../../config/connect_db');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

const UserModel  = require('../Model/user');


const login_google = () =>{
    passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECERT,
        callbackURL: process.env.GOOGLE_LOGIN_REDIRECT
      },
      async function(accessToken, refreshToken, profile, cb) { 
        let data_user = {
          name: profile.displayName,
          email: profile.emails[0].value,
          avatar: profile.photos[0].value
        }


        let user = await UserModel.login_gg(data_user) 

        return cb(null,user)
      }
    ));
}

module.exports = login_google