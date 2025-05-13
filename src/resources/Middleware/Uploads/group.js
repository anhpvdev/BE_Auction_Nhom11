
const multer = require("multer")
    
const storage = multer.diskStorage({
  destination:(req,file,res)=>{
      let path = './src/public/images/group'
      res(null,path)
  },
  filename:(req,file,cb)=>{
    let time = Date.now()
    let filename = time+".jpg"
    console.log(filename)
    req.body.image = filename
    cb(null,filename)


  }
})

const avatar =multer({storage:storage})
    



module.exports = avatar