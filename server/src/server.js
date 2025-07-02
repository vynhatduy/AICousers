import dotenv from "dotenv";
dotenv.config();

import { app, server, io } from "./config/app.config.js";
import socketHandler from "./socket/index.js";
import mailRouter from "./router/mail.route.js";

// Debug middleware
io.use((socket, next) => {
  console.log("🔍 Socket middleware - Auth check:", socket.id);
  console.log("Headers:", socket.handshake.headers);
  console.log("Query:", socket.handshake.query);
  next();
});
socketHandler(io);

app.use("/", mailRouter);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
