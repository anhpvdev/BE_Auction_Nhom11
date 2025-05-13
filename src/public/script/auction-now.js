// Bắt đầu từ 2 giờ 30 phút 45 giây → tính ra tổng số giây
let totalSeconds = (2 * 3600) + (30 * 60) + 45;

function formatTime(seconds) {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
}

function updateCountdown() {
    const countdownEl = document.getElementById('countdown');
    countdownEl.textContent = formatTime(totalSeconds);

    if (totalSeconds > 0) {
        totalSeconds--;
    } else {
        clearInterval(timer);
        countdownEl.textContent = "Đã hết thời gian!";
    }
}

// Cập nhật ngay lập tức + mỗi 1 giây
updateCountdown(); // hiển thị ban đầu
const timer = setInterval(updateCountdown, 1000);
