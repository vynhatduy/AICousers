import {
  Box,
  Button,
  Input,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import {
  SmartToy as BotIcon,
  Menu as MenuIcon,
  Send as SendIcon,
  Person as UserIcon,
  Stop as Stop,
} from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";

// demo data
const messages = [
  // { sender: "bot", text: "Xin chào! Tôi có thể giúp gì cho bạn hôm nay?" },
  // { sender: "user", text: "Cho tôi biết thêm về **khóa học AI**." },
  // {
  //   sender: "bot",
  //   text: "Chúng tôi có các khóa học AI cơ bản, nâng cao, và chuyên sâu cho doanh nghiệp.",
  // },
  // { sender: "bot", text: "Xin chào! Tôi có thể giúp gì cho bạn hôm nay?" },
  // { sender: "user", text: "Cho tôi biết thêm về **khóa học AI**." },
  // {
  //   sender: "bot",
  //   text: "Chúng tôi có các khóa học AI cơ bản, nâng cao, và chuyên sâu cho doanh nghiệp.",
  // },
  // { sender: "bot", text: "Xin chào! Tôi có thể giúp gì cho bạn hôm nay?" },
  // { sender: "user", text: "Cho tôi biết thêm về **khóa học AI**." },
  // {
  //   sender: "bot",
  //   text: "Chúng tôi có các khóa học AI cơ bản, nâng cao, và chuyên sâu cho doanh nghiệp.",
  // },
  // { sender: "bot", text: "Xin chào! Tôi có thể giúp gì cho bạn hôm nay?" },
  // { sender: "user", text: "Cho tôi biết thêm về **khóa học AI**." },
  // {
  //   sender: "bot",
  //   text: "Chúng tôi có các khóa học AI cơ bản, nâng cao, và chuyên sâu cho doanh nghiệp.",
  // },
  // { sender: "bot", text: "Xin chào! Tôi có thể giúp gì cho bạn hôm nay?" },
  // { sender: "user", text: "Cho tôi biết thêm về **khóa học AI**." },
  // {
  //   sender: "bot",
  //   text: "Chúng tôi có các khóa học AI cơ bản, nâng cao, và chuyên sâu cho doanh nghiệp.",
  // },
];

export const Chatbot = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isOpenChatbot, setIsOpenChatbot] = useState(false);
  const [isAsk, setIsAsk] = useState(false);
  const messagesEndRef = useRef < HTMLDivElement > null;
  const [showMenu, setShowMenu] = useState(false);
  const [userAsk, setUserAsk] = useState("");
  //   useEffect(() => {
  //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  //   }, [messages]);
  const handleButtonClick = () => {
    if (isAsk) {
      handleStopAsk();
      setIsAsk(false);
    } else if (!isAsk) {
      if (userAsk !== null) {
        setIsAsk(true);
        setUserAsk("");
        handleSend(userAsk);
      } else {
        return;
      }
    }
  };

  const handleToggleMenu = () => {
    setShowMenu((prev) => !prev);
  };
  const handleOpenChatHistory = () => {};
  const handleEndSession = () => {};
  const handleToggleChatbot = () => {
    setIsOpenChatbot((prev) => !prev);
  };

  const handleTextChange = (e) => {
    setUserAsk(e.target.value);
  };
  const handleSend = (data) => {
    messages.push({ sender: "user", text: data });
    messages.push({ sender: "bot", text: `Câu hỏi ${data} rất hay` });

    setIsAsk(false);
  };
  const handleStopAsk = () => {
    console.log("Dừng câu trả lời");
  };
  return (
    <>
      {!isOpenChatbot ? (
        <Box
          sx={{
            width: "80px", // 100% viewport width on mobile, 25% on desktop
            height: "80px",
            position: "fixed",
            bottom: 0,
            marginRight: isMobile ? 4 : 6,
            marginBottom: isMobile ? 4 : 6,
            right: 0,
            backgroundColor: "white",
            boxShadow: "-2px 0 8px rgba(0,0,0,0.2)",
            zIndex: 1300,
            display: "flex",
            flexDirection: "column",
          }}
          borderRadius="50%"
        >
          <Button onClick={handleToggleChatbot} sx={{ margin: "auto" }}>
            <BotIcon sx={{ color: "#FFB800", width: "50px", height: "50px" }} />
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            width: isMobile ? "100vw" : "500px", // 100% viewport width on mobile, 25% on desktop
            height: isMobile ? "100vh" : "80vh",
            position: "fixed",
            bottom: 0,
            marginRight: isMobile ? 0 : 6,
            marginBottom: isMobile ? 0 : 6,
            right: 0,
            backgroundColor: "white",
            boxShadow: "-2px 0 8px rgba(0,0,0,0.2)",
            zIndex: 1300,
            display: "flex",
            flexDirection: "column",
          }}
          borderRadius="20px"
        >
          {/* Header */}
          <Box
            width="100%"
            backgroundColor="#2B67B0"
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            height="80px"
            borderRadius="20px 20px 0px 0px"
            sx={{ flexShrink: 0 }}
          >
            <Box p={{ xs: 2, md: 3 }} display="flex" alignItems="center">
              <BotIcon sx={{ color: "#FFB800", mr: 2 }} fontSize="large" />

              <Typography
                sx={{ color: "#FFB800", mr: 2 }}
                fontSize={25}
                mt="5px"
              >
                AI Chatbot
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Button onClick={handleToggleMenu}>
                <MenuIcon sx={{ color: "#FFB800", mr: 4 }} fontSize="large" />
                {showMenu && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: "100%", // bên dưới button
                      right: 0, // căn phải so với Box cha (chatbot)
                      backgroundColor: "#fff",
                      boxShadow: 3,
                      borderRadius: 1,
                      zIndex: 10,
                      mt: 1,
                      minWidth: 150,
                      maxWidth: 300,
                      color: "#000",
                    }}
                  >
                    <Box
                      sx={{
                        px: 2,
                        py: 1,
                        cursor: "pointer",
                        "&:hover": { backgroundColor: "#f0f0f0" },
                      }}
                      onClick={() => handleOpenChatHistory}
                    >
                      Lịch sử đoạn
                    </Box>
                    <Box
                      sx={{
                        px: 2,
                        py: 1,
                        cursor: "pointer",
                        "&:hover": { backgroundColor: "#f0f0f0" },
                      }}
                      onClick={() => handleEndSession}
                    >
                      Kết thúc phiên
                    </Box>
                    <Box
                      sx={{
                        px: 2,
                        py: 1,
                        cursor: "pointer",
                        "&:hover": { backgroundColor: "#f0f0f0" },
                      }}
                      onClick={handleToggleChatbot}
                    >
                      Thoát
                    </Box>
                  </Box>
                )}
              </Button>
            </Box>
          </Box>
          {/* body */}
          <Box
            // sx={{
            //   width: "100%",
            //   height: "100%",
            //   flexGrow: 1,
            //   backgroundColor: "#f9f9f9",
            //   display: "flex",
            //   flexDirection: "column",
            //   justifyContent: "flex-end",
            //   overflowY: "auto",

            //   px: 2,
            //   py: 2,
            // }}
            sx={{
              px: 2,
              py: 2,
              overflowY: "auto",
              flexGrow: 1,
              backgroundColor: "#f9f9f9",
            }}
          >
            {(messages.length === 0
              ? [
                  {
                    sender: "bot",
                    text: "Xin chào! Tôi có thể giúp gì cho bạn?",
                  },
                ]
              : messages
            ).map((msg, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent:
                    msg.sender === "user" ? "flex-end" : "flex-start",
                  mb: 1,
                }}
              >
                {msg.sender === "bot" && (
                  <BotIcon
                    sx={{ alignSelf: "flex-end", mr: 1, color: "#2B67B0" }}
                  />
                )}
                <Box
                  sx={{
                    maxWidth: "80%",
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    backgroundColor:
                      msg.sender === "user" ? "#1976d2" : "#e0e0e0",
                    color: msg.sender === "user" ? "white" : "black",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  <Markdown>{msg.text}</Markdown>
                </Box>
                {msg.sender === "user" && (
                  <UserIcon
                    sx={{ alignSelf: "flex-end", ml: 1, color: "#1976d2" }}
                  />
                )}
              </Box>
            ))}
          </Box>

          {/* Footer */}
          <Box
            sx={{
              width: "100%",
              backgroundColor: "white",
              minHeight: 80,
              maxHeight: 200,
              display: "flex",
              flexShrink: 0,
              justifyContent: "center",
              alignItems: "center", // giúp căn giữa cả theo chiều dọc
              px: 2, // padding left & right cho mobile
            }}
            borderRadius="0 0 20px 20px"
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                maxWidth: 800,
                borderRadius: "25px",
                border: "1px solid #000",
                alignItems: "center",
                px: 1,
                py: 1,
              }}
            >
              <Input
                placeholder="Chat bất cứ điều gì về trang web"
                disableUnderline
                sx={{
                  flex: 1,
                  fontSize: 16,
                  marginLeft: 2,
                }}
                value={userAsk}
                multiline
                maxRows={2}
                onChange={handleTextChange}
              />
              <Button onClick={handleButtonClick}>
                {isAsk ? (
                  <Stop
                    sx={{ fontSize: 28, color: "#FFB800", cursor: "pointer" }}
                  />
                ) : (
                  <SendIcon
                    sx={{ fontSize: 28, color: "#FFB800", cursor: "pointer" }}
                  />
                )}
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};
