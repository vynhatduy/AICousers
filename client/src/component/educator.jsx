import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
} from "@mui/material";
import { EducatorData } from "../data/educatorData";

const Educator = () => {
  return (
    <Box p={4} bgcolor="rgb(217 217 217)">
      <Typography
        variant="h5"
        fontWeight="bold"
        fontSize={{ xs: "1.5rem", md: "2.125rem" }}
        color="#0E2148"
        textAlign="center"
        mb={4}
      >
        ĐỘI NGŨ ĐÀO TẠO
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {EducatorData.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                maxWidth: 300,
                width: "100%",
                margin: "0 auto",
                boxShadow: 3,
              }}
            >
              <Box
                sx={{
                  height: 240,
                  width: "100%",
                  overflow: "hidden",
                  position: "relative",
                  borderRadius: "4px 4px 0 0",
                }}
              >
                {item.type === "video" ? (
                  <CardMedia
                    component="video"
                    src={item.src}
                    muted
                    controls={false} // Không hiển thị control
                    autoPlay={false} // Không tự chạy
                    disablePictureInPicture
                    controlsList="nodownload nofullscreen noremoteplayback"
                    sx={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                      objectPosition: "center top",
                      pointerEvents: "none", // Không tương tác
                      "&::-webkit-media-controls": {
                        display: "none !important",
                      },
                      "&::-webkit-media-controls-panel": {
                        display: "none !important",
                      },
                    }}
                  />
                ) : (
                  <CardMedia
                    component="img"
                    image={item.src}
                    alt={item.name}
                    sx={{
                      height: "100%",
                      width: "100%",
                      objectFit: item.id === 3 ? "contain" : "cover",
                      objectPosition: " center 27%",
                      backgroundColor:
                        item.id === 3 ? "#f5f5f5" : "transparent",
                      transform: item.id === 4 ? "scale(1)" : "none",
                    }}
                  />
                )}
              </Box>
              <CardContent
                sx={{
                  padding: "16px",
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  color="#0E2148"
                  gutterBottom
                  textAlign="center"
                  sx={{
                    fontSize: "1.1rem",
                    mb: 2,
                    minHeight: "1.5em",
                  }}
                >
                  {item.name}
                </Typography>
                <List
                  dense
                  sx={{
                    padding: 0,
                    flexGrow: 1,
                  }}
                >
                  {item.description.map((desc, index) => (
                    <ListItem key={index} sx={{ py: 0.5, px: 0 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: "0.9rem",
                          lineHeight: 1.4,
                        }}
                      >
                        • {desc}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Educator;
