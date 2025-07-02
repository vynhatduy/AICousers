import { Box, Typography } from "@mui/material";
import React from "react";
import certificate from "../assets/certificate.jfif";
import heroBg from "../assets/hero-bg.jpg";
const Certificate = () => {
  return (
    <Box
      p={2}
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.4)), url('${heroBg}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        textAlign: "center",
        color: "#fff",
      }}
      textAlign="center"
      color="white"
    >
      <Box
        component="img"
        src={certificate}
        alt="Chứng nhận kiến thức nền tảng về AI – Theo chuẩn kiểm định kỹ thuật của OpenAI Foundation"
        sx={{
          width: {
            xs: "90%", // nhỏ hơn ở thiết bị di động
            sm: "80%",
            md: "70%",
          },
          borderRadius: 4,
          boxShadow: 3,
          mb: 2,
        }}
      />

      <Typography
        variant="body5"
        fontWeight="200"
        sx={{
          maxWidth: "800px",
          fontSize: "16px",
          // lineHeight: 1.6,
          fontStyle: "italic",
        }}
      >
        Chứng nhận kiến thức nền tảng về AI – Theo chuẩn kiểm định kỹ thuật của
        OpenAI Foundation
      </Typography>
    </Box>
  );
};

export default Certificate;
