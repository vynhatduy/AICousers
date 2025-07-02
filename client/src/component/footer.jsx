// Footer.js
import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Chip,
  Card,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import BusinessIcon from "@mui/icons-material/Business";
import logoSuri from "../assets/logoSuri.png";
import { contactInfo, officeLocations } from "../data/footer";
import Qr from "../assets/qr.jpg";

const Footer = () => {
  // Mapping function để convert string icon thành component
  const getIconComponent = (iconType) => {
    switch (iconType) {
      case "phone":
        return PhoneIcon;
      case "email":
        return EmailIcon;
      default:
        return EmailIcon;
    }
  };

  const services = [
    "Digital Transformation",
    "Cloud Solutions",
    "AI & Machine Learning",
    "Mobile Development",
    "Web Applications",
    "Data Analytics",
  ];

  return (
    <Box
      component="footer"
      sx={{
        background:
          "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        color: "white",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 0%, #FFB800 50%, transparent 100%)",
          opacity: 0.6,
        },
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: 0,
          left: { xs: "10%", md: "20%" },
          width: { xs: "80%", md: "60%" },
          height: { xs: "150px", md: "200px" },
          background:
            "radial-gradient(ellipse at center, rgba(255, 184, 0, 0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        },
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          zIndex: 2,
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        {/* Hero Section */}
        <Box sx={{ py: { xs: 4, sm: 6, md: 8 }, textAlign: "center" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: { xs: 4, md: 6 },
            }}
          >
            <Box
              component="img"
              src={logoSuri}
              alt="SuriTechs Logo"
              sx={{
                height: { xs: "80px", sm: "100px", md: "120px" },
                width: "auto",
                mb: { xs: 2, md: 3 },
                transform: "scale(2.5)",
              }}
            />
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                background: "linear-gradient(135deg, #FFB800 0%, #FFD700 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textAlign: "center",
                fontSize: {
                  xs: "1.5rem",
                  sm: "1.8rem",
                  md: "2.2rem",
                  lg: "2.5rem",
                },
                mb: { xs: 1.5, md: 2 },
                lineHeight: { xs: 1.3, md: 1.2 },
                px: { xs: 1, sm: 2 },
              }}
            >
              CÔNG TY TNHH TMDV SURI TECHNOLOGIES
            </Typography>
          </Box>

          {/* Services Tags */}
        </Box>
        {/* Main Content Grid */}
        <Grid
          sx={{ display: "flex", justifyContent: "center" }}
          container
          spacing={{ xs: 2, sm: 3, md: 4 }}
        >
          {/* Company Description Card */}
          <Grid item xs={12} lg={6}>
            <Card
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 184, 0, 0.2)",
                borderRadius: { xs: 2, md: 3 },
                p: { xs: 2.5, sm: 3, md: 4 },
                height: "100%",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  transform: { xs: "none", md: "translateY(-4px)" },
                  boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: { xs: 2, md: 3 },
                  flexDirection: { xs: "column", sm: "row" },
                  textAlign: { xs: "center", sm: "left" },
                  gap: { xs: 1, sm: 0 },
                }}
              >
                <RocketLaunchIcon
                  sx={{
                    color: "#FFB800",
                    fontSize: { xs: "1.8rem", md: "2rem" },
                    mr: { xs: 0, sm: 2 },
                  }}
                />
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: "#FFB800",
                    fontSize: { xs: "1.3rem", sm: "1.4rem", md: "1.5rem" },
                  }}
                >
                  Về Chúng Tôi
                </Typography>
              </Box>
              <Typography
                variant="body1"
                sx={{
                  lineHeight: { xs: 1.6, md: 1.8 },
                  opacity: 0.9,
                  fontSize: { xs: "0.95rem", sm: "1rem", md: "1.05rem" },
                  textAlign: { xs: "left", md: "justify" },
                  color: "#E8F4F8",
                  textAlign: "justify",
                  mb: { xs: 2.5, md: 3 },
                }}
              >
                Với các giải pháp linh hoạt và toàn diện của chúng tôi để thúc
                đẩy chuyển đổi trong doanh nghiệp của bạn. Bằng cách tận dụng
                công nghệ tiên tiến, được hướng dẫn bởi chuyên gia trong ngành
                và phong cách làm việc nhanh nhẹn, Suri Technologies có các giải
                pháp sáng tạo cho những thách thức của bạn.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: 1.5, md: 2 },
                  p: { xs: 1.5, md: 2 },
                  backgroundColor: "rgba(255, 184, 0, 0.1)",
                  borderRadius: 2,
                  border: "1px solid rgba(255, 184, 0, 0.2)",
                  flexDirection: { xs: "column", sm: "row" },
                  textAlign: { xs: "center", sm: "left" },
                }}
              ></Box>
            </Card>
          </Grid>

          {/* Contact & Location Info */}
          <Grid item xs={12} lg={6}>
            <Grid container spacing={{ xs: 2, md: 3 }} sx={{ height: "100%" }}>
              {/* Contact Information */}
              <Grid item xs={12} md={4}>
                <Card
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 184, 0, 0.2)",
                    borderRadius: { xs: 2, md: 3 },
                    p: { xs: 6, sm: 2.5, md: 3 },
                    height: "100%",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                      transform: { xs: "none", md: "translateY(-4px)" },
                      boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      mb: { xs: 2, md: 3 },
                      fontWeight: 700,
                      color: "#FFB800",
                      display: "flex",
                      fontSize: "23px",
                      alignItems: "center",
                      justifyContent: { xs: "center", sm: "flex-start" },
                      fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.25rem" },
                      textAlign: { xs: "left", sm: "left" },
                    }}
                  >
                    {/* <PhoneIcon
                      sx={{
                        mr: 1,
                        fontSize: { xs: "1.5rem", md: "1.5rem" },
                      }}
                    /> */}
                    Liên Hệ
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: { xs: 1.5, md: 2 },
                    }}
                  >
                    {contactInfo.map((contact) => {
                      const IconComponent = getIconComponent(contact.icon);
                      return (
                        <Box
                          key={contact.id}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: { xs: 1, md: 1.5 },
                            // fontSize: 34,
                            p: { xs: 1.5, md: 2 },
                            borderRadius: 2,
                            backgroundColor: "rgba(255, 255, 255, 0.03)",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              backgroundColor: "rgba(255, 184, 0, 0.1)",
                              transform: { xs: "none", md: "translateX(4px)" },
                            },
                          }}
                        >
                          {/* <IconComponent
                            sx={{
                              color: "#FFB800",
                              fontSize: { xs: "1rem", md: "1.2rem" },
                              flexShrink: 0,
                            }}
                          /> */}
                          <Link
                            href={contact.href}
                            sx={{
                              color: "#E8F4F8",
                              textDecoration: "none",
                              // fontSize: "23px",
                              fontWeight: 500,
                              width: 300,
                              fontSize: {
                                xs: "1rem",
                                sm: "1rem",
                                md: "1rem",
                              },
                              wordBreak: "break-word",
                              "&:hover": {
                                color: "#FFB800",
                                transition: "color 0.2s ease",
                              },
                            }}
                          >
                            {contact.text}
                          </Link>
                        </Box>
                      );
                    })}
                  </Box>
                </Card>
              </Grid>

              {/* Office Locations */}
              <Grid item xs={12} md={4}>
                <Card
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 184, 0, 0.2)",
                    borderRadius: { xs: 2, md: 3 },
                    p: { xs: 2, sm: 2.5, md: 3 },
                    height: "100%",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                      transform: { xs: "none", md: "translateY(-4px)" },
                      boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      mb: { xs: 2, md: 3 },
                      fontWeight: 700,
                      color: "#FFB800",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: { xs: "center", sm: "flex-start" },
                      fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.25rem" },
                      textAlign: { xs: "center", sm: "left" },
                    }}
                  >
                    {/* <LocationOnIcon
                      sx={{
                        mr: 1,
                        fontSize: { xs: "1.2rem", md: "1.5rem" },
                      }}
                    /> */}
                    Văn Phòng
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: { xs: 1.5, md: 2 },
                    }}
                  >
                    {officeLocations.map((office) => (
                      <Box
                        key={office.id}
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: { xs: 1, md: 1.5 },
                          p: { xs: 1.5, md: 2 },
                          borderRadius: 2,
                          backgroundColor: "rgba(255, 255, 255, 0.03)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: "rgba(255, 184, 0, 0.1)",
                            transform: { xs: "none", md: "translateX(4px)" },
                          },
                        }}
                      >
                        {/* <LocationOnIcon
                          sx={{
                            color: "#FFB800",
                            fontSize: { xs: "1rem", md: "1.2rem" },
                            mt: 0.2,
                            flexShrink: 0,
                          }}
                        /> */}
                        <Typography
                          variant="body2"
                          sx={{
                            lineHeight: 1.6,
                            color: "#E8F4F8",
                            fontWeight: 500,
                            fontSize: {
                              xs: "0.8rem",
                              sm: "0.85rem",
                              md: "0.9rem",
                            },
                          }}
                        >
                          {office.address}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Card>
              </Grid>

              {/* Company Image */}
              <Grid item xs={12} md={4}>
                <Card
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 184, 0, 0.2)",
                    borderRadius: { xs: 2, md: 3 },
                    p: { xs: 6, sm: 2.5, md: 3 },
                    height: "100%",
                    transition: "all 0.3s ease",
                    position: "relative",
                    width: "360px",
                    overflow: "hidden",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                      transform: { xs: "none", md: "translateY(-4px)" },
                      boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
                    },
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      mb: { xs: 2, md: 3 },
                      width: "full",
                      fontWeight: 700,
                      color: "#FFB800",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: { xs: "center", sm: "flex-start" },
                      fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.25rem" },
                      textAlign: { xs: "center", sm: "left" },
                      // Width: "362px",
                    }}
                  >
                    {/* <BusinessIcon
                      sx={{
                        mr: 1,
                        fontSize: { xs: "1.2rem", md: "1.5rem" },
                      }}
                    /> */}
                    Hình Ảnh
                  </Typography>

                  {/* Image Container */}
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: { xs: "200px", md: "240px" },
                      borderRadius: 2,
                      overflow: "hidden",

                      background:
                        "linear-gradient(135deg, rgba(255, 184, 0, 0.2) 0%, rgba(255, 184, 0, 0.1) 100%)",
                      display: "flex",
                      alignItems: "center",
                      // justifyContent: "center",
                      // "&:hover .image-overlay": {
                      //   opacity: 1,
                      // },
                    }}
                  >
                    {/* Placeholder for actual image */}
                    <Box
                      component="img"
                      src={Qr}
                      alt="Suri Technologies Office"
                      sx={{
                        width: "100%",
                        // Width: "362px",
                        height: "100%",
                        objectFit: "fill",
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                      }}
                    />

                    {/* Image Overlay */}
                    {/* <Box
                      className="image-overlay"
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background:
                          "linear-gradient(45deg, rgba(255, 184, 0, 0.3) 0%, rgba(26, 26, 46, 0.5) 100%)",
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    ></Box> */}
                  </Box>

                  {/* Image Description */}
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 2,
                      color: "#E8F4F8",
                      textAlign: "center",
                      // Width: "362px",
                      fontSize: { xs: "0.8rem", md: "0.85rem" },
                      opacity: 0.9,
                      lineHeight: 1.5,
                    }}
                  >
                    Scan me
                  </Typography>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* Bottom Section */}
        <Box
          sx={{
            mt: { xs: 4, md: 6 },
            pt: { xs: 3, md: 4 },
            borderTop: "1px solid rgba(255, 184, 0, 0.2)",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: { xs: 2, md: 3 },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography
            variant="body2"
            sx={{
              opacity: 0.8,
              fontSize: { xs: "0.85rem", sm: "0.9rem", md: "0.95rem" },
              fontWeight: 500,
            }}
          >
            copyright@ Suri Technologies
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: { xs: 2, sm: 3, md: 4 },
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {["Privacy Policy", "Terms of Service", "Careers", "Support"].map(
              (link) => (
                <Link
                  key={link}
                  href="#"
                  sx={{
                    color: "rgba(255, 255, 255, 0.8)",
                    textDecoration: "none",
                    fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem" },
                    fontWeight: 500,
                    transition: "all 0.3s ease",
                    whiteSpace: "nowrap",
                    "&:hover": {
                      color: "#FFB800",
                      transform: { xs: "none", md: "translateY(-1px)" },
                    },
                  }}
                >
                  {link}
                </Link>
              )
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
