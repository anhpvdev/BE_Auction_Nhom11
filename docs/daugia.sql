-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th5 30, 2025 lúc 10:03 AM
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

--
-- Đang đổ dữ liệu cho bảng `danhmuc`
--

INSERT INTO `danhmuc` (`MaDanhMuc`, `TenDanhMuc`) VALUES
(1, 'Phần mềm'),
(2, 'Xây dựng'),
(3, 'Đồ gia dụng'),
(4, 'Thời trang');

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

--
-- Đang đổ dữ liệu cho bảng `lichsudaugia`
--

INSERT INTO `lichsudaugia` (`MaLichSu`, `MaPhienDauGia`, `MaNguoiBan`, `GiaDaDauGia`, `ThoiGianDauGia`, `TrangThaiDauGia`, `MoTa`) VALUES
(5, 2, 3, '100000.00', '2025-05-28 07:44:43', 1, NULL),
(6, 2, 3, '99900.00', '2025-05-28 07:51:42', 1, NULL),
(7, 4, 3, '9999990.00', '2025-05-28 08:08:46', 1, NULL),
(8, 6, 2, '9900.00', '2025-05-28 12:08:28', 1, NULL),
(9, 6, 2, '9000.00', '2025-05-28 12:10:09', 1, NULL),
(10, 6, 2, '8500.00', '2025-05-28 13:21:22', 1, NULL),
(11, 6, 2, '8400.00', '2025-05-28 13:23:48', 1, NULL),
(12, 6, 4, '8300.00', '2025-05-28 13:25:42', 1, NULL),
(13, 6, 2, '8200.00', '2025-05-28 13:25:51', 1, NULL),
(14, 7, 1, '9900.00', '2025-05-29 07:33:15', 1, NULL),
(15, 7, 1, '9800.00', '2025-05-29 07:33:23', 1, NULL),
(16, 4, 5, '9000000.00', '2025-05-30 07:05:03', 1, NULL),
(17, 6, 5, '8000.00', '2025-05-30 07:12:08', 1, NULL),
(18, 6, 1, '7900.00', '2025-05-30 07:12:43', 1, NULL),
(19, 6, 5, '7800.00', '2025-05-30 07:12:49', 1, NULL),
(20, 6, 1, '7700.00', '2025-05-30 07:12:53', 1, NULL),
(21, 6, 2, '7500.00', '2025-05-30 07:14:29', 1, NULL);

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
(1, NULL, 'Admin', NULL, 'nhom11@gmail.com', '123123', NULL, NULL, 'default.jpg', 96, NULL, 'Nam', 1, 'Admin', '2025-05-13 04:58:37'),
(2, NULL, 'Việt Anh Phan A', NULL, 'maviess10@gmail.com', '123123', NULL, NULL, '2.jpg', 150, NULL, 'Nam', 1, 'User', '2025-05-13 05:00:41'),
(3, NULL, 'tesst A', NULL, 'a@gmail.com', '123123', NULL, NULL, 'default.jpg', 195, NULL, 'Nam', 1, 'Staff', '2025-05-13 10:12:37'),
(4, NULL, 'UserName', NULL, 'b@gmail.com', '123123', NULL, NULL, 'default.jpg', 99, NULL, NULL, 1, 'User', '2025-05-13 10:12:53'),
(5, NULL, 'UserName', NULL, 'c@gmail.com', '123123', NULL, NULL, 'default.jpg', 97, NULL, NULL, 1, 'User', '2025-05-13 10:13:00'),
(6, NULL, 'Fake Juu', NULL, 'fosher269@gmail.com', '123123', NULL, NULL, 'default.jpg', 0, NULL, 'Nam', 1, 'User', '2025-05-30 02:52:27');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phiendaugia`
--

CREATE TABLE `phiendaugia` (
  `MaPhienDauGia` int(11) NOT NULL,
  `MaNhanVien` int(11) DEFAULT NULL,
  `MaSanPham` int(11) DEFAULT NULL,
  `TrangThai` tinyint(4) DEFAULT 1,
  `TrangThaiXoa` tinyint(4) DEFAULT 0,
  `GiaThapNhat` decimal(18,2) DEFAULT NULL,
  `MaNguoiBan` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `phiendaugia`
--

INSERT INTO `phiendaugia` (`MaPhienDauGia`, `MaNhanVien`, `MaSanPham`, `TrangThai`, `TrangThaiXoa`, `GiaThapNhat`, `MaNguoiBan`) VALUES
(2, 1, 3, 0, 0, '99900.00', 3),
(3, 1, 2, 0, 0, '0.00', NULL),
(4, 1, 4, 1, 0, '9000000.00', 5),
(5, 3, 1, 0, 0, '0.00', NULL),
(6, 1, 7, 0, 0, '7500.00', 2),
(7, 1, 9, 1, 0, '9800.00', 1);

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
  `BuocGia` decimal(18,0) NOT NULL DEFAULT 0,
  `TrangThai` int(11) DEFAULT 0,
  `NgayDangKy` timestamp NOT NULL DEFAULT current_timestamp(),
  `NgayBatDau` datetime DEFAULT NULL,
  `NgayKetThuc` datetime DEFAULT NULL,
  `PhanHoi` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `sanphamdangky`
--

INSERT INTO `sanphamdangky` (`MaSanPham`, `MaNguoiMua`, `MaDanhMuc`, `TieuDe`, `MoTa`, `NganSachToiDa`, `BuocGia`, `TrangThai`, `NgayDangKy`, `NgayBatDau`, `NgayKetThuc`, `PhanHoi`) VALUES
(1, 2, 2, 'Mua nhà Mặt tiền', '<p><strong>asdasdasdsaasd</strong></p><ol><li>123123</li><li>123123</li><li>123123</li><li>22asda</li></ol>', '1000000.00', '100', 1, '2025-05-13 08:29:42', '2025-05-13 15:29:00', '2025-05-27 15:29:00', NULL),
(2, 2, 2, 'Xây nhà 400m2', '<p><strong>asdasdasdsaasd 123</strong></p><ol><li>123123</li><li>123123</li><li>123123</li><li>22asda</li></ol>', '100000000.00', '50', 1, '2025-05-13 08:30:32', '2025-05-13 15:29:00', '2025-05-27 15:29:00', NULL),
(3, 2, 2, 'Mua 3 tấn vật liệu', '<p><strong>ádasda123</strong></p><ol><li>123123123</li><li>ádasd</li><li>ádasd</li><li>ádasd</li><li>ád</li><li><br></li></ol>', '123123.00', '100', 1, '2025-05-13 08:50:51', '2025-05-14 15:50:00', '2025-05-28 14:56:00', NULL),
(4, 2, 2, 'test', '<p>ádasdasasdasdsa</p><p>ádasd</p><p>áda</p><p>ds</p>', '9999999.00', '0', 1, '2025-05-13 08:52:41', '2025-05-06 19:52:00', '2025-05-31 00:00:00', NULL),
(7, 3, 1, 'Xây dựng website mua bán', '<p>ádasdsaasda</p><p>sdasdsa</p><p>ádasdas</p><p>ádasas</p><p>ádasdsad</p>', '10000.00', '100', 1, '2025-05-28 08:18:23', '2025-05-28 15:18:00', '2025-05-30 12:18:00', NULL),
(8, 3, 2, 'THiết kế app đọc truyện', '<p>ádasdassa</p><p>ádasdasd</p><p>ádasdsaasd</p><p>ádasdassada</p><p>ádasdasasds</p><p>ádasdsaasd</p>', '8000.00', '50', 2, '2025-05-28 08:36:15', '2025-05-28 15:36:00', '2025-05-30 15:36:00', 'yêu cầu chưa rõ ràng'),
(9, 2, 2, 'Thiết kế website quản lý', '<p>ádasdasdas</p><p>ádasdasasd</p><p>ádasasdasd</p><p>ádassdasd</p>', '10000.00', '100', 1, '2025-05-29 06:54:21', '2025-05-29 13:54:00', '2025-05-31 13:54:00', NULL);

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
(3, 2, 'Mua Goi bid $50', 'e70726f52fceb35541ba6c330e9d13d9', 1, '2025-05-13 07:56:36'),
(4, 2, 'Mua Goi bid $50', 'd90bc3d02b24f693ded7aa9c8c62647f', 1, '2025-05-28 08:33:14'),
(5, 3, 'Mua Goi bid $50', '0d7afa4fc2420b644706cd4b37a002b5', 0, '2025-05-28 08:34:57'),
(6, 3, 'Mua Goi bid $50', '0db6af768102a6fc87df8b70160e4a6e', 1, '2025-05-28 08:35:27'),
(7, 4, 'Mua Goi bid $50', 'db924be938850e40e549f5c84dcdf847', 1, '2025-05-28 13:25:12'),
(8, 5, 'Mua Goi bid $50', '5581c60bc7c6bcec790847f7b5b1fdbf', 1, '2025-05-30 07:03:49');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `thongbao`
--

CREATE TABLE `thongbao` (
  `MaThongBao` int(11) NOT NULL,
  `MaNguoiDung` int(11) DEFAULT NULL,
  `NoiDung` varchar(255) NOT NULL,
  `TrangThai` int(1) DEFAULT 0,
  `ThoiGian` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `thongbao`
--

INSERT INTO `thongbao` (`MaThongBao`, `MaNguoiDung`, `NoiDung`, `TrangThai`, `ThoiGian`) VALUES
(1, 2, 'Sản phẩm đấu giá của bạn đã được duyệt.', 0, '2025-05-29 07:02:24'),
(2, 2, 'Sản phẩm đấu giá của bạn đã được duyệt.', 0, '2025-05-29 08:10:14'),
(3, 2, 'Sản phẩm đấu giá của bạn đã bị từ chối.', 0, '2025-05-29 08:10:46'),
(4, 2, 'Sản phẩm đấu giá của bạn đã bị từ chối.', 0, '2025-05-29 08:59:32');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `thongtinthanhtoan`
--

CREATE TABLE `thongtinthanhtoan` (
  `MaNguoiDung` int(11) NOT NULL,
  `MaSoThue` varchar(50) DEFAULT NULL,
  `NgayDangKy` timestamp NOT NULL DEFAULT current_timestamp(),
  `TenTaiKhoan` varchar(255) DEFAULT NULL,
  `SoThe` varchar(50) DEFAULT NULL,
  `NganHang` varchar(255) DEFAULT NULL,
  `NgayHetHan` date DEFAULT NULL,
  `CVV` varchar(10) DEFAULT NULL,
  `DiaChiThanhToan` text DEFAULT NULL,
  `TrangThai` tinyint(4) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  ADD KEY `phiendaugia_ibfk_1` (`MaNhanVien`),
  ADD KEY `phiendaugia_ibfk_2` (`MaSanPham`),
  ADD KEY `phiendaugia_ibfk_3` (`MaNguoiBan`);

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
-- Chỉ mục cho bảng `thongbao`
--
ALTER TABLE `thongbao`
  ADD PRIMARY KEY (`MaThongBao`),
  ADD KEY `MaNguoiDung` (`MaNguoiDung`);

--
-- Chỉ mục cho bảng `thongtinthanhtoan`
--
ALTER TABLE `thongtinthanhtoan`
  ADD PRIMARY KEY (`MaNguoiDung`),
  ADD UNIQUE KEY `SoThe` (`SoThe`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `danhmuc`
--
ALTER TABLE `danhmuc`
  MODIFY `MaDanhMuc` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `hinhanh`
--
ALTER TABLE `hinhanh`
  MODIFY `MaAnhSanPham` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `lichsudaugia`
--
ALTER TABLE `lichsudaugia`
  MODIFY `MaLichSu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT cho bảng `nguoidung`
