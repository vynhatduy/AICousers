import { Box, CircularProgress, Typography } from "@mui/material";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import UserIcon from "@mui/icons-material/Person";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
const MessageBubble = ({ sender, text }) => {
  const isUser = sender === "user";
  const cleanText = text.replace(/\n{3,}/g, "\n\n").trim();

  const renderContent = () => {
    if (text === "__typing__") {
      return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <CircularProgress size={16} />
          <Typography variant="body2">Bot đang trả lời...</Typography>
        </Box>
      );
    }

    if (text === "__error__") {
      return (
        <Typography variant="body2" color="error">
          ⚠️ Lỗi hệ thống khi gọi API.
        </Typography>
      );
    }

    return (
      <Box
        sx={{
          "& ul": {
            paddingLeft: 2,
            marginBottom: 0,
            marginTop: 0,
          },
          "& ol": {
            paddingLeft: 2,
            marginBottom: 0,
            marginTop: 0,
          },
          "& li": {
            marginBottom: 0.5,
          },
        }}
      >
        <Markdown remarkPlugins={[remarkGfm]}>{cleanText}</Markdown>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        mb: 1,
      }}
    >
      {!isUser && (
        <SupportAgentIcon
          sx={{ alignSelf: "flex-end", mr: 1, color: "#2B67B0" }}
        />
      )}
      <Box
        sx={{
          maxWidth: "80%",
          px: 2,
          py: 1,
          borderRadius: 2,
          backgroundColor: isUser ? "#1976d2" : "#e0e0e0",
          color: isUser ? "white" : "black",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        {renderContent()}
      </Box>
      {isUser && (
        <UserIcon sx={{ alignSelf: "flex-end", ml: 1, color: "#1976d2" }} />
      )}
    </Box>
  );
};

export default MessageBubble;
