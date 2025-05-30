const path = require('path')
// const connection = require('../../config/connect_db')

const db = require('../../config/connect_db');
const { use } = require('passport');
const { auction } = require('../Controller/user');
// const { comic_delete } = require('../Controller/admin');



const AuctionModel = {
    all_Auction:async (page) => {
        try {

            const limit = 10
            const offset = (page - 1) * limit

            var query = `SELECT tt.maTruyen, tt.tenTruyen, tt.moTa, tt.hinhAnh, IFNULL( CONCAT( '[', GROUP_CONCAT( JSON_OBJECT( 'id', c.maChuong, 'tenChuong', c.tenChuong, 'time', DATE_FORMAT(c.thoiGian, '%d/%m/%Y') ) ORDER BY c.thoiGian DESC SEPARATOR ',' ), ']' ), '[]' ) AS chapters, MAX(c.thoiGian) AS latest_chapter_time FROM truyentranh tt LEFT JOIN ( SELECT c1.* FROM chuong c1 WHERE ( SELECT COUNT(*) FROM chuong c2 WHERE c2.maTruyen = c1.maTruyen AND c2.thoiGian > c1.thoiGian ) < 3 ) c ON tt.maTruyen = c.maTruyen WHERE tt.trangThai IN ('Đang tiến hành', 'Tạm ngưng', 'Hoàn thành') GROUP BY tt.maTruyen ORDER BY latest_chapter_time DESC LIMIT ? OFFSET ?; `
            const [data] = await db.query(query,[limit,offset])


            data.forEach(comic => {
                comic.chapters = comic.chapters ? JSON.parse(comic.chapters) : [];
              });

            const comic_Data =  {count:count_comic[0].soLuong / limit ,data:data}
            


            return comic_Data

        } catch (error) {
            console.log(error)
        }
      
    },

    all_auction_regis:async (page) => {
        try {

            const limit = 10
            const offset = (page - 1) * limit


            var query = `SELECT s.MaSanPham, s.MaNguoiMua,n.HoVaTen, s.TieuDe, s.MoTa,DATE_FORMAT(s.NgayDangKy, '%H:%i %d/%m/%Y') as NgayDangKy, s.NgayBatDau FROM sanphamdangky as s LEFT JOIN nguoidung as n on n.MaNguoiDung = s.MaNguoiMua WHERE s.TrangThai = 0 ORDER by s.NgayBatDau DESC  LIMIT ? OFFSET ? `
            const [data] = await db.query(query,[limit,offset])

        

            return data

        } catch (error) {
            console.log(error)
        }
      
    },

    all_auction_work:async (page,type,category) => {
        try {
            var query = `SELECT p.MaPhienDauGia, p.TrangThai, p.MaSanPham , s.MaNguoiMua,n.HoVaTen,n.Avatar, s.TieuDe,s.MoTa,DATE_FORMAT(s.NgayBatDau, '%H:%i %d/%m/%Y') as NgayBatDau,DATE_FORMAT(s.NgayKetThuc, '%H:%i %d/%m/%Y') as NgayKetThuc FROM phiendaugia as p LEFT JOIN sanphamdangky as s on s.MaSanPham = p.MaSanPham LEFT JOIN nguoidung as n on n.MaNguoiDung = s.MaNguoiMua WHERE p.TrangThai = ? ORDER by s.NgayBatDau DESC`
            const [data] = await db.query(query,[type,category])

        

            return data

        } catch (error) {
            console.log(error)
        }
      
    },

    all_auction_user:async (userID) => {
        try {
            var query = `SELECT p.MaPhienDauGia, p.TrangThai as tt,s.TrangThai, s.MaSanPham , s.MaNguoiMua,n.HoVaTen,n.Avatar, s.TieuDe,s.MoTa,DATE_FORMAT(s.NgayDangKy, '%H:%i %d/%m/%Y') as NgayBatDau FROM phiendaugia as p RIGHT JOIN sanphamdangky as s on s.MaSanPham = p.MaSanPham LEFT JOIN nguoidung as n on n.MaNguoiDung = s.MaNguoiMua WHERE s.MaNguoiMua = ? ORDER by s.NgayBatDau DESC;`
            const [data] = await db.query(query,[userID])

        

            return data

        } catch (error) {
            console.log(error)
        }
      
    },

    cate_auction_work:async (page,type,category) => {
        try {
            var query = `SELECT p.MaPhienDauGia, p.TrangThai, p.MaSanPham,p.GiaThapNhat,p.MaNguoiBan , s.MaNguoiMua, s.NganSachToiDa,s.BuocGia,n.HoVaTen,n.Avatar, s.TieuDe,s.MoTa,DATE_FORMAT(s.NgayBatDau, '%H:%i %d/%m/%Y') as NgayBatDau,DATE_FORMAT(s.NgayKetThuc, '%H:%i %d/%m/%Y') as NgayKetThuc , nw.HoVaTen as winname, nw.Avatar as winavatar FROM phiendaugia as p LEFT JOIN sanphamdangky as s on s.MaSanPham = p.MaSanPham LEFT JOIN nguoidung as n on n.MaNguoiDung = s.MaNguoiMua LEFT JOIN nguoidung as nw on nw.MaNguoiDung = p.MaNguoiBan WHERE p.TrangThai = ? and s.MaDanhMuc = ? and s.NgayBatDau < NOW() ORDER by s.NgayBatDau DESC;`
            const [data] = await db.query(query,[type,category])

            return data
        } catch (error) {
            console.log(error)
        }
      
    },

    auction_search:async (key) => {
        try {
            var query = `SELECT p.MaPhienDauGia, p.TrangThai, p.MaSanPham , s.MaNguoiMua,n.HoVaTen,n.Avatar,s.TieuDe,DATE_FORMAT(s.NgayKetThuc, '%H:%i %d/%m/%Y') as NgayKetThuc  FROM phiendaugia as p LEFT JOIN sanphamdangky as s on s.MaSanPham = p.MaSanPham LEFT JOIN nguoidung as n on n.MaNguoiDung = s.MaNguoiMua WHERE s.TieuDe LIKE CONCAT('%', ?, '%') ORDER by s.NgayBatDau DESC;`
            const [data] = await db.query(query,[key])

            return data
        } catch (error) {
            console.log(error)
        }
      
    },

    auction_detail:async (ID) => {
        try {
            var query = `SELECT s.MaSanPham,s.MaNguoiMua,s.MaDanhMuc,s.TieuDe,s.MoTa,s.NganSachToiDa,s.BuocGia,s.TrangThai,s.PhanHoi,DATE_FORMAT(s.NgayBatDau, '%Y-%m-%d %H:%i') AS NgayBatDau, DATE_FORMAT(s.NgayKetThuc, '%Y-%m-%d %H:%i') AS NgayKetThuc , n.HoVaTen,n.Avatar from sanphamdangky as s LEFT JOIN nguoidung as n on n.MaNguoiDung = s.MaNguoiMua WHERE MaSanPham = ?;`
            const [data] = await db.query(query,[ID])

            return data[0]

        } catch (error) {
            console.log(error)
           return []
        }
      
    },

    auction_delete:async (auctionID,userID) => {
        try {
            var query = `DELETE FROM sanphamdangky WHERE TrangThai = 2 and MaNguoiMua = ? and MaSanPham = ?;`
            const [data] = await db.query(query,[userID,auctionID])

            return data

        } catch (error) {
            console.log(error)
           return []
        }
      
    },

    auction_detail_deny:async (ID) => {
        try {
            var query = `SELECT s.MaSanPham,s.MaNguoiMua,s.MaDanhMuc,s.TieuDe,s.MoTa,s.NganSachToiDa,s.BuocGia,s.TrangThai,s.PhanHoi,DATE_FORMAT(s.NgayBatDau, '%Y-%m-%d %H:%i') AS NgayBatDau, DATE_FORMAT(s.NgayKetThuc, '%Y-%m-%d %H:%i') AS NgayKetThuc , n.HoVaTen,n.Avatar from sanphamdangky as s LEFT JOIN nguoidung as n on n.MaNguoiDung = s.MaNguoiMua WHERE MaSanPham = ?;`
            const [data] = await db.query(query,[ID])

            return data[0]

        } catch (error) {
            console.log(error)
           return []
        }
      
    },

    auction_now_detail:async (ID) => {
        try {
            var query = `SELECT p.MaPhienDauGia,sp.MaSanPham, sp.MaNguoiMua, sp.MaDanhMuc, sp.TieuDe, sp.MoTa, sp.NganSachToiDa, sp.BuocGia, p.TrangThai, sp.PhanHoi,DATE_FORMAT( sp.NgayBatDau, '%Y-%m-%d %H:%i') AS NgayBatDau, DATE_FORMAT( sp.NgayKetThuc, '%Y-%m-%d %H:%i') AS NgayKetThuc , n.HoVaTen ,n.Avatar FROM phiendaugia as p RIGHT JOIN sanphamdangky as sp on sp.MaSanPham = p.MaSanPham LEFT JOIN nguoidung as n on n.MaNguoiDung = sp.MaNguoiMua WHERE p.MaPhienDauGia = ? and n.TrangThai = 1;`
            const [data] = await db.query(query,[ID])

            return data[0]

        } catch (error) {
            console.log(error)
           return []
        }
      
    },

    auction_list_bid:async (ID) => {
        try {
            var query = `SELECT ls.MaLichSu, ls.MaNguoiBan, ls.GiaDaDauGia,DATE_FORMAT( ls.ThoiGianDauGia, '%Y-%m-%dT%H:%i') as ThoiGian, n.HoVaTen, n.Avatar FROM lichsudaugia as ls
LEFT JOIN nguoidung as n on n.MaNguoiDung = ls.MaNguoiBan
WHERE ls.MaPhienDauGia = ? ORDER by ls.GiaDaDauGia ASC`
            const [data] = await db.query(query,[ID])

            return data

        } catch (error) {
            console.log(error)
           return []
        }
      
    },


    auction_accept:async (ID) => {
        try {
            var query = `UPDATE sanphamdangky SET TrangThai = 1 WHERE MaSanPham = ?`
            const [data] = await db.query(query,[ID])

            return data

        } catch (error) {
            console.log(error)
           return []
        }
      
    },

     auction_deny:async (ID,info) => {
        try {
            var query = `UPDATE sanphamdangky SET TrangThai=2,PhanHoi=? WHERE MaSanPham = ?`
            const [data] = await db.query(query,[info,ID])

            return data

        } catch (error) {
            console.log(error)
           return []
        }
      
    },

    auction_bid:async (staffID,auctionID) => {
        try {
            var query = `INSERT INTO phiendaugia(MaNhanVien, MaSanPham) VALUES (?, ?)`
            const [data] = await db.query(query,[staffID,auctionID])

            return data

        } catch (error) {
            console.log(error)
           return []
        }
      
    },

    auction_bid_check:async (BidID) => {
        try {
            var query = `SELECT p.MaPhienDauGia,p.GiaThapNhat,p.MaNguoiBan,p.TrangThai , s.NganSachToiDa, s.BuocGia FROM phiendaugia as p LEFT JOIN sanphamdangky as s on p.MaSanPham = s.MaSanPham WHERE p.MaPhienDauGia = ?;`
            const [data] = await db.query(query,[BidID])

            return data[0]

        } catch (error) {
            console.log(error)
           return []
        }
      
    },

    auction_bid_join:async (UserID,BidID,price) => {
        try {
            var query = `INSERT INTO lichsudaugia(MaPhienDauGia, MaNguoiBan, GiaDaDauGia) VALUES (?,?,?)`
            const [data] = await db.query(query,[BidID,UserID,price])
            
            await db.query(`UPDATE phiendaugia SET GiaThapNhat=?,MaNguoiBan=? WHERE MaPhienDauGia = ?`,[price,UserID,BidID])

            return data

        } catch (error) {
            console.log(error)
           return []
        }
      
    },

    history_buy:async (UserID) => {
        try {
            var query = `select * from thanhtoan where MaNguoiDung =?`
            const [data] = await db.query(query,[UserID])

            return data

        } catch (error) {
            console.log(error)
           return []
        }
      
    },

    history_bid:async (UserID) => {
        try {
            var query = `SELECT MIN(l.GiaDaDauGia) as GiaDaDauGia,l.MaPhienDauGia, DATE_FORMAT(l.ThoiGianDauGia, '%H:%i %d/%m/%Y') as ThoiGian ,p.TrangThai,p.GiaThapNhat,p.MaNguoiBan, sp.TieuDe FROM lichsudaugia as l LEFT JOIN nguoidung as n on n.MaNguoiDung = l.MaNguoiBan LEFT JOIN phiendaugia as p on p.MaPhienDauGia = l.MaPhienDauGia LEFT JOIN sanphamdangky as sp on sp.MaSanPham = p.MaSanPham WHERE l.MaNguoiBan = ? GROUP BY l.MaPhienDauGia, l.MaNguoiBan ORDER BY l.ThoiGianDauGia DESC;`
            const [data] = await db.query(query,[UserID])

            return data

        } catch (error) {
            console.log(error)
           return []
        }
      
    },

   

  
}

module.exports = AuctionModel