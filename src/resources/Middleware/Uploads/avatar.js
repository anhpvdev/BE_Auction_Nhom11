
const multer = require("multer")
    
const storage = multer.diskStorage({
  destination:(req,file,res)=>{
      let path = './src/public/images/user'
      res(null,path)
  },
  filename:(req,file,res)=>{
    var userID = req.user.maNguoiDung
    console.log(userID)
    let filename = userID+".jpg"
    res(null,filename)

  }
})

const avatar =multer({storage:storage})
    



module.exports = avatar