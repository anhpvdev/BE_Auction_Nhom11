

const fs = require('fs').promises;
const multer = require("multer")
    
const storage = multer.diskStorage({
  destination: async(req,file,cb)=>{
    try { 
        let {comicID,name} = req.body
        console.log(comicID,name)

          let path = './src/public/images/comic/chapter/'+comicID+'/'+name

          await fs.mkdir(path, { recursive: true });
          cb(null,path)
          
    } catch (error) {
      console.log(error)
    }
  },
  filename:(req,file,cb)=>{
    let filename = file.originalname
    cb(null,filename)

  }
})


const comic = multer({storage:storage})
    


module.exports = comic