import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import SpeedIcon from "@mui/icons-material/Speed";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CustomButton from "./button/button";

const benefits = [
  {
    icon: <SpeedIcon sx={{ fontSize: 40 }} />,
    title: "Tăng năng suất gấp 3 lần với AI văn phòng",
    description:
      "Học cách sử dụng AI để tự động hóa các công việc thường xuyên, giúp tăng năng suất lên gấp đôi",
  },
  {
    icon: <WorkIcon sx={{ fontSize: 40 }} />,
    title: "Tiết kiệm thời gian soạn thảo, báo cáo, slide, marketing",
    description:
      "Mở rộng cơ hội việc làm với kỹ năng AI được săn đón trong thị trường lao động hiện nay",
  },
  {
    icon: <SchoolIcon sx={{ fontSize: 40 }} />,
    title: "Chứng chỉ uy tín",
    description:
      "Nhận chứng chỉ chuẩn OpenAI, được công nhận bởi các doanh nghiệp hàng đầu",
  },
  {
    icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
    title: "Biết cách đặt câu hỏi thông minh với ChatGPT",
    description:
      "Cập nhật kiến thức mới nhất về AI, giúp bạn luôn đi đầu trong lĩnh vực công nghệ",
  },
];

const Benefit = () => {
  return (
    <Box
      sx={{
        py: { xs: 4, md: 8 },
        backgroundColor: "#f5f5f5",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          align="center"
          sx={{
            mb: { xs: 4, md: 6 },
            fontSize: { xs: "1.5rem", sm: "2.25rem", md: "2.5rem" },
            fontWeight: "bold",
            color: "#0E2148",

            textAlign: "center",
          }}
        >
          Lợi ích khi tham gia khóa học
        </Typography>

        <Grid
          container
          spacing={{ xs: 2, md: 4 }}
          justifyContent="center"
          alignItems="stretch"
        >
          {benefits.map((benefit, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  width: { xs: "300px", md: "800px" },
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 3,
                  },
                }}
              >
                <CardContent
                  sx={{
                    flexGrow: 1,
                    textAlign: "center",
                    p: { xs: 2, md: 3 },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%", // Fix width
                    maxWidth: "100%", // Avoid overflow
                  }}
                >
                  <Box
                    sx={{
                      color: "#FFB800",
                      mb: 2,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {benefit.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                      mb: 2,
                      fontWeight: "bold",
                      fontSize: { xs: "1.1rem", md: "1.25rem" },
                      color: "#0E2148",
                    }}
                  >
                    {benefit.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontSize: { xs: "0.875rem", md: "1rem" },
                      lineHeight: 1.6,
                    }}
                  >
                    {benefit.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            mt: { xs: 4, md: 6 },
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CustomButton title="Đăng ký ngay" animation="shake" />
        </Box>
      </Container>
    </Box>
  );
};

export default Benefit;
