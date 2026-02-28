# SignSecure - Modern Authentication System

A full-stack authentication system with modern UI and secure REST API built with Node.js, Express, MongoDB, and JWT.

**[Live Demo](https://abhiii9vvv.github.io/SignSecure)** | **[Report Bug](https://github.com/abhiii9vvv/SignSecure/issues)**

## Features

- Modern glassmorphism design with responsive layout
- JWT-based authentication with bcrypt password hashing
- MongoDB integration with Mongoose ODM
- Input validation and rate limiting (10 req/15min)
- Security headers (Helmet.js) and CORS support
- Real-time form validation and loading states

---

## Quick Start

**Prerequisites:** Node.js v14+, MongoDB

```bash
# Clone and install
git clone https://github.com/abhiii9vvv/SignSecure.git
cd SignSecure
npm install

# Configure environment (create backend/.env)
PORT=5000
MONGO_URI=mongodb://localhost:27017/loginsignup
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development

# Run development server
npm run dev

# Access
# Frontend: index.html
# Backend API: http://localhost:5000
```

---

## Tech Stack

**Frontend:** HTML5, CSS3, JavaScript (ES6+)  
**Backend:** Node.js, Express.js 5.2.1  
**Database:** MongoDB, Mongoose 9.2.2  
**Authentication:** JWT 9.0.3, Bcryptjs 3.0.3  
**Security:** Helmet 8.1.0, CORS 2.8.6, Express Rate Limit 8.2.1, Express Validator 7.3.1  
**Dev Tools:** Nodemon 3.1.14

---

## Project Structure

```
LoginSignUpPAGE/
├── index.html              # Signup page
├── login.html              # Login page
├── dashboard.html          # User dashboard
├── style.css               # Styles
├── script.js               # Client-side JS
├── package.json            # Dependencies
└── backend/
    ├── server.js           # Express server
    ├── config/db.js        # Database config
    ├── controller/authController.js
    ├── middleware/auth.js  # JWT verification
    ├── models/User.js      # User model
    └── routes/auth.js      # Auth routes
```

---

## API Endpoints

**Base URL:** `http://localhost:5000/api/auth`

### POST /signup
```json
// Request
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}

// Response (201)
{
  "message": "User created successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { "firstName": "John", "email": "john@example.com" }
}
```

### POST /login
```json
// Request
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}

// Response (200)
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { "firstName": "John", "email": "john@example.com" }
}
```

**Validation:**
- Password: Min 6 chars, must include uppercase, lowercase, number, symbol
- Email: Valid format required
- Names: 2-50 characters

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## Author

**Abhinav Tiwary**  
[GitHub](https://github.com/abhiii9vvv) • [LinkedIn](https://www.linkedin.com/in/abhinav-tiwary-791a63302/) • [Email](mailto:2023281975.abhinav@ug.sharda.ac.in)

---

## License

MIT License - feel free to use this project for learning and development.

---

<div align="center">Made with ❤️ by Abhinav Tiwary</div>
