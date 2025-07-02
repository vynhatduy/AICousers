import {
  Backdrop,
  CircularProgress,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { createPortal } from "react-dom";

export const LoadingPopup = ({ open }) => {
  return createPortal(
    <Backdrop
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 2000,
        color: "#ddd",
      }}
      open={open}
    >
      <CircularProgress color="inherit" />
      <Typography>Vui lòng đợi</Typography>
    </Backdrop>,
    document.body
  );
};
