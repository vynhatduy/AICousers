import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider,
  Avatar,
  useTheme,
  useMediaQuery,
  Chip,
} from "@mui/material";
import {
  Send as SendIcon,
  Menu as MenuIcon,
  SmartToy as BotIcon,
  Person as PersonIcon,
  History as HistoryIcon,
  ExitToApp as ExitIcon,
} from "@mui/icons-material";
import ReactMarkdown from "react-markdown";

// Mock chat history data
const mockChatHistory = [
  { id: 1, title: "Weather Discussion", date: "2024-06-17" },
  { id: 2, title: "Recipe Help", date: "2024-06-16" },
  { id: 3, title: "Travel Planning", date: "2024-06-15" },
  { id: 4, title: "Tech Support", date: "2024-06-14" },
];

// Mock bot responses
const mockResponses = [
  "Hello! I'm your AI assistant. How can I help you today? 😊",
  "That's a great question! Let me think about that for a moment...\n\n**Here's what I think:**\n- First, consider the context\n- Then, analyze the options\n- Finally, make an informed decision",
  "I understand your concern. Here's a **step-by-step approach**:\n\n1. Start with the basics\n2. Build upon your foundation\n3. Practice regularly\n\n*Remember, consistency is key!*",
  "Interesting point! Here are some **key considerations**:\n\n- **Performance**: Always important\n- **Usability**: User experience matters\n- **Scalability**: Think long-term\n\nWhat specific aspect would you like to explore further?",
  "Thanks for sharing that! Here's my analysis:\n\n```javascript\n// Example code\nconst solution = (problem) => {\n  return problem.solve();\n};\n```\n\nThis approach should work well for your use case.",
];

// Chat Header Component
const ChatHeader = ({ onMenuClick }) => {
  return (
    <AppBar position="static" sx={{ bgcolor: "primary.main" }}>
      <Toolbar>
        <BotIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          AI Chatbot
        </Typography>
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          onClick={onMenuClick}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

// Message Component
const Message = ({ message, isBot, isStreaming }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isBot ? "flex-start" : "flex-end",
        mb: 2,
        px: 2,
      }}
    >
      {isBot && (
        <Avatar sx={{ bgcolor: "primary.main", mr: 1, mt: 0.5 }}>
          <BotIcon />
        </Avatar>
      )}
      <Paper
        elevation={1}
        sx={{
          p: 2,
          maxWidth: "70%",
          bgcolor: isBot ? "grey.100" : "primary.main",
          color: isBot ? "text.primary" : "primary.contrastText",
          borderRadius: 2,
          position: "relative",
        }}
      >
        {isBot ? (
          <ReactMarkdown
            components={{
              p: ({ children }) => (
                <Typography
                  variant="body2"
                  sx={{ mb: 1, "&:last-child": { mb: 0 } }}
                >
                  {children}
                </Typography>
              ),
              strong: ({ children }) => (
                <Typography component="span" sx={{ fontWeight: "bold" }}>
                  {children}
                </Typography>
              ),
              em: ({ children }) => (
                <Typography component="span" sx={{ fontStyle: "italic" }}>
                  {children}
                </Typography>
              ),
              code: ({ children }) => (
                <Typography
                  component="code"
                  sx={{
                    bgcolor: "grey.200",
                    px: 0.5,
                    py: 0.25,
                    borderRadius: 0.5,
                    fontFamily: "monospace",
                    fontSize: "0.875rem",
                  }}
                >
                  {children}
                </Typography>
              ),
              pre: ({ children }) => (
                <Paper
                  sx={{
                    bgcolor: "grey.900",
                    color: "white",
                    p: 2,
                    mt: 1,
                    borderRadius: 1,
                    overflow: "auto",
                  }}
                >
                  <Typography
                    component="pre"
                    sx={{ fontFamily: "monospace", fontSize: "0.875rem", m: 0 }}
                  >
                    {children}
                  </Typography>
                </Paper>
              ),
              ul: ({ children }) => (
                <Box component="ul" sx={{ pl: 2, mb: 1 }}>
                  {children}
                </Box>
              ),
              ol: ({ children }) => (
                <Box component="ol" sx={{ pl: 2, mb: 1 }}>
                  {children}
                </Box>
              ),
              li: ({ children }) => (
                <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
                  {children}
                </Typography>
              ),
            }}
          >
            {message}
          </ReactMarkdown>
        ) : (
          <Typography variant="body2">{message}</Typography>
        )}
        {isStreaming && (
          <Box
            sx={{
              display: "inline-block",
              width: 2,
              height: 20,
              bgcolor: "primary.main",
              ml: 0.5,
              animation: "blink 1s infinite",
            }}
          />
        )}
      </Paper>
      {!isBot && (
        <Avatar sx={{ bgcolor: "secondary.main", ml: 1, mt: 0.5 }}>
          <PersonIcon />
        </Avatar>
      )}
    </Box>
  );
};

