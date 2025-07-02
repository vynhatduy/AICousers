import { Box, Button, MenuItem, Typography } from "@mui/material";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
const ChatHeader = ({ showMenu, onToggleMenu, onClose }) => {
  return (
    <Box
      width="100%"
      backgroundColor="#2B67B0"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      height="80px"
      borderRadius="20px 20px 0px 0px"
      px={2}
      flexShrink={0}
    >
      <Box display="flex" alignItems="center">
        <SupportAgentIcon sx={{ color: "#FFB800", mr: 2 }} fontSize="large" />
        <Typography sx={{ color: "#FFB800", fontSize: 25 }}>Suri AI</Typography>
      </Box>
      <Box position="relative">
        <Button onClick={onClose}>
          <CloseIcon sx={{ color: "#FFB800" }} fontSize="large" />
        </Button>
      </Box>
    </Box>
  );
};

export default ChatHeader;
