# Adʿiyah by Imad

A mobile-first duʿāʾ submission app that allows users to submit prayers to be remembered during Umrah. Built with Vue 3, Tailwind CSS, and Express.js.

## Features

- **Mobile-first design** with warm, minimal color palette
- **Dark mode support** (follows device preference with manual override)
- **Smooth screen transitions** between splash, intention, form, and confirmation
- **Email notifications** via Brevo API
- **Rate limiting** to prevent spam
- **Honeypot spam protection**

## Project Structure

```
adiyah/
├── frontend/          # Vue 3 frontend application
│   ├── src/
│   │   ├── components/
│   │   │   ├── SplashScreen.vue
│   │   │   ├── IntentionScreen.vue
│   │   │   ├── DuaForm.vue
│   │   │   ├── PersistentHeader.vue
│   │   │   └── DarkModeToggle.vue
│   │   ├── App.vue
│   │   ├── main.js
│   │   └── style.css
│   ├── index.html
│   └── package.json
└── backend/           # Express.js backend API
    ├── index.js
    └── package.json
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Brevo API key (for email functionality)

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
npm install
```

2. Create a `.env` file:
```env
BREVO_API_KEY=your_brevo_api_key_here
FROM_EMAIL=adiyahbyimad@icloud.com
TO_EMAIL=adiyahbyimad@icloud.com
PORT=3000
ALLOWED_ORIGINS=https://your-production-domain.com
```

3. Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:3000`

## Deployment

### Frontend (Netlify)

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Deploy the `dist` folder to Netlify

3. Configure environment variables in Netlify if needed

### Backend (Railway)

1. Connect your GitHub repository to Railway
2. Set the root directory to `backend`
3. Add environment variables:
   - `BREVO_API_KEY`
   - `FROM_EMAIL` (optional)
   - `TO_EMAIL` (optional)
   - `ALLOWED_ORIGINS` (comma-separated list of allowed origins)

## Environment Variables

### Backend

- `BREVO_API_KEY` (required) - Your Brevo API key for sending emails
- `FROM_EMAIL` (optional) - Email address to send from (defaults to adiyahbyimad@icloud.com)
- `TO_EMAIL` (optional) - Email address to receive submissions (defaults to adiyahbyimad@icloud.com)
- `ALLOWED_ORIGINS` (optional) - Comma-separated list of allowed CORS origins for production
- `PORT` (optional) - Server port (defaults to 3000, Railway sets this automatically)

## API Endpoints

### POST `/submit-dua`

Submit a duʿāʾ for Umrah.

**Request Body:**
```json
{
  "name": "User Name",
  "dua": "Prayer text",
  "honey": ""  // Honeypot field (should be empty)
}
```

**Response:**
- `200 OK` - Submission successful
- `400 Bad Request` - Validation error
- `429 Too Many Requests` - Rate limit exceeded
- `500 Internal Server Error` - Server error

### GET `/health`

Health check endpoint.

**Response:**
```json
{
  "status": "ok"
}
```

## Technologies Used

### Frontend
- Vue 3 (Composition API with `<script setup>`)
- Tailwind CSS
- Axios
- Vite

### Backend
- Express.js
- CORS
- Brevo API (email service)
- dotenv

## Color Palette

### Light Mode
- Background Main: `#F7F5F0`
- Background Alt: `#EFECE6`
- Card Surface: `#FFFFFF`
- Text Primary: `#1F1E1C`
- Text Secondary: `#6B6A66`
- Accent Sand: `#C2A36B`

### Dark Mode
- Background Main: `#2B2B28`
- Background Alt: `#3A3A36`
- Card Surface: `#4A4A45`
- Text Primary: `#EFECE6`
- Text Secondary: `#C2A36B`
- Accent Sand: `#E4D6B0`

## License

ISC

## Author

Imad
