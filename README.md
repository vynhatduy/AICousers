# Run Project with Docker Compose

## Step 1: Install Docker and Docker Compose

Make sure Docker and Docker Compose are installed on your system.

## Step 2: Clone the Repository

```bash
git clone https://github.com/your-org/your-repo.git
cd your-repo

# Create the .env file in the server directory
cd ./server
cp .env.example .env
```

Update the environment variables in the .env file to match your backend and frontend configuration.

## Step 3: Build and Run the Entire System Using Docker Compose

```bash
docker-compose down  # if previously running
docker-compose build --no-cache
docker-compose up
```

Alternatively, you can use a single command:

```bash
docker compose up --build -d
```

# Notes:

1. Update the keys in your .env file as needed.
2. When deploying in a production environment, an SMTP configuration is required.

For Gmail testing, use:

```bash
# for test with gmail
SMTP_USER=your.account@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx
```

To use a real SMTP provider (e.g., Hostinger), comment out the Gmail lines and uncomment the SMTP section:

```bash
# SMTP_HOST=smtp.hostinger.com
# SMTP_PORT=465
# SMTP_SECURE=true
# SMTP_USER=your.account@dmain.com
# SMTP_PASS=yourPassword@
```

Replace the values with your actual credentials.

Then, update the following code in the sendMail.js file under the \server\services directory:

Original (for Gmail testing):

```bash
  const transporter = nodemailer.createTransport({
    // for test with gmail
    service: "gmail",

    // for deploy with smtp mail
    // host: process.env.SMTP_HOST,
    // port: Number(process.env.SMTP_PORT),
    // secure: process.env.SMTP_SECURE === "true",

    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
```

Replace with (for SMTP deployment):

```bash
  const transporter = nodemailer.createTransport({

    // for deploy with smtp mail
     host: process.env.SMTP_HOST,
     port: Number(process.env.SMTP_PORT),
     secure: process.env.SMTP_SECURE === "true",

    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
```

(Note: I currently do not have a production SMTP provider, so I am only testing with Gmail SMTP for now.)