// Chat Body Component
const ChatBody = ({ messages, streamingMessage, isStreaming }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingMessage]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        overflow: "auto",
        py: 2,
        bgcolor: "background.default",
      }}
    >
      {messages.map((msg, index) => (
        <Message
          key={index}
          message={msg.content}
          isBot={msg.isBot}
          isStreaming={false}
        />
      ))}
      {isStreaming && streamingMessage && (
        <Message message={streamingMessage} isBot={true} isStreaming={true} />
      )}
      <div ref={messagesEndRef} />
    </Box>
  );
};

// Chat Footer Component
const ChatFooter = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        bgcolor: "background.paper",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", gap: 1 }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={disabled}
          multiline
          maxRows={4}
          size="small"
        />
        <IconButton
          type="submit"
          color="primary"
          disabled={!message.trim() || disabled}
          sx={{ alignSelf: "flex-end" }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

// Main Chatbot Component
const ChatbotInterface = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [messages, setMessages] = useState([
    {
      content: "Hello! I'm your AI assistant. How can I help you today? 😊",
      isBot: true,
    },
  ]);
  const [streamingMessage, setStreamingMessage] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sessionId, setSessionId] = useState(1);

  // Streaming effect
  const streamResponse = async (response) => {
    setIsStreaming(true);
    setStreamingMessage("");

    const chars = response.split("");
    for (let i = 0; i < chars.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 20)); // Adjust speed here
      setStreamingMessage((prev) => prev + chars[i]);
    }

    // Add final message to messages array
    setMessages((prev) => [...prev, { content: response, isBot: true }]);
    setIsStreaming(false);
    setStreamingMessage("");
  };

  const handleSendMessage = async (messageContent) => {
    // Add user message
    const userMessage = { content: messageContent, isBot: false };
    setMessages((prev) => [...prev, userMessage]);

    // Simulate bot response after a short delay
    setTimeout(() => {
      const randomResponse =
        mockResponses[Math.floor(Math.random() * mockResponses.length)];
      streamResponse(randomResponse);
    }, 500);
  };

  const handleMenuClick = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleChatHistory = () => {
    setDrawerOpen(true);
    handleMenuClose();
  };

  const handleEndSession = () => {
    setMessages([
      {
        content: "Hello! I'm your AI assistant. How can I help you today? 😊",
        isBot: true,
      },
    ]);
    setSessionId((prev) => prev + 1);
    handleMenuClose();
  };

  const handleHistoryItemClick = (historyItem) => {
    // Simulate loading a previous chat session
    setMessages([
      {
        content: `Welcome back! Continuing our conversation about ${historyItem.title}.`,
        isBot: true,
      },
    ]);
    setDrawerOpen(false);
  };

  return (
    <>
      <style>
        {`
          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }
        `}
      </style>
      <Box
        sx={{
          position: isMobile ? "fixed" : "fixed",
          top: 0,
          right: 0,
          width: isMobile ? "100%" : "25%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.default",
          zIndex: isMobile ? 1300 : 1000,
          boxShadow: isMobile ? "none" : 3,
        }}
      >
        <ChatHeader onMenuClick={handleMenuClick} />

        <ChatBody
          messages={messages}
          streamingMessage={streamingMessage}
          isStreaming={isStreaming}
        />

        <ChatFooter onSendMessage={handleSendMessage} disabled={isStreaming} />

        {/* Menu */}
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleChatHistory}>
            <HistoryIcon sx={{ mr: 2 }} />
            Chat History
          </MenuItem>
          <MenuItem onClick={handleEndSession}>
            <ExitIcon sx={{ mr: 2 }} />
            End Session
          </MenuItem>
        </Menu>

        {/* Chat History Drawer */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          PaperProps={{
            sx: { width: isMobile ? "80%" : 300 },
          }}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Chat History
            </Typography>
            <Divider />
          </Box>
          <List>
            {mockChatHistory.map((item) => (
              <ListItem key={item.id} disablePadding>
                <ListItemButton onClick={() => handleHistoryItemClick(item)}>
                  <ListItemText primary={item.title} secondary={item.date} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>

      {/* Background overlay for mobile */}
      {isMobile && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            bgcolor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
        />
      )}
    </>
  );
};

export default ChatbotInterface;
