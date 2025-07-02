import { Box, Button, Input } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import StopIcon from "@mui/icons-material/Stop";

const ChatFooter = ({
  isTyping,
  isAsk,
  userAsk,
  onChangeText,
  onSend,
  isConnected,
  onStop,
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "white",
        minHeight: 80,
        display: "flex",
        alignItems: "center",
        px: 2,
        borderRadius: "0 0 20px 20px",
      }}
      flexShrink={0}
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
          sx={{ flex: 1, fontSize: 16, marginLeft: 2 }}
          value={userAsk}
          multiline
          maxRows={2}
          onChange={(e) => onChangeText(e.target.value)}
        />
        <Button
          onClick={() => {
            if (!isConnected) return;
            isTyping ? onStop() : onSend();
          }}
        >
          {isTyping ? (
            <StopIcon sx={{ fontSize: 28, color: "#FFB800" }} />
          ) : (
            <SendIcon sx={{ fontSize: 28, color: "#FFB800" }} />
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default ChatFooter;
