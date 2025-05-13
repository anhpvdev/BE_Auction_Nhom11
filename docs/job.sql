CREATE EVENT IF NOT EXISTS capnhat_trangthai_phiendaugia
ON SCHEDULE EVERY 1 MINUTE
DO
  UPDATE phiendaugia p
  JOIN sanphamdangky s ON p.MaSanPham = s.MaSanPham
  SET p.TrangThai = 0
  WHERE s.NgayKetThuc < NOW() AND p.TrangThai != 0;


SET GLOBAL event_scheduler = ON;