import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  Container,
  Grid,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../assets/logoSuri.png";
import OfferPopup from "./popup/offerPopup";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [activeSection, setActiveSection] = useState("intro");

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });

      setMobileOpen(false);
      setActiveSection(sectionId);
    }
  };

  // Gộp 2 useEffect scroll thành 1
  useEffect(() => {
    const handleScroll = () => {
      const shouldScroll = window.scrollY > 50;
      setIsScrolled(shouldScroll);

      // Tìm section hiện tại đang xem
      const sections = [
        "intro",
        "content",
        "certificate",
        "instructor",
        "register",
        "faq",
        "educator",
        "coreOfValue",
      ];
      const headerHeight = 80;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element) {
          const elementTop = element.offsetTop - headerHeight - 100;
          if (window.scrollY >= elementTop) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pages = [
    { name: "Giới thiệu", id: "intro" },
    { name: "Nội dung học", id: "content" },
    { name: "Giảng viên", id: "educator" },
    { name: "Chứng chỉ", id: "certificate" },
    { name: "Câu hỏi thường gặp", id: "faq" },
    { name: "Đăng ký", id: "register" },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <List>
        {pages.map((page) => (
          <ListItem key={page.name} sx={{ justifyContent: "center" }}>
            <Button
              sx={{
                fontSize: "1.2rem", // Phóng to chữ trong mobile drawer
                fontWeight: "bold",
                color: page.name === "Đăng ký" ? "#FFB800" : "#0E2148",
                cursor: "pointer",
                width: "100%",
                py: 1.5,
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(255, 184, 0, 0.1)",
                  transform: "translateY(-2px)",
                },
              }}
              onClick={() => {
                if (page.name === "Đăng ký") {
                  setOpen(true);
                } else {
                  scrollToSection(page.id);
                }
              }}
            >
              {page.name}
            </Button>
          </ListItem>
        ))}
      </List>
      <OfferPopup open={open} onClose={() => setOpen(false)} />
    </Box>
  );

  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        boxShadow: isScrolled ? "0 2px 6px rgba(0,0,0,0.15)" : "none",
        transition: "all 0.3s linear",
        backgroundColor: isScrolled
          ? "rgba(255, 255, 255, 0.9)"
          : "transparent",
        backdropFilter: isScrolled ? "blur(8px)" : "none",
        overflow: "hidden",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          px: { xs: 2, sm: 4, md: 6 },
          width: "100%",
          maxWidth: "100% !important",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: { xs: "60px", sm: "80px" },
            position: "relative",
            width: "100%",
          }}
        >
          {/* Mobile Menu Button */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              display: { sm: "none" },
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 1001,
              color: isScrolled ? "#0E2148" : "white",
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo - Phóng to */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              "& img": {
                width: { xs: 70, sm: 80, md: 110 }, // Phóng to logo
                height: "auto",
                maxWidth: "100%",
                transform: "scale(1.4)",
              },
            }}
          >
            <Box
              component="img"
              src={Logo}
              alt="Logo"
              sx={{
                display: "block",
              }}
            />
          </Box>

          {/* Desktop Navigation - Phóng to chữ */}
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              gap: { sm: 0.5, md: 1, lg: 2 },
              flexWrap: "nowrap",
              overflow: "hidden",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => {
                  if (page.name === "Đăng ký") {
                    setOpen(true);
                  } else {
                    scrollToSection(page.id);
                  }
                }}
                sx={{
                  fontSize: {
                    sm: "1rem", // Phóng to từ 0.8rem lên 1rem
                    md: "1.2rem", // Phóng to từ 1rem lên 1.2rem
                    lg: "1.3rem", // Phóng to từ 1rem lên 1.3rem
                    xl: "1.4rem", // Phóng to từ 1.1rem lên 1.4rem
                  },
                  fontWeight: "bold",
                  color:
                    page.name === "Đăng ký"
                      ? "#FFB800"
                      : isScrolled
                      ? "#0E2148"
                      : "white",
                  cursor: "pointer",
                  px: { sm: 0.5, md: 1, lg: 1.5 },
                  py: 1,
                  minWidth: "auto",
                  whiteSpace: "nowrap",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: isScrolled
                      ? "rgba(22, 173, 203, 0.1)"
                      : "rgba(255, 255, 255, 0.1)",
                    borderRadius: "4px",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* Mobile Drawer */}
          <Drawer
            variant="temporary"
            anchor="right"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: 280,
                backgroundColor: "white",
                maxWidth: "80vw",
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </Container>

      {/* Popup nằm ngoài để tránh conflict */}
      <OfferPopup open={open} onClose={() => setOpen(false)} />
    </Box>
  );
};

export default Header;
