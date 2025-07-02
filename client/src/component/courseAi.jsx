import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { CourseData } from "../data/courseAi.js";

const CourseAi = () => {
  return (
    <Box
      sx={{
        minHeight: 400, // Chiều cao vẫn giữ để có thể cuộn
        width: "100%",
      }}
    >
      <Box
        p={4}
        bgcolor="#d9d9d9"
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
        margin="0 auto"
        borderRadius="15px"
        mb={4}
        boxShadow="0px 8px 24px 0px rgba(0,0,0,0.2)"
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          fontSize={{ xs: "1.5rem", md: "2.125rem" }}
          color="#0E2148"
          textAlign="center"
        >
          Các khóa đào tạo ứng dụng AI
        </Typography>

        <Grid
          container
          spacing={4}
          mt={{ xs: 2, md: 4 }}
          justifyContent="center"
        >
          {CourseData.map((item) => (
            <Grid
              item
              key={item.id}
              xs={12}
              sm={6}
              md={3} // 12 / 3 = 4 items per row
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Box
                component="img"
                src={item.img}
                alt={item.title}
                sx={{
                  width: "300px",
                  height: { xs: 180, sm: 220, md: 250 },
                  objectFit: "cover",
                  borderRadius: 2,
                  mb: 2,
                }}
              />
              <Typography
                variant="h6"
                fontWeight="600"
                width={"300px"}
                color="#000"
                fontSize={{ xs: 15, md: 20 }}
                mb={1}
                textAlign="center"
              >
                {item.title}
              </Typography>
              <Typography
                variant="body6"
                width={"300px"}
                color="#000"
                fontSize={{ sx: 15, md: 16 }}
                mb={1}
                align="justify"
                sx={{ textAlignLast: "center" }}
              >
                {item.description}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default CourseAi;
