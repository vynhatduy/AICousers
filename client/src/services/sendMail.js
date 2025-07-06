import axios from "axios";

export const SendMail = async (data) => {
  try {
    const response = await axios.post(`/services/api/send_mail.php`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return {
      success: true,
      message: response.data.message || "Gửi email thành công.",
    };
  } catch (error) {
    let message = "Gửi email thất bại.";
    let detailedError = null;

    if (error.response) {
      message = error.response.data?.message || message;
      detailedError = error.response.data?.error || null;
    } else {
      detailedError = error.message;
    }

    return {
      success: false,
      message,
      error: detailedError,
    };
  }
};
