import { streamBotReply } from "../services/chatService.js";

const activeStreams = new Map(); // Map lưu socketId -> AbortController

function socketHandler(io) {
  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("user_message", async (message) => {
      // Nếu có stream trước đó => hủy trước
      const oldController = activeStreams.get(socket.id);
      if (oldController) oldController.abort();

      const abortController = new AbortController();
      activeStreams.set(socket.id, abortController);

      try {
        await streamBotReply(message, socket, abortController.signal);
      } catch (error) {
        console.error("Error in streamBotReply:", error);
        socket.emit("bot_reply_error", "Có lỗi xảy ra khi xử lý tin nhắn");
      } finally {
        // Sau khi hoàn tất, xóa controller
        activeStreams.delete(socket.id);
      }
    });

    socket.on("user_stop", () => {
      const controller = activeStreams.get(socket.id);
      if (controller) {
        controller.abort();
        activeStreams.delete(socket.id);
        console.log(`Stream bị hủy bởi client: ${socket.id}`);
      }
    });

    socket.on("disconnect", () => {
      const controller = activeStreams.get(socket.id);
      if (controller) {
        controller.abort();
        activeStreams.delete(socket.id);
      }
      console.log(`Client disconnected: ${socket.id}`);
    });
    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });
  });
}

export default socketHandler;
