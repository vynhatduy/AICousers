# 🤖 Backend Chatbot - Dự Án Quảng Bá Khóa Học

Đây là **backend server** phục vụ tính năng chatbot real-time cho trang web quảng bá khóa học. Backend được xây dựng bằng **Node.js**, sử dụng **Express** và **Socket.IO** để giao tiếp realtime với frontend React.

---

## 🛠 Công Nghệ Sử Dụng

| Công nghệ | Mô tả                                  |
| --------- | -------------------------------------- |
| Node.js   | Nền tảng chạy JavaScript phía server   |
| ExpressJS | Framework HTTP nhẹ, đơn giản           |
| Socket.IO | Giao tiếp WebSocket real-time          |
| dotenv    | Quản lý biến môi trường `.env`         |
| cors      | Cho phép frontend kết nối cross-origin |

---

---

## ⚙️ Biến Môi Trường

Tạo file `.env` tại thư mục gốc:

```bash
OPENAI_API_KEY=
PORT=
API_MODEL=
```

## 🚀 Cách Chạy Dự Án

### 1. Cài đặt

```bash
npm install
```

### 2. Chạy dự án

```bash
npm start
```
