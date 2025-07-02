# 📚 Dự Án Quảng Bá Khóa Học

Trang web quảng bá các khóa học online/offline với các tính năng chính:

- Giao diện thân thiện người dùng, responsive.
- Gửi đăng ký khóa học qua **EmailJS**.
- Chatbot hỗ trợ tư vấn real-time thông qua **Socket.IO**.
- Kết nối backend qua **WebSocket** để xử lý tương tác thời gian thực.

---

## 🛠 Công Nghệ Sử Dụng

| Công nghệ   | Mô tả                              |
| ----------- | ---------------------------------- |
| ReactJS     | Frontend framework, dùng với Vite  |
| Material UI | Thư viện giao diện                 |
| EmailJS     | Gửi email mà không cần server      |
| Socket.IO   | Kết nối real-time WebSocket        |
| Node.js     | Backend cho WebSocket (đã kết nối) |

---

## ⚙️ Cách Cài Đặt và Chạy Dự Án

### 1. Clone và Cài Đặt

#### QuangBaKhoaHoc - Client

```bash
git clone  https://github.com/vynhatduy/QuangBaKhoaHoc.git
cd QuangBaKhoaHoc
npm install
```

#### Chatbot - Server

```bash
git clone https://github.com/vynhatduy/Chatbot.git
cd QuangBaKhoaHoc
npm install
```

### 2. Tạo File .env

Tạo một file tên .env tại thư mục gốc, thêm nội dung sau:

#### QuangBaKhoaHoc

```bash
VITE_EMAIL_SERVICE_ID=
VITE_EMAIL_TEMPLATE_ID=
VITE_EMAIL_USER_ID=
SOCKET_SERVER_URL=
```

#### Chatbot

```bash
OPENAI_API_KEY=
PORT=
API_MODEL=
```

### 3. Chạy ứng dụng

#### QuangBaKhoaHoc

```bash
npm run dev
```

#### Chatbot

```bash
npm start
```

## ✉️ Cấu Hình EmailJS Để Gửi Form Đăng Ký

### 1. Tạo tài khoản tại [EmailJS](https://www.emailjs.com/)

### 2. Tạo Service Email

Chọn Gmail hoặc SMTP (nếu dùng Gmail cần cấu hình OAuth2).

#### Lưu lại Service ID.

Service ID sẽ là `VITE_EMAIL_SERVICE_ID` trong .env

### 3. Tạo Template

Chọn `Contact Us`
Subject: `{{subject}}`
Content:

```bash
Thông tin đăng ký khóa học AI:
Họ tên: {{name}}
Email: {{email}}
SĐT: {{phone}}
Tên công ty: {{company}}
Vị trí: {{position}}
```

To Email: điền email muốn trả dữ liệu về

From Name: `{{name}}`

và các trường khác nếu cần

#### Lưu lại Template ID

Template ID sẽ là `VITE_EMAIL_TEMPLATE_ID` trong .env

### 4. Lấy Public Key

Truy cập Dashboard -> Account -> General -> API Keys

#### Lưu lại Public key

Public key sẽ là `VITE_EMAIL_USER_ID` trong .env
