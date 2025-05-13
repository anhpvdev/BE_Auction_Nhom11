const multer = require("multer")
    
const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
      let path = './src/public/images/comic/poster'
      cb(null,path)
  },
  filename:(req,file,cb)=>{
    let time = Date.now()
    let filename = time+".jpg"
    console.log(filename)
    req.body.image = filename
    cb(null,filename)

  }
})

const comic = multer({storage:storage})
    



module.exports = comic