const path = require('path')
const fs = require('fs').promises;

// Service xử lý hình ảnhảnh

const ImageServices = {
    poster_delete: async (ImageUrl) => {
        try {
            if(ImageUrl){
              var ImagePath = path.join(__dirname, '..','..', 'public', 'images', 'comic', 'poster', ImageUrl);

              await fs.access(ImagePath); // Kiểm tra file có tồn tại không
              await fs.unlink(ImagePath); // Xóa file
            }
            // console.log(`File ${ImageUrl} đã bị xóa.`);
            return true;
          } catch (error) {
            console.error('file không tồn tại');
            return false;
          }   
      },

    Trans_avatar_delete: async (ImageUrl) => {
        try {
            var ImagePath = path.join(__dirname, '..','..', 'public', 'images', 'trans', ImageUrl);

            await fs.access(ImagePath); // Kiểm tra file có tồn tại không
            await fs.unlink(ImagePath); // Xóa file
            // console.log(`File ${ImageUrl} đã bị xóa.`);
            return true;
          } catch (error) {
            console.error('file không tồn tại');
            return false;
          }   
      },

    comic_delete: async (comicId) => {
        try {
            var FolderPath = path.join(__dirname, '..','..', 'public', 'images', 'comic', 'chapter', comicId);

            await fs.access(FolderPath); // Kiểm tra file có tồn tại không
            await fs.rm(FolderPath, { recursive: true}); // Xóa file
            // console.log(`Folder ${comicId} đã bị xóa.`);
            return true;
          } catch (error) {
            console.error('file không tồn tại');
            return false;
          }   
    },

    group_delete: async (ImageUrl) => {
      try {
          var ImagePath = path.join(__dirname, '..','..', 'public', 'images', 'group', ImageUrl);

          await fs.access(ImagePath); // Kiểm tra file có tồn tại không
          await fs.unlink(ImagePath); // Xóa file
          console.log(`File ${ImageUrl} đã bị xóa.`);
          return true;
        } catch (error) {
          console.error('file không tồn tại');
          return false;
        }   
    },

    chapter_rename: async (comicID,oldname, newname) => {
      try {
          const oldFolderPath = path.join(__dirname, '..', '..', 'public', 'images', 'comic', 'chapter', comicID, oldname);
          const newFolderPath = path.join(__dirname, '..', '..', 'public', 'images', 'comic', 'chapter', comicID, newname);
  
          await fs.access(oldFolderPath); // Kiểm tra thư mục có tồn tại không
          await fs.rename(oldFolderPath, newFolderPath); // Đổi tên thư mục
  
          // console.log(`Thư mục ${oldname} đã được đổi tên thành ${newname}.`);
          return true;
      } catch (error) {
          console.error('Thư mục không tồn tại hoặc có lỗi xảy ra:', error);
          return false;
      }
  },

}

module.exports = ImageServices