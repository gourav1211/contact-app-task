# 📇 Contact Manager - MERN Stack Application

A full-stack Contact Management Web Application built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![React](https://img.shields.io/badge/Frontend-React%2019-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38B2AC)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [API Endpoints](#-api-endpoints)
- [Screenshots](#-screenshots)

---

## ✨ Features

### Core Features
- ✅ **Contact Form** - Add new contacts with Name, Email, Phone, and Message
- ✅ **Client-side Validation** - Real-time form validation with error messages
- ✅ **Display Contacts** - View all contacts in a responsive list/card layout
- ✅ **Real-time Updates** - New contacts appear without page reload

### Bonus Features
- ✅ **Delete Contact** - Remove contacts with one click
- ✅ **Toast Notifications** - Success/error messages for all actions
- ✅ **Sorting** - Sort contacts by Name or Date (ascending/descending)
- ✅ **Reusable Components** - Modular UI components (Button, Input, Textarea, Toast)
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile devices

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, Vite, Tailwind CSS 4 |
| **Backend** | Node.js, Express.js 5 |
| **Database** | MongoDB (Mongoose ODM) |
| **HTTP Client** | Axios |
| **State Management** | React useState Hook |

---

## 📁 Project Structure

```
contact-app-task/
├── README.md
├── plan.md
│
├── backend/
│   ├── .env                    # Environment variables
│   ├── package.json
│   ├── server.js               # Express server entry point
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── controllers/
│   │   └── contactController.js # API logic
│   ├── models/
│   │   └── Contact.js          # Mongoose schema
│   └── routes/
│       └── contactRoutes.js    # API routes
│
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── App.jsx             # Main application
        ├── index.css           # Global styles + Tailwind
        ├── main.jsx            # React entry point
        ├── components/
        │   ├── ContactForm/
        │   │   └── ContactForm.jsx
        │   ├── ContactList/
        │   │   └── ContactList.jsx
        │   ├── ContactItem/
        │   │   └── ContactItem.jsx
        │   └── common/
        │       ├── Button.jsx
        │       ├── Input.jsx
        │       ├── Textarea.jsx
        │       └── Toast.jsx
        ├── hooks/
        │   └── useContacts.js  # Custom hook for contacts
        ├── services/
        │   └── api.js          # Axios configuration
        └── utils/
            └── validation.js   # Form validation helpers
```

---

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (v9 or higher) - Comes with Node.js
- **MongoDB** - Either:
  - [MongoDB Atlas](https://www.mongodb.com/atlas) (Cloud - Recommended)
  - [MongoDB Community Server](https://www.mongodb.com/try/download/community) (Local)

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd contact-app-task
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Server Configuration
PORT=5000

# MongoDB Configuration
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:5173
```

#### MongoDB URI Examples:

| Type | URI Format |
|------|------------|
| **Atlas (Cloud)** | `mongodb+srv://username:password@cluster.mongodb.net/contactsDB` |
| **Local** | `mongodb://localhost:27017/contactsDB` |

### Frontend Environment Variables (Optional)

Create a `.env` file in the `frontend/` directory if using a different backend URL:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## ▶️ Running the Application

### Option 1: Run Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend runs on: `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs on: `http://localhost:5173`

### Option 2: Using Concurrently (Optional)

You can install `concurrently` to run both servers with one command.

---

## 🔌 API Endpoints

### Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `GET` | `/contacts` | Get all contacts | - |
| `POST` | `/contacts` | Create new contact | `{ name, email, phone, message }` |
| `DELETE` | `/contacts/:id` | Delete a contact | - |

### Request/Response Examples

#### Create Contact
```bash
POST /api/contacts
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "message": "Hello!"
}
```

#### Response
```json
{
  "success": true,
  "message": "Contact created successfully",
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "message": "Hello!",
    "createdAt": "2026-01-02T...",
    "updatedAt": "2026-01-02T..."
  }
}
```

---

## 📊 Database Schema

```javascript
{
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    validate: email regex
  },
  phone: {
    type: String,
    required: true
  },
  message: {
    type: String,
    default: ''
  },
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🎨 Screenshots

### Desktop View
| Contact Form | Contact List |
|--------------|--------------|
| Add new contacts with validation | View, sort, and delete contacts |

### Mobile Responsive
The application is fully responsive and works on all screen sizes.

---

## 📝 Form Validation Rules

| Field | Rules |
|-------|-------|
| **Name** | Required, 2-50 characters |
| **Email** | Required, valid email format |
| **Phone** | Required, minimum 10 digits |
| **Message** | Optional, max 500 characters |

---

## 🧪 Testing the API

You can test the API using:

- **Postman** - [Download](https://www.postman.com/)
- **Thunder Client** - VS Code Extension
- **cURL** - Command line

Example cURL:
```bash
# Get all contacts
curl http://localhost:5000/api/contacts

# Create contact
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","phone":"1234567890"}'
```

---

## 🔧 Available Scripts

### Backend (`/backend`)
| Command | Description |
|---------|-------------|
| `npm start` | Start production server |
| `npm run dev` | Start development server with nodemon |

### Frontend (`/frontend`)
| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**K Gourav**

---

## 🙏 Acknowledgments

- Built as a MERN stack demonstration project
- UI styled with Tailwind CSS
- Icons from Heroicons (inline SVG)
