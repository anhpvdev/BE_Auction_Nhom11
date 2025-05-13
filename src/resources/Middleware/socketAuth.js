const jwt = require("jsonwebtoken");

async function socketAuth(socket, next) {
    try {
        // Lấy cookie từ handshake headers
        const cookies = socket.handshake.headers.cookie;
        const token = getCookie("AU2D_nt3h", cookies);

        if (!token) {
            console.log("Unauthorized: No token provided");
            return next();
        }

        // Giải mã token
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                console.log("Token verification failed:", err.message);
                return next();
            }

            // Lưu thông tin user vào socket để sử dụng trong các sự kiện khác
            socket.user = decoded;
            next();
        });

    } catch (error) {
        console.log("Socket Auth Error:", error.message);
        return next(new Error("Unauthorized"));
    }
}

// Hàm lấy cookie từ chuỗi cookie
function getCookie(name, cookies) {
    if (!cookies) return null;
    const match = cookies.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? match[2] : null;
}

module.exports = socketAuth;
