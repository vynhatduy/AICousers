import React, { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";

const CountdownTimer = () => {
  // Khởi tạo thời điểm kết thúc là 12 giờ kể từ lúc load trang
  const targetDate = new Date(Date.now() + 12 * 60 * 60 * 1000);

  const calculateTimeLeft = () => {
    const difference = +targetDate - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const renderTimeBlock = (value, label) => (
    <Box textAlign="center">
      <Typography fontSize="1.5rem" color="white" fontWeight={700}>
        {String(value).padStart(2, "0")}
      </Typography>
      <Typography color="white" fontSize="0.9rem">
        {label}
      </Typography>
    </Box>
  );

  return (
    <Grid
      container
      spacing={3}
      justifyContent="center"
      alignItems="center"
      sx={{ p: 2, borderRadius: 2 }}
    >
      <Grid item>{renderTimeBlock(timeLeft.days, "Ngày")}</Grid>
      <Grid item>{renderTimeBlock(timeLeft.hours, "Giờ")}</Grid>
      <Grid item>{renderTimeBlock(timeLeft.minutes, "Phút")}</Grid>
      <Grid item>{renderTimeBlock(timeLeft.seconds, "Giây")}</Grid>
    </Grid>
  );
};

export default CountdownTimer;