--
ALTER TABLE `nguoidung`
  MODIFY `MaNguoiDung` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `phiendaugia`
--
ALTER TABLE `phiendaugia`
  MODIFY `MaPhienDauGia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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
  MODIFY `MaSanPham` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `thanhtoan`
--
ALTER TABLE `thanhtoan`
  MODIFY `MaThanhToan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `thongbao`
--
ALTER TABLE `thongbao`
  MODIFY `MaThongBao` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
  ADD CONSTRAINT `phiendaugia_ibfk_1` FOREIGN KEY (`MaNhanVien`) REFERENCES `nguoidung` (`MaNguoiDung`) ON DELETE SET NULL,
  ADD CONSTRAINT `phiendaugia_ibfk_2` FOREIGN KEY (`MaSanPham`) REFERENCES `sanphamdangky` (`MaSanPham`) ON DELETE CASCADE,
  ADD CONSTRAINT `phiendaugia_ibfk_3` FOREIGN KEY (`MaNguoiBan`) REFERENCES `nguoidung` (`MaNguoiDung`) ON DELETE SET NULL;

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

--
-- Các ràng buộc cho bảng `thongbao`
--
ALTER TABLE `thongbao`
  ADD CONSTRAINT `thongbao_ibfk_1` FOREIGN KEY (`MaNguoiDung`) REFERENCES `nguoidung` (`MaNguoiDung`);

--
-- Các ràng buộc cho bảng `thongtinthanhtoan`
--
ALTER TABLE `thongtinthanhtoan`
  ADD CONSTRAINT `thongtinthanhtoan_ibfk_1` FOREIGN KEY (`MaNguoiDung`) REFERENCES `nguoidung` (`MaNguoiDung`) ON DELETE CASCADE;

DELIMITER $$
--
-- Sự kiện
--
CREATE DEFINER=`root`@`localhost` EVENT `capnhat_trangthai_phiendaugia` ON SCHEDULE EVERY 1 MINUTE STARTS '2025-05-30 14:11:46' ON COMPLETION NOT PRESERVE ENABLE DO UPDATE phiendaugia p
  JOIN sanphamdangky s ON p.MaSanPham = s.MaSanPham
  SET p.TrangThai = 0
  WHERE s.NgayKetThuc < NOW() AND p.TrangThai != 0$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
