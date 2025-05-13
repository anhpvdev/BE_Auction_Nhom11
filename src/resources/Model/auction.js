const path = require('path')
// const connection = require('../../config/connect_db')

const db = require('../../config/connect_db');
const { use } = require('passport');
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
            console.log(error)
        }
      
    },

    cate_auction_work:async (page,type,category) => {
        try {




            var query = `SELECT p.MaPhienDauGia, p.TrangThai, p.MaSanPham , s.MaNguoiMua,n.HoVaTen,n.Avatar, s.TieuDe,s.MoTa,DATE_FORMAT(s.NgayBatDau, '%H:%i %d/%m/%Y') as NgayBatDau,DATE_FORMAT(s.NgayKetThuc, '%H:%i %d/%m/%Y') as NgayKetThuc FROM phiendaugia as p LEFT JOIN sanphamdangky as s on s.MaSanPham = p.MaSanPham LEFT JOIN nguoidung as n on n.MaNguoiDung = s.MaNguoiMua WHERE p.TrangThai = ? and s.MaDanhMuc = ? ORDER by s.NgayBatDau DESC`
            const [data] = await db.query(query,[type,category])

        

            return data

        } catch (error) {
            console.log(error)
            console.log(error)
        }
      
    },

    auction_detail:async (ID) => {
        try {




            var query = `SELECT MaSanPham,MaNguoiMua,MaDanhMuc,TieuDe,MoTa,NganSachToiDa,BuocGia,TrangThai,PhanHoi,DATE_FORMAT(NgayBatDau, '%Y-%m-%dT%H:%i') AS NgayBatDau, DATE_FORMAT(NgayKetThuc, '%Y-%m-%dT%H:%i') AS NgayKetThuc from sanphamdangky WHERE MaSanPham = ?`
            const [data] = await db.query(query,[ID])

            return data[0]

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

   

  
}

module.exports = AuctionModel