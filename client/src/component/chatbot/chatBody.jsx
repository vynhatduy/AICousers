import { Box } from "@mui/material";
import MessageBubble from "./messageBubble";
import { demoMessages } from "./constants"; // hoặc "../constants"

const ChatBody = ({ messages, isTyping, error }) => {
  const displayMessages = messages.length === 0 ? demoMessages : messages;

  return (
    <>
      {error && (
        <Box
          sx={{
            backgroundColor: "#ffe6e6",
            color: "#b00020",
            px: 2,
            py: 1,
            textAlign: "center",
            fontSize: 14,
          }}
        >
          ⚠️ {error}
        </Box>
      )}

      <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
        {displayMessages.map((msg, idx) => (
          <MessageBubble key={idx} sender={msg.sender} text={msg.text} />
        ))}
      </Box>
    </>
  );
};

export default ChatBody;
