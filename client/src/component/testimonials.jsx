import { Box, Button, Grid, keyframes, Typography } from "@mui/material";
import React from "react";
import TapHuanTieuThuong from "../assets/Tap-huan-tieu-thuong-Q5.jpg";
import AI_HTV from "../assets/AI-HTV-4.jpg";
import BaoNguoiLaoDong from "../assets/Bao-Nguoi-Lao-Dong.jpg";
import DoanhNhan from "../assets/Doanh-Nhan.jpg";
import VNPT from "../assets/Lop-Content-VNPT-h3.jpg";
import { UserData } from "../data/userData";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonials = () => {
  const orgSlides = [
    {
      image: TapHuanTieuThuong,
      title: "Liên Đoàn Lao Động Bình Dương",
    },
    {
      image: AI_HTV,
      title: "Hiệp Hội Doanh nhân Bình Phước",
    },
    {
      image: BaoNguoiLaoDong,
      title: "Báo Người Lao Động",
    },
    {
      image: DoanhNhan,
      title: "Tập đoàn Thế Giới Di Động",
    },
    {
      image: VNPT,
      title: "Vietlott",
    },
    {
      image: BaoNguoiLaoDong,
      title: "Khu công nghiệp Viet Sing",
    },
  ];

  return (
    <Box
      sx={{
        color: "white",
        backgroundColor: "rgb(217 217 217)",
        opacity: 1,
        py: 4,
        px: 2,
      }}
    >
      <Typography
        variant="h5"
        fontWeight={600}
        textTransform="uppercase"
        mb={3}
        textAlign="center"
        color="#0E2148"
      >
        Các khóa học tiêu biểu
      </Typography>

      <Box sx={{ maxWidth: "1000px", mx: "auto", mb: 5 }}>
        <Slider
          dots={true}
          infinite={true}
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
          arrows={true}
          autoplay={true}
          autoplaySpeed={4000}
        >
          {orgSlides.map((item, index) => (
            <Box
              key={index}
              sx={{
                outline: "none",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: { xs: "300px", md: "500px" },
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={item.image}
                  alt={`org-${index}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </Box>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                mt={2}
                color="#0E2148"
                textAlign="center"
              >
                {item.title}
              </Typography>
            </Box>
          ))}
        </Slider>
      </Box>

      {/* Keyframes CSS for scrolling */}
      <style>
        {`
          @keyframes scrollLeft {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          /* Ẩn scrollbar (Chrome, Safari, Edge) */
          ::-webkit-scrollbar {
            display: none;
          }

          /* Firefox */
          * {
            scrollbar-width: none;
          }
        `}
      </style>
    </Box>
  );
};

export default Testimonials;
