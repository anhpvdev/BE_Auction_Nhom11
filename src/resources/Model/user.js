const path = require('path')
// const connection = require('../../config/connect_db')

const db = require('../../config/connect_db');




const UserModel = {
    login_gg:async (data) => {
        try {
           
            let [user] = await db.query(`SELECT * FROM nguoidung WHERE taiKhoan = ?`,[data.email])
            
            if(user.length == 0){
                let [newuser] = await db.query(`INSERT INTO nguoidung(taiKhoan, hoVaTen) VALUES (?,?)`,[data.email,data.name])   

                const userId = newuser.insertId;
                const [userInfo] = await db.query(`SELECT * FROM nguoidung WHERE maNguoiDung = ?`,[userId]  );
                
                return userInfo[0]

            }else{
                return user[0]
            }
        } catch (error) {
            
        }
      
    },


    check_email:async (username) => {
        try {
            

            const [user] = await db.query(`SELECT * FROM nguoidung WHERE Email = ?`,[username])

            console.log(user)

            if(user.length ==0) return false

            return true
        } catch (error) {
            console.log(error)
            return {status:false,data:"Lỗi hệ thống xin thử lại sau"}
        }
      
    },

    register:async (username,password) => {
        try {
            
            regisquery = `INSERT INTO nguoidung(Email, MatKhau) VALUES (?, ?)`
            const [user] = await db.query(regisquery,[username,password])

            return user
        } catch (error) {
            console.log(error)
            return []
        }
      
    },

    getInfo_byEmail:async (Email) => {
        try {
           
            const [user] = await db.query(`SELECT * FROM nguoidung WHERE Email = ?`,[Email])

            return user[0]


        } catch (error) {
            console.log(error)
           return []
        }
      
    },

    getInfo_byId:async (ID) => {
        try {
           
            const [user] = await db.query(`SELECT MaNguoiDung,HoVaTen,Email,SoDienThoai,Avatar,GioiTinh,NgaySinh,Bid,DATE_FORMAT(NgayTao, '%d/%m/%Y') as NgayTao, TrangThai, VaiTro FROM nguoidung WHERE maNguoiDung = ?`,[ID])

            return user[0]


        } catch (error) {
            console.log(error)
           return []
        }
      
    },

    update_info:async (name,gender,ID) => {
        try {
             console.log(name,gender,ID)
            const update ="UPDATE nguoidung SET HoVaTen=?,GioiTinh=? WHERE MaNguoiDung = ?"
            const [user] = await db.query(update,[name,gender,ID])

            return user


        } catch (error) {
            console.log(error)
           return []
        }
      
    },

    hard_update_info:async (name,gender,bid,status,role,ID) => {
        try {
             console.log(name,gender,ID)
            const update ="UPDATE nguoidung SET HoVaTen=?,GioiTinh=?,Bid=?,TrangThai=?,VaiTro=? WHERE MaNguoiDung = ?"
            const [user] = await db.query(update,[name,gender,bid,status,role ,ID])

            return user


        } catch (error) {
            console.log(error)
           return []
        }
      
    },

    createBill:async (userID,content,key) => {
        try {
            const update ="INSERT INTO thanhtoan(MaNguoiDung, NoiDung, `Key`) VALUES (?,?,?)"
            const [bill] = await db.query(update,[userID,content,key])

            return bill


        } catch (error) {
            console.log(error)
           return []
        }
      
    },

    updateBill:async (ID,key) => {
        try {
            console.log(ID,key)
            const update ="UPDATE thanhtoan SET TrangThai= 1 WHERE MaThanhToan = ? and `Key`= ?"
            const [bill] = await db.query(update,[ID,key])
            console.log(bill)
            if(bill.changedRows > 0) return true
            return false
        } catch (error) {
            console.log(error)
           return false
        }
      
    },

    updateBID:async (userID,Bid) => {
        try {
            const update ="UPDATE nguoidung SET Bid = Bid + ? WHERE MaNguoiDung = ?"
            const [bill] = await db.query(update,[Bid,userID])
            console.log(bill)
            if(bill.changedRows >0) return true

            return false
        } catch (error) {
            console.log(error)
           return false
        }
      
    },

    addAuction:async (userID,title,content,open,close,price,step,tag) => {
        try {
            const update ="INSERT INTO sanphamdangky(MaNguoiMua, TieuDe, MoTa, NganSachToiDa, NgayBatDau, NgayKetThuc,BuocGia,MaDanhMuc ) VALUES (?,?,?,?,?,?,?,?)"
            const [bill] = await db.query(update,[userID,title,content,price,open,close,step,tag])

            return bill

        } catch (error) {
            console.log(error)
           return []
        }
      
    },

    updateAuction:async (ID,title,content,open,close,price,step) => {
        try {
            const update ="UPDATE sanphamdangky SET TieuDe=?, MoTa=?,NganSachToiDa=?,NgayBatDau=?,NgayKetThuc=?,BuocGia=? WHERE MaSanPham = ?"
            const [bill] = await db.query(update,[title,content,price,open,close,step,ID])

            return bill

        } catch (error) {
            console.log(error)
           return []
        }
      
    },

    all_user: async (page) => {
        try {
            const limit = 10
            const offset = (page - 1) * limit

            const [user] = await db.query(`SELECT MaNguoiDung,HoVaTen,Email,Avatar,SoDienThoai,GioiTinh,Bid,DATE_FORMAT(NgayTao, '%d/%m/%Y') as NgayTao, TrangThai, VaiTro FROM nguoidung Where VaiTro !="Admin"  LIMIT ? OFFSET ?`,[limit,offset])

            return user


        } catch (error) {
            console.log(error)
           return []
        }
      
    },

    // pay_forbid:async (num) => {
    //     try {
    //         const limit = 10
    //         const offset = (page - 1) * limit

    //         const [user] = await db.query(`SELECT MaNguoiDung,HoVaTen,Email,Avatar,SoDienThoai,GioiTinh,Bid,DATE_FORMAT(NgayTao, '%d/%m/%Y') as NgayTao, TrangThai, VaiTro FROM nguoidung Where VaiTro !="Admin"  LIMIT ? OFFSET ?`,[limit,offset])

    //         return user


    //     } catch (error) {
    //         console.log(error)
    //        return []
    //     }
      
    // },





  
}

module.exports = UserModel