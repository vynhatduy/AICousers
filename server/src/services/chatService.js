import openai from "../config/openai.config.js";
import DetectLanguage from "detectlanguage";

import { dataVn } from "../static/vn/data.js";
import { dataEn } from "../static/en/data.js";

const detectLanguage = new DetectLanguage(process.env.DETECT_LANGUAGE_API_KEY);

export async function streamBotReply(userMessage, socket, abortSignal) {
  let langCode = "en";
  try {
    const detections = await detectLanguage.detect(userMessage);
    langCode = detections?.[0]?.language || "en";
  } catch (error) {
    console.error("Language detection error:", error.message);
  }

  const isVietnamese = langCode === "vi";
  console.log("langCode:", langCode, "| isVietnamese:", isVietnamese);

  const data = isVietnamese ? dataVn : dataEn;

  const prompt = isVietnamese
    ? `
Bạn là một trợ lý AI thông minh của Suri Technologies.

Chỉ sử dụng thông tin bên dưới để trả lời câu hỏi của người dùng.

❗ Nếu không tìm thấy thông tin phù hợp, hãy lịch sự từ chối trả lời.

❗ *Bắt buộc phải trả lời bằng đúng ngôn ngữ mà người dùng sử dụng trong câu hỏi.* Không được tự ý dịch sang ngôn ngữ khác.

Tuyệt đối không phỏng đoán, suy diễn hay bịa đặt thông tin ngoài dữ liệu tham chiếu.

Thông tin tham khảo: ${JSON.stringify(data)}
`.trim()
    : `
You are an intelligent AI assistant of Suri Technologies.

Only use the information below to answer user questions.

❗ Your task is to strictly answer in **English** if the user’s question is in English. Do not respond in Vietnamese, even if the reference contains Vietnamese content.

❗ If relevant information is not found, politely say you don't know.

❗ Never translate or switch language unless the user explicitly asks.

❗ Never speculate or hallucinate information. Just stick to the data.

Reference data: ${JSON.stringify(data)}
`.trim();

  try {
    const response = await openai.chat.completions.create(
      {
        model: process.env.API_MODEL || "gpt-4.1-nano",
        stream: true,
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: userMessage },
        ],
      },
      { signal: abortSignal }
    );

    for await (const chunk of response) {
      const content = chunk.choices?.[0]?.delta?.content;
      if (abortSignal.aborted) {
        console.log("Stream đã bị huỷ giữa chừng");
        return;
      }

      if (content && socket?.emit) {
        for (const char of content) {
          socket.emit("bot_reply", char);
        }
      }

      if (chunk.choices?.[0]?.finish_reason === "stop") {
        socket?.emit?.("bot_reply_done");
      }
    }
  } catch (error) {
    if (abortSignal.aborted) {
      console.log("Stream bị hủy (AbortController)");
    } else {
      console.error("OpenAI error:", error.message);
      socket?.emit?.("bot_reply_error", "Lỗi hệ thống khi gọi API.");
    }
  }
}
