import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Stack,
  Dialog,
  DialogContent,
  keyframes,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { SendMail } from "../../services/sendMail";
import { LoadingPopup } from "./LoadingPopup";
import { PositionData } from "../../data/positionData";
import CountdownTimer from "../countdownTimer";

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

const OfferPopup = ({ open, onClose }) => {
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
    phone: "",
    email: "",
    position: "",
    company: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    // validation tương tự code bạn có
    switch (name) {
      case "name":
        setError((p) => ({
          ...p,
          name: value.length > 30 ? "Không quá 30 ký tự" : "",
        }));
        break;
      case "email":
        setError((p) => ({
          ...p,
          email: !/\S+@\S+\.\S+/.test(value) ? "Email không hợp lệ" : "",
        }));
        break;
      case "phone":
        setError((p) => ({
          ...p,
          phone: !/^[0-9]{10}$/.test(value) ? "SĐT phải 10 chữ số" : "",
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
    const hasError = Object.values(error).some(Boolean);
    const hasEmpty = Object.values(data).some((v) => !v);

    if (hasError || hasEmpty) {
      alert("Vui lòng điền đầy đủ và đúng thông tin.");
      return;
    }
    setIsLoading(true);
    const res = await SendMail(data);
    setIsLoading(false);

    if (res.success) {
      alert(res.message);
      onClose(); // đóng popup sau khi gửi thành công
    } else {
      alert(`${res.message} ${res.error}`);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogContent sx={{ p: 0 }}>
          <Box bgcolor="white" px={{ xs: 2, md: 5 }} py={3}>
            <Box display="flex" flexDirection={{ xs: "column", md: "row" }}>
              {/* Left promo */}
              <Box flex={2} textAlign="center" p={3}>
                <Box
                  sx={{
                    animation: `${shake} 0.9s ease-in-out infinite`,
                    mb: 2,
                  }}
                >
                  <Typography variant="h5" fontWeight={700} color="#ffa645">
                    Nâng Cao Hiệu Suất với AI và
                  </Typography>
                  <Typography variant="h5" fontWeight={700} color="#ffa645">
                    Dữ liệu thông minh
                  </Typography>
                </Box>
                <Box
                  bgcolor="#2b67b0"
                  border="1px solid #000"
                  borderRadius="10px"
                  p={2}
                >
                  <Typography variant="h4" fontWeight={600} color="#ffa645">
                    FLASH SALE
                  </Typography>
                  <Typography color="#ffa645" fontWeight={600}>
                    CHỈ 10 SLOT NHANH NHẤT
                  </Typography>
                  <Typography color="white" fontWeight={600}>
                    Khuyến mãi sắp kết thúc
                  </Typography>
                  <CountdownTimer />
                </Box>
                <Box mt={2}>
                  <Typography
                    color="red"
                    fontSize={25}
                    fontWeight={800}
                    textDecoration="line-through"
                  >
                    Giảm giá
                  </Typography>
                  <Typography
                    pady={1}
                    px={2}
                    bgcolor="#ffa645"
                    borderRadius="30px"
                    fontWeight="bold"
                    fontSize="2rem"
                    color="#fff"
                    sx={{
                      animation: `${pulseAnimation} 1.5s infinite ease-in-out`,
                    }}
                  >
                    3.600.000 VND
                  </Typography>
                </Box>
              </Box>
              {/* Right form */}
              <Box flex={1} bgcolor="#2B67B0" p={{ xs: 3, md: 5 }}>
                <Typography
                  variant="h4"
                  fontWeight={700}
                  textAlign="center"
                  color="#fff"
                  mb={2}
                >
                  Tham gia ngay
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                  <Stack spacing={2}>
                    {["name", "phone", "email"].map((field) => (
                      <TextField
                        key={field}
                        placeholder={
                          field === "name"
                            ? "Họ và tên"
                            : field === "phone"
                            ? "Số điện thoại"
                            : "Email"
                        }
                        name={field}
                        type={
                          field === "phone"
                            ? "tel"
                            : field === "email"
                            ? "email"
                            : "text"
                        }
                        fullWidth
                        required
                        value={data[field]}
                        onChange={handleChange}
                        error={!!error[field]}
                        helperText={error[field]}
                        InputLabelProps={{ style: { color: "#5C4033" } }}
                        InputProps={{
                          style: { backgroundColor: "#fff", borderRadius: 5 },
                        }}
                      />
                    ))}
                    <TextField
                      type="text"
                      placeholder="Tên công ty"
                      name="company"
                      fullWidth
                      required
                      value={data.company}
                      onChange={handleChange}
                      error={!!error.company}
                      helperText={error.company}
                      InputLabelProps={{ style: { color: "#5C4033" } }}
                      InputProps={{
                        style: { backgroundColor: "#fff", borderRadius: 5 },
                      }}
                    />
                    {/* vị trí công việc */}
                    <TextField
                      type="text"
                      placeholder="Vị trí công việc"
                      name="position"
                      fullWidth
                      required
                      value={data.position}
                      onChange={handleChange}
                      error={!!error.position}
                      helperText={error.position}
                      InputLabelProps={{ style: { color: "#5C4033" } }}
                      InputProps={{
                        style: { backgroundColor: "#fff", borderRadius: 5 },
                      }}
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      endIcon={<CheckCircleOutlineIcon />}
                      sx={{
                        py: 1.5,
                        fontSize: "1.1rem",
                        fontWeight: "bold",
                        backgroundColor: "#ffa645",
                        // "&:hover": { backgroundColor: "#4A352A" },
                        borderRadius: 1,
                        animation: `${pulseAnimation} 1.5s infinite ease-in-out`,
                      }}
                    >
                      Đăng ký ngay
                    </Button>
                  </Stack>
                </Box>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
      <LoadingPopup open={isLoading} />
    </>
  );
};

export default OfferPopup;
