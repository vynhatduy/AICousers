import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Stack,
  useTheme,
  keyframes,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { SendMail } from "../services/sendMail";
import { LoadingPopup } from "./popup/LoadingPopup";
import CountdownTimer from "./countdownTimer";

const Form = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    phone: "",
    email: "",
    position: "",
    company: "",
  });

  const [error, setError] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    company: "",
  });

  const theme = useTheme();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({ ...prev, [name]: value }));

    switch (name) {
      case "name":
        setError((prev) => ({
          ...prev,
          name: value.length > 30 ? "Họ tên không được quá 30 ký tự" : "",
        }));
        break;
      case "email":
        setError((prev) => ({
          ...prev,
          email: !/\S+@\S+\.\S+/.test(value) ? "Email không hợp lệ" : "",
        }));
        break;
      case "phone":
        setError((prev) => ({
          ...prev,
          phone: !/^[0-9]{10}$/.test(value)
            ? "Số điện thoại phải từ 10 chữ số"
            : "",
        }));
        break;
      case "position": // Retained from your original code
        setError((prev) => ({
          ...prev,
          position: value.length < 5 ? "Vị trí công việc quá ngắn" : "",
        }));
        break;
      case "company": // Retained from your original code
        setError((prev) => ({
          ...prev,
          company: value.length < 5 ? "Tên công ty quá ngắn" : "",
        }));
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasError = Object.values(error).some((err) => err !== "");
    const hasEmptyField = Object.values(data).some((val) => val === ""); // Check all retained fields

    if (hasError || hasEmptyField) {
      alert("Vui lòng điền đầy đủ và đúng thông tin.");
      return;
    }
    setIsLoading(true);
    const result = await SendMail(data);
    setIsLoading(false);
    if (result.success) {
      alert(result?.message);
      clearData();
    } else {
      alert(`${result?.message} ${result?.error}`);
    }
  };

  function clearData() {
    setData({
      name: "",
      phone: "",
      email: "",
      position: "",
      company: "",
    });
  }

  // Khai báo animation shake
  const shake = keyframes`
  0% { transform: translateX(0); }
  20% { transform: translateX(-5px); }
  40% { transform: translateX(5px); }
  60% { transform: translateX(-5px); }
  80% { transform: translateX(5px); }
  100% { transform: translateX(0); }
`;
  const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;
  return (
    <>
      <LoadingPopup open={isLoading} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "white",
          px: { xs: 2, md: 5 },
          color: "black ",
        }}
      >
        <Box
          mt={4}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            width: { xs: "80%", md: "100%" },
            maxWidth: 1100,
            width: "100%",
            mx: "auto",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              flex: 2,

              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              minHeight: { xs: "50vh", md: "auto" },
            }}
          >
            <Box
              sx={{
                animation: `${shake} 0.9s ease-in-out infinite`,
                display: "inline-block",
                color: "white",
              }}
            >
              <Typography
                variant="h5"
                color="#ffa645"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                }}
                fontSize={{ xs: "1.2rem", md: "1.6rem" }}
              >
                Nâng Cao Hiệu Suất với AI và
              </Typography>
              <Typography
                variant="h5"
                color="#ffa645"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                }}
                fontSize={{ xs: "1.9rem", md: "2.5rem" }}
              >
                Dữ liệu thông minh
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: "#2B67B0",
                marginLeft: "10px",
                border: "1px solid #000",
                mb: 3,
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                borderRadius: { xs: "10px", md: "10px 0px 0px 10px" },
                width: { md: "99%", xs: "100%" },
              }}
            >
              {/* LEFT */}
              <Box
                sx={{
                  width: { xs: "100%", md: "40%" },
                  minWidth: 250,
                  display: "flex",
                  flexDirection: "column",
                  justifyItems: "flex-start",
                }}
              >
                <Typography
                  variant="h4"
                  fontWeight={600}
                  fontSize={{ xs: "2.3rem", md: "4.2rem" }}
                  textTransform="uppercase"
                  mt={2}
                  color="#ffa645"
                >
                  FLASH SALE
                </Typography>
                <Typography
                  mt={1}
                  fontSize={16}
                  color="#ffa645"
                  fontWeight={600}
                >
                  CHỈ 10 SLOT NHANH NHẤT
                </Typography>
                <Typography color="white" mt={1} fontWeight={600}>
                  Khuyến mãi sắp kết thúc
                </Typography>
                <Box mt={1}>
                  <CountdownTimer />
                </Box>
              </Box>

              {/* RIGHT */}
              <Box
                sx={{
                  width: { xs: "100%", md: "70%" },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                <Typography
                  fontWeight={700}
                  fontSize={{ xs: "1rem", md: "2rem" }}
                  textTransform="uppercase"
                >
                  Giá niêm yết
                </Typography>
                <Typography
                  fontWeight={700}
                  fontSize={{ xs: "2rem", md: "3rem" }}
                  textTransform="uppercase"
                  sx={{ textDecoration: "line-through" }}
                >
                  4.600.000 VNĐ
                </Typography>
                <Typography
                  color="red"
                  fontWeight="bold"
                  fontSize={{ xs: "1rem", md: "2rem" }}
                >
                  chỉ còn
                </Typography>
                <Typography
                  p={2}
                  bgcolor="#ffa645"
                  borderRadius="30px"
                  width="80%"
                  margin="0 auto"
                  fontWeight="bold"
                  fontSize={{ xs: "1rem", md: "2.5rem" }}
                  sx={{
                    animation: `${pulseAnimation} 1.5s infinite ease-in-out`,
                    textAlign: "center",
                    color: "white",
                    mt: 1,
                    mb: 2,
                  }}
                >
                  3.600.000 VND
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Right Section - Form */}
          <Box
            sx={{
              flex: 1,
              backgroundColor: "#27548A",
              p: { xs: 3, sm: 5 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            width={{ sx: "10%" }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "#FFFFFF",
                mb: 3,
                textAlign: "center",
              }}
              textTransform="uppercase"
            >
              Tham gia ngay
            </Typography>
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <Stack spacing={2.5}>
                {/* Họ và tên */}
                <TextField
                  placeholder="Họ và tên"
                  name="name"
                  required
                  fullWidth
                  value={data.name}
                  onChange={handleChange}
                  error={!!error.name}
                  helperText={error.name}
                  InputLabelProps={{
                    style: { color: "#5C4033" }, // Label color
                  }}
                  InputProps={{
                    style: { backgroundColor: "#FFFFFF", borderRadius: "5px" }, // Input background
                  }}
                />
                {/* Số điện thoại */}
                <TextField
                  placeholder="Số điện thoại"
                  name="phone"
                  type="tel"
                  required
                  fullWidth
                  value={data.phone}
                  onChange={handleChange}
                  error={!!error.phone}
                  helperText={error.phone}
                  InputLabelProps={{
                    style: { color: "#5C4033" },
                  }}
                  InputProps={{
                    style: { backgroundColor: "#FFFFFF", borderRadius: "5px" },
                  }}
                />
                {/* Email */}
                <TextField
                  placeholder="Email"
                  name="email"
                  type="email"
                  required
                  fullWidth
                  value={data.email}
                  onChange={handleChange}
                  error={!!error.email}
                  helperText={error.email}
                  InputLabelProps={{
                    style: { color: "#5C4033" },
                  }}
                  InputProps={{
                    style: { backgroundColor: "#FFFFFF", borderRadius: "5px" },
                  }}
                />
                {/* Tên công ty */}
                <TextField
                  placeholder="Tên công ty"
                  name="company"
                  type="company"
                  required
                  fullWidth
                  value={data.company}
                  onChange={handleChange}
                  error={!!error.company}
                  helperText={error.company}
                  InputLabelProps={{
                    style: { color: "#5C4033" },
                  }}
                  InputProps={{
                    style: { backgroundColor: "#FFFFFF", borderRadius: "5px" },
                  }}
                />
                {/* Chọn vị trí công việc (original field) */}
                <TextField
                  type="text"
                  placeholder="Vị trí công việc"
                  name="position"
                  required
                  fullWidth
                  value={data.position}
                  onChange={handleChange}
                  error={!!error.position}
                  helperText={error.position}
                  InputLabelProps={{
                    style: { color: "#5C4033" },
                  }}
                  InputProps={{
                    style: { backgroundColor: "#FFFFFF", borderRadius: "5px" },
                  }}
                />
              </Stack>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                endIcon={<CheckCircleOutlineIcon />}
                sx={{
                  mt: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  backgroundColor: "#ffa645", // Dark brown button color
                  color: "#FFFFFF",
                  borderRadius: "5px",

                  animation: `${pulseAnimation} 1.5s infinite ease-in-out`,
                  textAlign: "center",
                  color: "white", // Cho dễ nhìn hơn trên nền đỏ
                }}
              >
                Đăng ký ngay
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Form;
