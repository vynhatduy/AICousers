import { useEffect, useRef, useState, useCallback } from "react";
import { io } from "socket.io-client";

const VITE_SOCKET_SERVER_URL =
  import.meta.env.VITE_SOCKET_SERVER_URL ?? window.location.origin;

export default function useChatbot() {
  const [messages, setMessages] = useState([]);
  const [botBuffer, setBotBuffer] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const socketRef = useRef(null);
  const botBufferRef = useRef("");
  const [isConnected, setIsConnected] = useState(false);

  const sendMessage = useCallback((text) => {
    if (!text?.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text }]);
    setBotBuffer("");
    botBufferRef.current = "";
    setIsTyping(true);
    setError(null);
    socketRef.current?.emit("user_message", text);
  }, []);

  const stopStreaming = useCallback(() => {
    socketRef.current?.emit("user_stop");
    if (botBufferRef.current) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: botBufferRef.current },
      ]);
    }
    setIsTyping(false);
    setBotBuffer("");
    botBufferRef.current = "";
    console.log(" Đã gửi tín hiệu dừng stream");
  }, []);

  useEffect(() => {
    const socket = io(VITE_SOCKET_SERVER_URL, {
      transports: ["websocket"],
      autoConnect: true,
      forceNew: false,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 20000,
    });

    socketRef.current = socket;

    console.log(VITE_SOCKET_SERVER_URL);
    console.log(socket);

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      setIsConnected(true);
      setError(null); // Xóa lỗi nếu kết nối lại thành công
    });

    socket.on("bot_reply", (char) => {
      botBufferRef.current += char;
      setBotBuffer((prev) => prev + char);
    });

    socket.on("bot_reply_done", () => {
      const finalBotText = botBufferRef.current;
      setMessages((prev) => [...prev, { sender: "bot", text: finalBotText }]);
      setIsTyping(false);
      setBotBuffer("");
      botBufferRef.current = "";
    });

    socket.on("bot_reply_error", (msg) => {
      setError(msg || "Đã xảy ra lỗi trong quá trình xử lý.");
      setIsTyping(false);
    });

    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
      setIsConnected(false);
      setIsTyping(false);
      if (reason === "io server disconnect") {
        socket.connect();
      }
    });
    socket.on("connect_error", (err) => {
      console.error("Kết nối thất bại:", err);

      setError("Không thể kết nối với máy chủ. Vui lòng kiểm tra mạng.");
    });

    socket.on("reconnect", (attemptNumber) => {
      console.log("Reconnected after", attemptNumber, "attempts");
      setIsConnected(true);
      setError(null);
    });

    socket.on("reconnect_error", (err) => {
      console.error("Reconnection failed:", err);
      setError("Mất kết nối với máy chủ. Đang thử kết nối lại...");
    });

    return () => {
      console.log("Cleaning up socket connection");
      socket.disconnect();
    };
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
