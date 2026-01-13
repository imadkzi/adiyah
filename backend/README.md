# Adʿiyah Backend

Serverless Node.js backend for receiving duʿāʾ submissions and sending them via email using the Brevo API.

## Features

- POST `/submit-dua` endpoint for receiving submissions
- Spam protection via honeypot field
- Rate limiting (1 submission per IP per 30 seconds)
- Email notifications via Brevo transactional API
- Proper error handling and validation

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```
BREVO_API_KEY=your-brevo-api-key
FROM_EMAIL=adiyahbyimad@icloud.com
TO_EMAIL=adiyahbyimad@icloud.com
PORT=3000
```

3. Start the server:
```bash
npm start
```

## Railway Deployment

1. Connect your repository to Railway
2. Set environment variables in Railway dashboard:
   - `BREVO_API_KEY`: Your Brevo API key (required)
   - `FROM_EMAIL`: Sender email address (defaults to adiyahbyimad@icloud.com)
   - `TO_EMAIL`: Recipient email address (defaults to adiyahbyimad@icloud.com)
   - `ALLOWED_ORIGINS`: Comma-separated list of allowed frontend origins (e.g., `https://yourdomain.com,https://www.yourdomain.com`)
   - `PORT`: Railway will set this automatically
3. Deploy!

**Important for Production:**
- Set `ALLOWED_ORIGINS` to your production frontend domain(s) to restrict CORS access
- Example: `ALLOWED_ORIGINS=https://adiyah.com,https://www.adiyah.com`
- If `ALLOWED_ORIGINS` is not set, all origins will be allowed (not recommended for production)

## API Endpoint

### POST `/submit-dua`

**Request Body:**
```json
{
  "name": "Optional Name",
  "dua": "Required dua text",
  "honey": "" // Hidden field - leave empty
}
```

**Success Response (200):**
```json
{
  "success": true
}
```

**Error Response (400/429/500):**
```json
{
  "error": "Error message"
}
```

## Environment Variables

- `BREVO_API_KEY`: Brevo API key for sending emails (required)
- `FROM_EMAIL`: Sender email address for Brevo API (optional, defaults to adiyahbyimad@icloud.com)
- `TO_EMAIL`: Recipient email address for submissions (optional, defaults to adiyahbyimad@icloud.com)
- `ALLOWED_ORIGINS`: Comma-separated list of allowed frontend origins for CORS (optional, but recommended for production)
- `PORT`: Server port (default: 3000, Railway sets this automatically)

## CORS Configuration

- **Local Development**: `http://localhost:5173` is always allowed
- **Production**: Set `ALLOWED_ORIGINS` to restrict access to your production frontend domain(s)
- **Preflight Requests**: OPTIONS requests are automatically handled with proper CORS headers
