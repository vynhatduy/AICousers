import React, { useState } from "react";
import { FaqData } from "../data/faqData";
import { Box, Card, Typography, Collapse, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null); // Không có kiểu dữ liệu

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        py: 2,
        backgroundColor: "transparent",
        willChange: "unset",
      }}
    >
      <Card
        sx={{
          p: 5,
          backgroundColor: "#FFFFFF",
          color: "#212121",
          width: "100%",
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={2} textAlign="center">
          FAQ - CÂU HỎI THƯỜNG GẶP
        </Typography>

        {FaqData.map((item, index) => (
          <Box
            key={item.id}
            sx={{
              mb: 2,
              borderBottom: "1px solid rgba(0,0,0,0.1)",
              pb: 1,
            }}
          >
            <Box
              onClick={() => toggleOpen(index)}
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <Box
                align="justify"
                sx={{
                  width: "3rem",
                  height: "3rem",
                  backgroundColor: "white",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  fontSize: "2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: 1,
                  color: "gray",
                  flexShrink: 0,
                  mr: 2,
                }}
              >
                {item.id}
              </Box>

              <Typography
                variant="h5"
                align="justify"
                fontWeight={600}
                sx={{ flexGrow: 1 }}
              >
                {item.title}
              </Typography>

              <IconButton>
                <ExpandMoreIcon
                  sx={{
                    transform:
                      openIndex === index ? "rotate(180deg)" : "rotate(0)",
                    transition: "transform 0.3s ease",
                  }}
                />
              </IconButton>
            </Box>

            <Collapse in={openIndex === index}>
              <Box mt={1} ml={7}>
                {item.description.split("\n").map((line, idx) => (
                  <Typography
                    align="justify"
                    key={idx}
                    variant="body1"
                    sx={{ mt: 0.5, lineHeight: 1.6 }}
                  >
                    {line}
                  </Typography>
                ))}
              </Box>
            </Collapse>
          </Box>
        ))}
      </Card>
    </Box>
  );
};

export default Faq;
