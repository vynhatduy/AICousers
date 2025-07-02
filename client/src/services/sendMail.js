import emailjs from "emailjs-com";
import axios from "axios";

const VITE_SOCKET_SERVER_URL =
  import.meta.env.VITE_SOCKET_SERVER_URL || window.location.origin;

export const SendMail = async (data) => {
  try {
    const response = await axios.post(`/api/send-email`, data);

    console.log(response);
    return {
      success: true,
      message: "Đăng ký thành công.",
      response,
    };
  } catch (error) {
    console.error("Lỗi gửi email:", error);
    return {
      success: false,
      message: "Gửi email thất bại.",
      error,
    };
  }
};
