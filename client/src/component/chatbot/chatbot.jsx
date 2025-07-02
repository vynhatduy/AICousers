import { useState, useRef } from "react";
import { Box, Button, useMediaQuery, useTheme } from "@mui/material";

import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { demoMessages } from "./constants";
import ChatHeader from "./chatHeader";
import ChatBody from "./chatBody";
import ChatFooter from "./chatFooter";

import useChatbot from "../../services/useChatbot";
const Chatbot = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isOpenChatbot, setIsOpenChatbot] = useState(false);
  const [isAsk, setIsAsk] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [userAsk, setUserAsk] = useState("");
  const messagesEndRef = useRef(null);

  const {
    messages, // danh sách tin nhắn
    sendMessage, // hàm gửi
    isTyping, // bot đang trả lời
    error, // lỗi (nếu có)
    stopStreaming,
    botBuffer,
    isConnected,
  } = useChatbot();
  const handleToggleChatbot = () => setIsOpenChatbot((prev) => !prev);
  const handleToggleMenu = () => setShowMenu((prev) => !prev);

  const handleSend = () => {
    if (!userAsk.trim()) return;
    sendMessage(userAsk); // dùng hook để gửi
    setUserAsk("");
  };
  const handleStopAsk = () => {
    stopStreaming();
  };
  const fullMessages = isTyping
    ? [...messages, { sender: "bot", text: botBuffer || "__typing__" }]
    : error
    ? [...messages, { sender: "bot", text: "__error__" }]
    : messages;

  return (
    <>
      {!isOpenChatbot ? (
        <Box
          sx={{
            width: "80px",
            height: "80px",
            position: "fixed",
            bottom: 0,
            right: 0,
            marginRight: isMobile ? 4 : 6,
            marginBottom: isMobile ? 4 : 6,
            backgroundColor: "white",
            boxShadow: "-2px 0 8px rgba(0,0,0,0.2)",
            zIndex: 1300,
            display: "flex",
            borderRadius: "50%",
          }}
        >
          <Button onClick={handleToggleChatbot} sx={{ margin: "auto" }}>
            <SupportAgentIcon
              sx={{ color: "#FFB800", width: "50px", height: "50px" }}
            />
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            width: isMobile ? "100vw" : "450px",
            height: isMobile ? "100vh" : "90vh",
            position: "fixed",
            bottom: 0,
            right: 0,
            marginRight: isMobile ? 0 : 6,
            marginBottom: isMobile ? 0 : 6,
            backgroundColor: "white",
            boxShadow: "-2px 0 8px rgba(0,0,0,0.2)",
            borderRadius: "20px",
            zIndex: 1300,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ChatHeader
            showMenu={showMenu}
            onToggleMenu={handleToggleMenu}
            onClose={handleToggleChatbot}
          />
          <ChatBody messages={fullMessages} isTyping={isTyping} error={error} />
          <ChatFooter
            isTyping={isTyping}
            isAsk={isAsk}
            userAsk={userAsk}
            isConnected={isConnected}
            onChangeText={setUserAsk}
            onSend={handleSend}
            onStop={handleStopAsk}
          />
        </Box>
      )}
    </>
  );
};

export default Chatbot;
