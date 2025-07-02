// CustomButton.jsx
/** @jsxImportSource @emotion/react */
import { keyframes } from "@emotion/react";
import { Box, Button as MuiButton } from "@mui/material";
import { useState } from "react";
import OfferPopup from "../popup/offerPopup";

// Định nghĩa keyframes trước
const animations = {
  pulse: keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  `,
  flash: keyframes`
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  `,
  bounce: keyframes`
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  `,
  shake: keyframes`
  0% { transform: translateX(0); }
  20% { transform: translateX(-5px); }
  40% { transform: translateX(5px); }
  60% { transform: translateX(-5px); }
  80% { transform: translateX(5px); }
  100% { transform: translateX(0); }
`,
};

const CustomButton = ({ title, animation }) => {
  const [open, setOpen] = useState(false);
  return (
    <Box display="flex" mt={4} justifyContent="center">
      <MuiButton
        sx={{
          backgroundColor: "#FFB800",
          color: "#fff",
          padding: "16px 45px",
          fontWeight: "bold",
          borderRadius: "8px",
          textTransform: "none",
          animation:
            animation && animations[animation]
              ? `${animations[animation]} 1s infinite`
              : "none",
          "&:hover": {
            backgroundColor: "#e6a700",
          },
        }}
        onClick={() => setOpen(true)}
      >
        {title}
      </MuiButton>
      <OfferPopup open={open} onClose={() => setOpen(false)} />
    </Box>
  );
};

export default CustomButton;
