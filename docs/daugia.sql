-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th5 13, 2025 lúc 11:51 AM
-- Phiên bản máy phục vụ: 10.4.27-MariaDB
-- Phiên bản PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `daugia`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `danhmuc`
--

CREATE TABLE `danhmuc` (
  `MaDanhMuc` int(11) NOT NULL,
  `TenDanhMuc` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hinhanh`
--

CREATE TABLE `hinhanh` (
  `MaAnhSanPham` int(11) NOT NULL,
  `MaSanPham` int(11) DEFAULT NULL,
  `TenAnh` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `lichsudaugia`
--

CREATE TABLE `lichsudaugia` (
  `MaLichSu` int(11) NOT NULL,
  `MaPhienDauGia` int(11) DEFAULT NULL,
  `MaNguoiBan` int(11) DEFAULT NULL,
  `GiaDaDauGia` decimal(18,2) NOT NULL,
  `ThoiGianDauGia` timestamp NOT NULL DEFAULT current_timestamp(),
  `TrangThaiDauGia` int(11) DEFAULT 1,
  `MoTa` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nguoidung`
--

CREATE TABLE `nguoidung` (
  `MaNguoiDung` int(11) NOT NULL,
  `MaPhuongXa` int(11) DEFAULT NULL,
  `HoVaTen` varchar(255) NOT NULL DEFAULT 'UserName',
  `Mota` text DEFAULT NULL,
  `Email` varchar(255) NOT NULL,
  `MatKhau` varchar(255) NOT NULL,
  `SoDienThoai` varchar(15) DEFAULT NULL,
  `DiaChi` text DEFAULT NULL,
  `Avatar` varchar(255) NOT NULL DEFAULT 'default.jpg',
  `Bid` int(11) NOT NULL DEFAULT 0,
  `NgaySinh` date DEFAULT NULL,
  `GioiTinh` enum('Nam','Nữ','Khác') DEFAULT NULL,
  `TrangThai` tinyint(4) DEFAULT 1,
  `VaiTro` varchar(50) DEFAULT 'User',
  `NgayTao` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `nguoidung`
--

INSERT INTO `nguoidung` (`MaNguoiDung`, `MaPhuongXa`, `HoVaTen`, `Mota`, `Email`, `MatKhau`, `SoDienThoai`, `DiaChi`, `Avatar`, `Bid`, `NgaySinh`, `GioiTinh`, `TrangThai`, `VaiTro`, `NgayTao`) VALUES
(1, NULL, 'Admin', NULL, 'nhom11@gmail.com', '123123', NULL, NULL, 'default.jpg', 100, NULL, 'Nam', 1, 'Admin', '2025-05-13 04:58:37'),
(2, NULL, 'Quan Nguyen', NULL, 'maviess10@gmail.com', '123123', NULL, NULL, 'default.jpg', 200, NULL, NULL, 1, 'User', '2025-05-13 05:00:41');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phiendaugia`
--

CREATE TABLE `phiendaugia` (
  `MaPhienDauGia` int(11) NOT NULL,
  `MaNhanVien` int(11) DEFAULT NULL,
  `MaSanPham` int(11) DEFAULT NULL,
  `TrangThaiHoatDong` tinyint(4) DEFAULT 1,
  `TrangThaiXoa` tinyint(4) DEFAULT 0,
  `GiaThapNhat` decimal(18,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phuongxa`
--

CREATE TABLE `phuongxa` (
  `MaPhuongXa` int(11) NOT NULL,
  `MaQuanHuyen` int(11) DEFAULT NULL,
  `TenPhuongXa` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `phuongxa`
--

INSERT INTO `phuongxa` (`MaPhuongXa`, `MaQuanHuyen`, `TenPhuongXa`) VALUES
(1, 1, 'Hải Châu 1'),
(2, 1, 'Hải Châu 2'),
(3, 1, 'Thanh Bình'),
(4, 1, 'Thuận Phước'),
(5, 1, 'Hòa Thuận Tây'),
(6, 1, 'Hòa Thuận Đông'),
(7, 1, 'Nam Dương'),
(8, 1, 'Phước Ninh'),
(9, 1, 'Bình Hiên'),
(10, 1, 'Bình Thuận'),
(11, 2, 'Tam Thuận'),
(12, 2, 'Thanh Khê Tây'),
(13, 2, 'Thanh Khê Đông'),
(14, 2, 'Xuân Hà'),
(15, 2, 'Tân Chính'),
(16, 2, 'Thạc Gián'),
(17, 2, 'Chính Gián'),
(18, 2, 'Vĩnh Trung'),
(19, 2, 'An Khê'),
(20, 2, 'Hòa Khê'),
(21, 3, 'An Hải Bắc'),
(22, 3, 'An Hải Tây'),
(23, 3, 'An Hải Đông'),
(24, 3, 'Mân Thái'),
(25, 3, 'Nại Hiên Đông'),
(26, 3, 'Phước Mỹ'),
(27, 3, 'Thọ Quang'),
(28, 4, 'Hòa Hải'),
(29, 4, 'Hòa Quý'),
(30, 4, 'Khuê Mỹ'),
(31, 4, 'Mỹ An'),
(32, 5, 'Hòa Hiệp Bắc'),
(33, 5, 'Hòa Hiệp Nam'),
(34, 5, 'Hòa Khánh Bắc'),
(35, 5, 'Hòa Khánh Nam'),
(36, 5, 'Hòa Minh'),
(37, 6, 'Hòa An'),
(38, 6, 'Hòa Phát'),
(39, 6, 'Hòa Thọ Đông'),
(40, 6, 'Hòa Thọ Tây'),
(41, 6, 'Hòa Xuân'),
(42, 6, 'Khuê Trung'),
(43, 7, 'Hòa Bắc'),
(44, 7, 'Hòa Châu'),
(45, 7, 'Hòa Khương'),
(46, 7, 'Hòa Liên'),
(47, 7, 'Hòa Nhơn'),
(48, 7, 'Hòa Ninh'),
(49, 7, 'Hòa Phong'),
(50, 7, 'Hòa Phú'),
(51, 7, 'Hòa Sơn'),
(52, 7, 'Hòa Tiến');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `quanhuyen`
--

CREATE TABLE `quanhuyen` (
  `MaQuanHuyen` int(11) NOT NULL,
  `TenQuanHuyen` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `quanhuyen`
--

INSERT INTO `quanhuyen` (`MaQuanHuyen`, `TenQuanHuyen`) VALUES
(1, 'Hải Châu'),
(2, 'Thanh Khê'),
(3, 'Sơn Trà'),
(4, 'Ngũ Hành Sơn'),
(5, 'Liên Chiểu'),
(6, 'Cẩm Lệ'),
(7, 'Hòa Vang');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sanphamdangky`
--

CREATE TABLE `sanphamdangky` (
  `MaSanPham` int(11) NOT NULL,
  `MaNguoiMua` int(11) DEFAULT NULL,
  `MaDanhMuc` int(11) DEFAULT NULL,
  `TieuDe` varchar(255) NOT NULL,
  `MoTa` text DEFAULT NULL,
  `NganSachToiDa` decimal(18,2) NOT NULL,
  `TrangThai` int(11) DEFAULT 0,
  `NgayDangKy` timestamp NOT NULL DEFAULT current_timestamp(),
  `NgayBatDau` datetime DEFAULT NULL,
  `NgayKetThuc` datetime DEFAULT NULL,
  `PhanHoi` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `sanphamdangky`
--

INSERT INTO `sanphamdangky` (`MaSanPham`, `MaNguoiMua`, `MaDanhMuc`, `TieuDe`, `MoTa`, `NganSachToiDa`, `TrangThai`, `NgayDangKy`, `NgayBatDau`, `NgayKetThuc`, `PhanHoi`) VALUES
(1, 2, NULL, 'Mua nhà', '<p><strong>asdasdasdsaasd</strong></p><ol><li>123123</li><li>123123</li><li>123123</li><li>22asda</li></ol>', '1000000.00', 0, '2025-05-13 08:29:42', '2025-05-13 15:29:00', '2025-05-27 15:29:00', NULL),
(2, 2, NULL, 'Mua nhà', '<p><strong>asdasdasdsaasd</strong></p><ol><li>123123</li><li>123123</li><li>123123</li><li>22asda</li></ol>', '100000000.00', 0, '2025-05-13 08:30:32', '2025-05-13 15:29:00', '2025-05-27 15:29:00', NULL),
(3, 2, NULL, 'Xây nhà', '<p><strong>ádasda123</strong></p><ol><li>123123123</li><li>ádasd</li><li>ádasd</li><li>ádasd</li><li>ád</li><li><br></li></ol>', '100000000.00', 0, '2025-05-13 08:50:51', '2025-05-14 15:50:00', '2025-05-27 15:29:00', NULL),
(4, 2, NULL, 'test', '<p>ádasdasasdasdsa</p><p>ádasd</p><p>áda</p><p>ds</p>', '9999999.00', 0, '2025-05-13 08:52:41', '2025-05-13 19:52:00', '2025-05-20 15:52:00', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `thanhtoan`
--

CREATE TABLE `thanhtoan` (
  `MaThanhToan` int(11) NOT NULL,
  `MaNguoiDung` int(11) NOT NULL,
  `NoiDung` varchar(255) DEFAULT NULL,
  `Key` varchar(255) NOT NULL,
  `TrangThai` int(1) DEFAULT 0,
  `NgayTao` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `thanhtoan`
--

INSERT INTO `thanhtoan` (`MaThanhToan`, `MaNguoiDung`, `NoiDung`, `Key`, `TrangThai`, `NgayTao`) VALUES
(1, 1, 'Mua Goi bid $50', '4f1121ed7aff861ea9244f46e9df1fbe', 1, '2025-05-13 07:32:56'),
(2, 1, 'Mua Goi bid $50', '5a1243d98207fa6151eeb691fa0e303c', 1, '2025-05-13 07:35:04'),
(3, 1, 'Mua Goi bid $50', 'e70726f52fceb35541ba6c330e9d13d9', 1, '2025-05-13 07:56:36');

-- --------------------------------------------------------


--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `danhmuc`
--
ALTER TABLE `danhmuc`
  ADD PRIMARY KEY (`MaDanhMuc`);

--
-- Chỉ mục cho bảng `hinhanh`
--
ALTER TABLE `hinhanh`
  ADD PRIMARY KEY (`MaAnhSanPham`),
  ADD KEY `MaSanPham` (`MaSanPham`);

--
-- Chỉ mục cho bảng `lichsudaugia`
--
ALTER TABLE `lichsudaugia`
  ADD PRIMARY KEY (`MaLichSu`),
  ADD KEY `MaPhienDauGia` (`MaPhienDauGia`),
  ADD KEY `MaNguoiBan` (`MaNguoiBan`);

--
-- Chỉ mục cho bảng `nguoidung`
--
ALTER TABLE `nguoidung`
  ADD PRIMARY KEY (`MaNguoiDung`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD UNIQUE KEY `SoDienThoai` (`SoDienThoai`),
  ADD KEY `MaPhuongXa` (`MaPhuongXa`);

--
-- Chỉ mục cho bảng `phiendaugia`
--
ALTER TABLE `phiendaugia`
  ADD PRIMARY KEY (`MaPhienDauGia`),
  ADD KEY `MaSanPham` (`MaSanPham`),
  ADD KEY `FK_PhienDauGia_NguoiDung` (`MaNhanVien`);

--
-- Chỉ mục cho bảng `phuongxa`
--
ALTER TABLE `phuongxa`
  ADD PRIMARY KEY (`MaPhuongXa`),
  ADD KEY `MaQuanHuyen` (`MaQuanHuyen`);

--
-- Chỉ mục cho bảng `quanhuyen`
--
ALTER TABLE `quanhuyen`
  ADD PRIMARY KEY (`MaQuanHuyen`);

--
-- Chỉ mục cho bảng `sanphamdangky`
--
ALTER TABLE `sanphamdangky`
  ADD PRIMARY KEY (`MaSanPham`),
  ADD KEY `MaNguoiMua` (`MaNguoiMua`),
  ADD KEY `MaDanhMuc` (`MaDanhMuc`);

--
-- Chỉ mục cho bảng `thanhtoan`
--
ALTER TABLE `thanhtoan`
  ADD PRIMARY KEY (`MaThanhToan`),
  ADD KEY `MaNguoiDung` (`MaNguoiDung`);


--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `danhmuc`
--
ALTER TABLE `danhmuc`
  MODIFY `MaDanhMuc` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `hinhanh`
--
ALTER TABLE `hinhanh`
  MODIFY `MaAnhSanPham` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `lichsudaugia`
--
ALTER TABLE `lichsudaugia`
  MODIFY `MaLichSu` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `nguoidung`
--
ALTER TABLE `nguoidung`
  MODIFY `MaNguoiDung` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `phiendaugia`
--
ALTER TABLE `phiendaugia`
  MODIFY `MaPhienDauGia` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `phuongxa`
--
ALTER TABLE `phuongxa`
  MODIFY `MaPhuongXa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT cho bảng `quanhuyen`
--
ALTER TABLE `quanhuyen`
  MODIFY `MaQuanHuyen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `sanphamdangky`
--
ALTER TABLE `sanphamdangky`
  MODIFY `MaSanPham` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `thanhtoan`
--
ALTER TABLE `thanhtoan`
  MODIFY `MaThanhToan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `hinhanh`
--
ALTER TABLE `hinhanh`
  ADD CONSTRAINT `hinhanh_ibfk_1` FOREIGN KEY (`MaSanPham`) REFERENCES `sanphamdangky` (`MaSanPham`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `lichsudaugia`
--
ALTER TABLE `lichsudaugia`
  ADD CONSTRAINT `lichsudaugia_ibfk_1` FOREIGN KEY (`MaPhienDauGia`) REFERENCES `phiendaugia` (`MaPhienDauGia`) ON DELETE CASCADE,
  ADD CONSTRAINT `lichsudaugia_ibfk_2` FOREIGN KEY (`MaNguoiBan`) REFERENCES `nguoidung` (`MaNguoiDung`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `nguoidung`
--
ALTER TABLE `nguoidung`
  ADD CONSTRAINT `nguoidung_ibfk_1` FOREIGN KEY (`MaPhuongXa`) REFERENCES `phuongxa` (`MaPhuongXa`) ON DELETE SET NULL;

--
-- Các ràng buộc cho bảng `phiendaugia`
--
ALTER TABLE `phiendaugia`
  ADD CONSTRAINT `FK_PhienDauGia_NguoiDung` FOREIGN KEY (`MaNhanVien`) REFERENCES `nguoidung` (`MaNguoiDung`),
  ADD CONSTRAINT `phiendaugia_ibfk_1` FOREIGN KEY (`MaNhanVien`) REFERENCES `daugianguoc`.`nhanvien` (`MaNhanVien`) ON DELETE SET NULL,
  ADD CONSTRAINT `phiendaugia_ibfk_2` FOREIGN KEY (`MaSanPham`) REFERENCES `sanphamdangky` (`MaSanPham`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `phuongxa`
--
ALTER TABLE `phuongxa`
  ADD CONSTRAINT `phuongxa_ibfk_1` FOREIGN KEY (`MaQuanHuyen`) REFERENCES `quanhuyen` (`MaQuanHuyen`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `sanphamdangky`
--
ALTER TABLE `sanphamdangky`
  ADD CONSTRAINT `sanphamdangky_ibfk_1` FOREIGN KEY (`MaNguoiMua`) REFERENCES `nguoidung` (`MaNguoiDung`) ON DELETE SET NULL,
  ADD CONSTRAINT `sanphamdangky_ibfk_2` FOREIGN KEY (`MaDanhMuc`) REFERENCES `danhmuc` (`MaDanhMuc`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `thanhtoan`
--
ALTER TABLE `thanhtoan`
  ADD CONSTRAINT `ThanhToan_ibfk_1` FOREIGN KEY (`MaNguoiDung`) REFERENCES `nguoidung` (`MaNguoiDung`) ON DELETE CASCADE;



/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
