import { useRef, useState, useCallback } from "react";
const apiBase = import.meta.env.BASE_URL + "services/api";
export default function useChatbot() {
  const [messages, setMessages] = useState([]);
  const [botBuffer, setBotBuffer] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const [isConnected, setIsConnected] = useState(true);

  const botBufferRef = useRef("");
  const abortControllerRef = useRef(null);

  const normalizeNewlines = (text) => {
    // Tách văn bản bằng dấu chấm đôi và cách (dùng để phân chia các khóa học)
    const items = text
      .split(/\.\.\s?/)
      .map((item) => item.trim())
      .filter(Boolean);

    if (items.length < 2) return text.trim(); // nếu không phải danh sách thì giữ nguyên

    // Gắn số thứ tự và nối lại bằng xuống dòng
    const numbered = items.map((item, index) => `${index + 1}. ${item}`);
    return numbered.join("\n");
  };

  const sendMessage = useCallback(async (text) => {
    if (!text?.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text }]);
    setBotBuffer("");
    botBufferRef.current = "";
    setIsTyping(true);
    setError(null);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await fetch(`${apiBase}/chatbot_stream.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
        signal: controller.signal,
      });

      if (!response.ok) setError("Lỗi hệ thống hoặc không thể gọi chatbot.");

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";
      let hasBotResponse = false;

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        buffer += chunk;
        const parts = buffer.split("\n\n");
        buffer = parts.pop() || ""; // giữ lại phần chưa hoàn chỉnh

        for (const part of parts) {
          if (part.startsWith("data: ")) {
            const text = part.replace("data: ", "");
            botBufferRef.current += text;
            setBotBuffer(botBufferRef.current); // cập nhật liên tục
            hasBotResponse = true;
          } else if (part.startsWith("event: done")) {
            const finalText = normalizeNewlines(botBufferRef.current.trim());
            if (finalText) {
              setMessages((prev) => [
                ...prev,
                { sender: "bot", text: finalText },
              ]);
            }
            setIsTyping(false);
            setBotBuffer("");
            botBufferRef.current = "";
            abortControllerRef.current = null;
          }
        }
      }

      // Trường hợp không có event: done (phòng hờ)
      const finalText = normalizeNewlines(botBufferRef.current.trim());
      if (finalText) {
        setMessages((prev) => [...prev, { sender: "bot", text: finalText }]);
      }

      if (!hasBotResponse) {
        setError("Đã xảy ra lỗi. Vui lòng thử lại sau.");
      }

      setIsTyping(false);
      setBotBuffer("");
      botBufferRef.current = "";
      abortControllerRef.current = null;
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("Stream bị hủy bởi người dùng");
      } else {
        console.error("Lỗi fetch stream:", err);
        setError("Lỗi hệ thống hoặc không thể gọi chatbot.");
      }
      setIsTyping(false);
    }
  }, []);

  const stopStreaming = useCallback(() => {
    abortControllerRef.current?.abort();
    const finalText = normalizeNewlines(botBufferRef.current.trim());
    if (finalText) {
      setMessages((prev) => [...prev, { sender: "bot", text: finalText }]);
    }
    setIsTyping(false);
    setBotBuffer("");
    botBufferRef.current = "";
    abortControllerRef.current = null;
    console.log("Đã dừng stream");
  }, []);

  return {
    messages,
    isTyping,
    error,
    sendMessage,
    stopStreaming,
    botBuffer,
    isConnected,
  };
}
