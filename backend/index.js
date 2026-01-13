import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import https from "https";
import fetch from "node-fetch";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS Configuration
// Allow http://localhost:5173 for local development
// Allow origins from ALLOWED_ORIGINS env var for production
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((origin) => origin.trim())
  : [];

// CORS configuration function
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman, or curl)
    if (!origin) return callback(null, true);

    // Allow http://localhost:5173 for local development
    if (origin === "http://localhost:5173") {
      return callback(null, true);
    }

    // In production, check against allowed origins from environment variable
    if (allowedOrigins.length > 0) {
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    }

    // Development fallback: If no ALLOWED_ORIGINS is set, allow all origins
    // WARNING: Set ALLOWED_ORIGINS in production for security
    callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

// Apply CORS middleware globally
// The cors middleware automatically handles OPTIONS preflight requests
app.use(cors(corsOptions));

// Body parser: Parse JSON request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rate limiting: Store IP addresses and their last submission timestamps
// This implements a simple in-memory rate limiter (1 submission per IP per 30 seconds)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 30000; // 30 seconds in milliseconds

/**
 * Rate limiting middleware
 * Checks if the requesting IP has submitted within the last 30 seconds
 * If yes, rejects the request; if no, allows and records the timestamp
 */
const rateLimiter = (req, res, next) => {
  const clientIP =
    req.ip ||
    req.connection.remoteAddress ||
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    "unknown";
  const now = Date.now();

  // Check if IP exists in rate limit map
  if (rateLimitMap.has(clientIP)) {
    const lastSubmission = rateLimitMap.get(clientIP);
    const timeSinceLastSubmission = now - lastSubmission;

    // If less than 30 seconds have passed, reject the request
    if (timeSinceLastSubmission < RATE_LIMIT_WINDOW) {
      const remainingSeconds = Math.ceil(
        (RATE_LIMIT_WINDOW - timeSinceLastSubmission) / 1000
      );
      return res.status(429).json({
        error: `Too many requests. Please wait ${remainingSeconds} second(s) before submitting again.`,
      });
    }
  }

  // Update or set the timestamp for this IP
  rateLimitMap.set(clientIP, now);

  next();
};

/**
 * POST /submit-dua endpoint
 * Receives duʿāʾ submissions from frontend and sends them via Brevo email API
 */
app.post("/submit-dua", rateLimiter, async (req, res) => {
  try {
    const { name, dua, honey } = req.body;

    // Spam honeypot validation: If the hidden "honey" field is filled, it's likely a bot
    // Legitimate users won't see or fill this field, but bots often auto-fill all fields
    if (honey && honey.trim() !== "") {
      return res.status(400).json({
        error: "Spam detected. Submission rejected.",
      });
    }

    // Validation: name is required and must be non-empty
    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({
        error: "Name is required and cannot be empty.",
      });
    }

    // Validation: dua is required and must be non-empty
    if (!dua || typeof dua !== "string" || dua.trim() === "") {
      return res.status(400).json({
        error: "Dua is required and cannot be empty.",
      });
    }

    // Prepare email content
    const senderName = name.trim();

    // Format email body as plain text
    const emailBody = `
    Dua:${dua.trim()}
    Name: ${senderName}`;

    // Brevo API configuration
    // Using the Brevo transactional email API endpoint
    const brevoApiUrl = "https://api.brevo.com/v3/smtp/email";
    const brevoApiKey = process.env.BREVO_API_KEY;
    const fromEmail = process.env.FROM_EMAIL || "hello@imadkazi.co.uk";
    const toEmail = process.env.TO_EMAIL || "adiyahbyimad@icloud.com";

    // Validate required environment variables
    if (!brevoApiKey) {
      console.error("BREVO_API_KEY is not set");
      return res.status(500).json({
        error: "Server configuration error. Please contact support.",
      });
    }

    // Email payload for Brevo API
    const emailPayload = {
      sender: {
        name: senderName,
        email: fromEmail,
      },
      to: [
        {
          email: toEmail,
        },
      ],
      subject: "New Adʿiyah Submission",
      textContent: emailBody,
    };

    // Send email via Brevo API
    // Using node-fetch with HTTPS agent
    // Only disable certificate validation in development
    const httpsAgent = new https.Agent({
      rejectUnauthorized: process.env.NODE_ENV !== "production",
    });

    const response = await fetch(brevoApiUrl, {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": brevoApiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify(emailPayload),
      agent: httpsAgent, // Use custom HTTPS agent for SSL certificate handling
    });

    // Check if email was sent successfully
    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: "Unknown error" }));
      console.error("Brevo API error:", errorData);

      // Provide more specific error message
      if (response.status === 401 || response.status === 403) {
        return res.status(500).json({
          error:
            "Invalid API key. Please check your Brevo API key configuration.",
        });
      }

      return res.status(500).json({
        error: "Failed to send email. Please try again later.",
      });
    }

    // Success response
    res.status(200).json({ success: true });
  } catch (error) {
    // Error handling: Catch any unexpected errors during email sending or processing
    console.error("Error processing submission:", error);
    res.status(500).json({
      error: "An unexpected error occurred. Please try again later.",
    });
  }
});

// Health check endpoint (useful for Railway deployment)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`CORS: Allowing http://localhost:5173 for local development`);
  if (allowedOrigins.length > 0) {
    console.log(
      `CORS: Allowing production origins: ${allowedOrigins.join(", ")}`
    );
  } else {
    console.log(
      `CORS: WARNING - ALLOWED_ORIGINS not set, allowing all origins`
    );
  }
});

export default app;
