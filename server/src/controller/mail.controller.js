import { sendContactMail } from "../services/sendMaid.js";

export async function sendMailController(req, res) {
  try {
    const { name, email, phone, position, company } = req.body;

    // Validate dữ liệu đầu vào (có thể thêm nhiều điều kiện hơn)
    if (!name || !email || !phone || !position || !company) {
      return res.status(400).json({ error: "Thiếu thông tin yêu cầu" });
    }

    const subject = `Đăng ký khóa học AI - ${name}`;

    const result = await sendContactMail({
      name,
      email,
      phone,
      position,
      company,
      subject,
    });

    return res.status(200).json({
      message: "Gửi email thành công",
      result,
    });
  } catch (error) {
    console.error("Lỗi gửi mail:", error);
    return res.status(500).json({
      error: "Gửi mail thất bại. Vui lòng thử lại sau.",
    });
  }
}
