const jwt = require("jsonwebtoken");
const UserModel = require("../Model/user"); // Import model của user
const { use } = require("passport");

const authen = (roles = []) => {
    return async (req, res, next) => {
        try {
            const token = req.cookies?.AU2D_nt3h;

            if (!token) {
                if (roles.length == 0) {
                    req.user = null; // Cho phép truy cập mà không cần đăng nhập
                    return next();
                }else{
                    return res.redirect('/login')
                }
            }

           

            // Giải mã token
            const decoded = jwt.verify(token, process.env.SECRET);

            if (!decoded || !decoded.ID) {
                return res.redirect('/login')
            }

            // Tìm user trong DB
            const user = await UserModel.getInfo_byId(decoded.ID);

            //check xem có user ko và có giống tài khoản ko
            if (!user || user?.Email != decoded.Email) {
                return res.redirect('/login')
            }

            // Kiểm tra trạng thái tài khoản nếu cần
            if (user.TrangThai === "bị khóa") {
                return res.status(403).json({ message: "Forbidden: Account is banned" });
            }


            if (roles.length > 0 && !roles.includes(user.VaiTro) && !roles.includes('ALL')) {
                return res.redirect('/login')
            }


            req.user = user; // Lưu thông tin user vào request
            next(); // Cho phép tiếp tục request
        } catch (error) {
            console.error("Authentication error:", error);
            return res.status(401).json({ message: "Unauthorized: Token verification failed" });
        }
    };
};

module.exports = { authen };