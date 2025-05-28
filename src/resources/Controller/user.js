const path = require('path')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');


// const { match } = require('assert');
const UserModel = require("../Model/user")
const AuctionModel = require("../Model/auction")

const stripe = require('stripe')(process.env.PAY_SECRET);
const crypto = require('crypto');
// const { url, console } = require('inspector');

const UserServices = {

    error: async (req, res) => {
        res.render(path.join(__dirname+"../../views/err.ejs"),{user:req.user})
    },
    
    login:async (req, res) => {
   
      return res.render("Users/login.ejs",{message:null})
        
    },

    login_post:async (req, res) => {
      try {
        const {username,password} = req.body
        console.log(username,password)

        const user = await UserModel.getInfo_byEmail(username)
        if(!user) return res.render("Users/login.ejs",{message:"Account does not exist"})

        if(password!= user.MatKhau)  return res.render("Users/login.ejs",{message:"password is not corect"})

        console.log(user)
        const user_cookie= {
            ID: user.MaNguoiDung,
            Email: user.Email,
            role: user.VaiTro,
            status:user.TrangThai
        }
        const token = await jwt.sign(user_cookie, process.env.SECRET)
        res.cookie("AU2D_nt3h", token,{ httpOnly: true, maxAge: 3600 * 2 * 1000 }) // 2 tieng

        return res.redirect("/")

      } catch (error) {
        console.log(error)
        return res.render("err.ejs")
      }
        
    },

    register:async (req, res) => {
   
      return res.render("Users/register.ejs",{message:null})
        
    },

    register_post:async (req, res) => {
      try {
        const {username,password} = req.body
        console.log(username,password)
  
        const check = await UserModel.check_email(username)
        if(check) return res.render("Users/register.ejs",{message:"Email already exists"})

        const newUser = await UserModel.register(username,password)
        console.log(newUser)
        if(newUser?.affectedRows == 0) return res.render('err.ejs')
        
        return res.redirect("/login")
        
      } catch (error) {
        console.log(error)
        return res.render("err.ejs")
      }
      
    },

    logout:async (req, res) => {
      res.cookie("AU2D_nt3h", "")

      return res.redirect("/")
        
    },

    login_google_post:async (req, res) => {
      try {
        const user = req.user
  
        const user_cookie= {
          id: user.maNguoiDung,
          account: user.taiKhoan,
          role: user.vaiTro,
          avatar: user.anhDaiDien,
          name:user.hoVaTen
        }
  
  
        const token = await jwt.sign(user_cookie, process.env.SECRET)
  
  
        res.cookie("AU2D_nt3h", token,{ httpOnly: true, maxAge: 60 * 60 * 1000 })
  
        // res.redirect("/admin")
        const backUrl = req.cookies?.backUrl;
        return res.redirect(backUrl)
      } catch (error) {
        console.log(error)
        return res.render("err.ejs")
      }
    },

    home:async (req, res) => {
      try{
       const user = req.user || null

        return res.render("Users/home.ejs",{user:user})
      }catch(err){
        console.log(err)
        return res.render("err.ejs")
      }
    
     
    },

    userInfo:async (req, res) => {
      try{
       const user = req.user
        return res.render("Users/info.ejs",{user:user})
      }catch(err){
        console.log(err)
        return res.render("err.ejs")
      }
    
     
    },
  

    userInfo_post:async (req, res) => {
      try{
        const userID = req.user?.MaNguoiDung
        const {name,gender} = req.body

        const update = await UserModel.update_info(name,gender,userID)
        if(update.affectedRows == 0) return res.render("err.ejs")
       
        return res.redirect("/user/info")
      }catch(err){
        console.log(err)
        return res.render("err.ejs")
      }
    
    },
    buy_success:async (req, res) => {
      try{
        const {id,key,bid,user} = req.query
        if(!id || !key || !bid || !user) return res.redirect('/user/buy/error')
        
        console.log(id,key,bid,user)
        const updateBill = await UserModel.updateBill(id,key)

        if(!updateBill) return res.redirect('/user/buy/error')

        const updateBID = await UserModel.updateBID(user,bid)
        if(!updateBID) return res.redirect('/user/buy/error')

        return res.render("success.ejs")
      }catch(err){
        console.log(err)
        return res.render("err.ejs")
      }
    },
    buy_error:async (req, res) => {
      try{
        return res.render("error.ejs")
      }catch(err){
        console.log(err)
        return res.render("err.ejs")
      }
    },


    bidPackage:async (req, res) => {
      try{
       const user = req.user
        return res.render("Users/bid.ejs",{user:user})
      }catch(err){
        console.log(err)
        return res.render("err.ejs")
      }
    
     
    },

    bidBuy:async (req, res) => {
      try{
        const {price,content,bid} = req.body
        const userID = req.user.MaNguoiDung
        const billKey = crypto.randomBytes(16).toString('hex');
        console.log(price,content,billKey);
        const bill = await UserModel.createBill(userID,content,billKey)

        if(bill.affectedRows > 0){
           console.log(bill)
          const billID = bill.insertId
          const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [
              {
                price_data: {
                  currency: 'usd',
                  product_data: {
                    name: 'Test Product',
                  },
                  unit_amount: price, 
                },
                quantity: 1,
              },
            ],
            success_url: `${process.env.DOMAIN}/user/buy/success?id=${billID}&key=${billKey}&bid=${bid}&user=${userID}`,
            cancel_url: `${process.env.DOMAIN}/user/buy/error`,
          });

          res.redirect(session.url)
        }else{
          return res.redirect('/user/buy/error')
        }
    }catch(err){
      console.error(err);
      res.send('Có lỗi xảy ra khi tạo đơn thanh toán');
    }
     
  },

  auction:async (req, res) => {
      try{
       const user = req.user
        if(req.user.Bid < 5) return res.json('Vui lòng nạp bid để đăng bài')

        return res.render("Users/auction.ejs",{user:user})
      }catch(err){
        console.log(err)
        return res.render("err.ejs")
      }
    
  },

  auction_detail:async (req, res) => {
      try{
       const user = req.user
       const ID = req.params.id

        const aution = await AuctionModel.auction_detail(ID)

        if(!aution || aution.MaNguoiMua != user.MaNguoiDung  ) return res.render("401.ejs")

        return res.render("Users/auction_update.ejs",{user:user,info:aution})
      }catch(err){
        console.log(err)
        return res.render("err.ejs")
      }
    
  },


  auction_now:async (req, res) => {
      try{
        const user = req.user
        const category = req.params.id
        const type = req.query.type || 1

        const list = await  AuctionModel.cate_auction_work(1,type,category)

        return res.render("Users/auction_now.ejs",{user:user,list:list})
      }catch(err){
        console.log(err)
        return res.render("err.ejs")
      }
    
  },

  auction_now_detail:async (req, res) => {
      try{
        const user = req.user
        const BidID = req.params.id
        const detail = await AuctionModel.auction_now_detail(BidID)
        const list_bid = await AuctionModel.auction_list_bid(BidID)

        return res.render("Users/auction_now_detail.ejs",{user:user,detail:detail,list_bid:list_bid})
      }catch(err){
        console.log(err)
        return res.render("err.ejs")
      }
  },

  auction_bid:async (req, res) => {
      try{
        const userID = req.user.MaNguoiDung
        if(req.user.Bid < 1) return res.json("Vui lòng nạp thêm bid để đấu giá")
        const {BidID,price} = req.body
        const check = await AuctionModel.auction_bid_check(BidID)

        if(!check) return res.json("Looix")

          check.NganSachToiDa = parseFloat(check.NganSachToiDa)
          check.GiaThapNhat = parseFloat(check.GiaThapNhat)
          check.BuocGia = parseFloat(check.BuocGia)

        if(check.TrangThai !=1) return res.status(500).json({message:"Phiên đấu giá đã kết thúc"})

        if(price >= check.NganSachToiDa) return res.status(500).json({message:"Giá không được lớn hơn ngân sáhc tối đa"})

        if(check.GiaThapNhat != '0.00' && price >= check.GiaThapNhat) return res.status(500).json({message:"Giá không phù hợp yêu cầu"})

        if(check.GiaThapNhat != '0.00' && price > check.GiaThapNhat - check.BuocGia) return res.status(500).json({message:"Giá không phù hợp yêu cầu, phải thấp hơn số lần bước giá"})

        const detail = await AuctionModel.auction_bid_join(userID,BidID,price)

        await UserModel.updateBID(userID,-1)
        var returnUser = {
          HoVaTen: req.user.HoVaTen,
          Avatar:req.user.Avatar,
          Price: price
        }

        return res.status(200).json({message:"Đấu giá thành công",data:returnUser})
      }catch(err){
        console.log(err)
        return res.render("err.ejs")
      }
  },

  auction_post:async (req, res) => {
      try{
       const userID = req.user.MaNguoiDung
       const {title,content,open,close,price,step} = req.body
       const tag = 2

       const auction = await UserModel.addAuction(userID,title,content,open,close,price,step,tag)

       if(auction.affectedRows < 1) return res.render("err.ejs")

        return res.redirect('/')
      }catch(err){
        console.log(err)
        return res.render("err.ejs")
      }
    
  },

  auction_update:async (req, res) => {
      try{
       const userID = req.user.MaNguoiDung
       const {auctionID,title,content,open,close,price,step} = req.body
       console.log(title,content)
       console.log(open,close,price)

       const auction = await UserModel.updateAuction(auctionID,title,content,open,close,price,step)

       if(auction.affectedRows < 1) return res.render("err.ejs")

        return res.redirect('/')
      }catch(err){
        console.log(err)
        return res.render("err.ejs")
      }
    
  },


  
}

module.exports = UserServices