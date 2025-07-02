import {
  Grid,
  Typography,
  Box,
  Container,
  keyframes,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import Background from "../assets/bgBanner.jpg";
import OfferPopup from "./popup/offerPopup";

const HeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const [open, setOpen] = useState(false);

  const title = [
    { id: 1, text: "Nâng cao hiệu suất với AI và dữ liệu thông minh" },
  ];

  const subtitle = [
    {
      id: 1,
      text: "Khóa học dành riêng cho chủ doanh nghiệp & nhân sự văn phòng và cấp chứng chỉ chuẩn OpenAI",
    },
    // { id: 2, text: " và cấp chứng chỉ chuẩn OpenAI" },
  ];

  const shake = keyframes`
    0% { transform: translateX(0); }
    20% { transform: translateX(-5px); }
    40% { transform: translateX(5px); }
    60% { transform: translateX(-5px); }
    80% { transform: translateX(5px); }
    100% { transform: translateX(0); }
  `;

  return (
    <Box
      id="intro"
      sx={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        scrollMarginTop: "80px",
      }}
    >
      {/* Background Image */}
      <Box
        component="img"
        src={Background}
        alt="Background"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <Container
        sx={{
          position: "relative",
          height: "100%",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          pt: { xs: 10, sm: 15, md: "150px" },
        }}
      >
        <Box
          display="flex"
          flexDirection={{ xs: "column", lg: "row" }}
          justifyContent="center"
          alignItems="center"
          width="100%"
          gap={{ xs: 4, md: 6 }}
          px={2}
        >
          {/* Text Section */}
          <Box
            sx={{
              maxWidth: { xs: "100%", md: "65%" },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            {title.map((item) => (
              <Typography
                key={item.id}
                sx={{
                  color: "#FFB800",
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "4rem" },
                  fontWeight: "bold",
                  mb: { xs: 2, sm: 3 },
                  lineHeight: 1.2,
                }}
              >
                {item.text}
              </Typography>
            ))}

            {subtitle.map((item) => (
              <Typography
                align="justify"
                key={item.id}
                sx={{
                  fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                  color: "white",
                  mb: { xs: 1, sm: 1.5 },
                  lineHeight: 1.5,
                }}
              >
                {item.text}
              </Typography>
            ))}
          </Box>

          {/* Statistics Box */}
          <Box
            sx={{
              width: {
                xs: "100%",
                sm: "80%",
                md: "50%",
                lg: "30%",
              },
              height: {
                xs: "auto",
                sm: "auto",
                md: "50vh",
              },
              boxShadow: "0 8px 8px rgba(68, 27, 235, 0.3)",
              backgroundImage: "linear-gradient(135deg, #4579e2, #0d1b51)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              borderRadius: "25px",
              color: "white",
              p: 3,
              textAlign: "center",
            }}
          >
            <Box
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              justifyContent="space-evenly"
              alignItems="center"
              gap={{ xs: 2, sm: 0 }}
            >
              <Box>
                <Typography variant="h4" fontWeight="bold">
                  100 +
                </Typography>
                <Typography>Doanh nghiệp</Typography>
              </Box>
              <Box>
                <Typography variant="h4" fontWeight="bold">
                  200 +
                </Typography>
                <Typography>Buổi đào tạo</Typography>
              </Box>
            </Box>
            <Box mt={3}>
              <Typography variant="h4" fontWeight="bold">
                32000 +
              </Typography>
              <Typography>Học viên đã học</Typography>
            </Box>
          </Box>
        </Box>
        <Button
          sx={{
            width: { xs: "90%", sm: "350px", md: "400px" },
            height: { xs: "45px", sm: "60px", md: "70px" },
            backgroundColor: "#FFB800",
            fontSize: { xs: "0.9rem", sm: "1.25rem", md: "1.5rem" },
            fontWeight: "bold",
            mt: { xs: 3, sm: 4, md: 5 },
            borderRadius: "8px",
            mx: { xs: "auto", md: "unset" },
            display: "block",
            "&:hover": {
              backgroundColor: "#E6A600",
              transform: "scale(1.05)",
              transition: "all 0.3s ease",
            },
            animation: `${shake} 0.6s infinite`,
          }}
          variant="contained"
          disableElevation
          onClick={() => setOpen(true)}
        >
          Đăng ký ngay
        </Button>
        <OfferPopup open={open} onClose={() => setOpen(false)} />
      </Container>
    </Box>
  );
};

export default HeroSection;
