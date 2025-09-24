

# **Full Stack Recruitment Platform Prototype**

A full-stack recruitment platform prototype built with **React (frontend), Node.js + Express (backend), MongoDB**, and **JWT authentication**. Demonstrates user registration, login, and protected profile pages.

---

## **🚀 Features**

* User Registration (`/api/register`)
* User Login (`/api/login`) with JWT
* Protected User Profile (`/api/profile`)
* Error handling for invalid inputs and authentication
* Minimal React frontend
* Curl commands provided for testing

---

## **💻 Tech Stack**

* **Frontend:** React, React Router, Axios
* **Backend:** Node.js, Express
* **Database:** MongoDB (Atlas or local)
* **Authentication:** JWT
* **Styling:** Optional Tailwind CSS

---

## **⚙️ Setup Instructions**

### **Backend Setup**

1. Navigate to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file with:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_here
```

4. Start the backend server:

```bash
npm run dev
```

---

### **Frontend Setup**

1. Navigate to frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start React app:

```bash
npm run dev
```

4. Open in browser:

```
http://localhost:5173
```

---

## **🗂 Database Schema**

**User Collection**

```js
{
  _id: ObjectId,
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}
```

---

## **🔗 API Documentation**

**Base URL:** `http://localhost:5000/api`

---

### **1. Register User**

* **Endpoint:** `POST /register`
* **Description:** Registers a new user and returns user info + JWT.
* **Request Body:**

```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "password123"
}
```

* **Success Response (201):**

```json
{
  "success": true,
  "data": {
    "_id": "user_id_here",
    "name": "Alice",
    "email": "alice@example.com",
    "token": "JWT_TOKEN_HERE"
  }
}
```

* **Error Responses:**

  * 400 → Missing fields
  * 400 → User already exists

---

### **2. Login User**

* **Endpoint:** `POST /login`
* **Description:** Authenticates a user and returns JWT.
* **Request Body:**

```json
{
  "email": "alice@example.com",
  "password": "password123"
}
```

* **Success Response (200):**

```json
{
  "success": true,
  "data": {
    "_id": "user_id_here",
    "name": "Alice",
    "email": "alice@example.com",
    "token": "JWT_TOKEN_HERE"
  }
}
```

* **Error Responses:**

  * 401 → Invalid email or password

---

### **3. Get Profile**

* **Endpoint:** `GET /profile`
* **Description:** Returns the logged-in user’s profile. Requires JWT.
* **Headers:**

```
Authorization: Bearer JWT_TOKEN_HERE
```

* **Success Response (200):**

```json
{
  "success": true,
  "data": {
    "_id": "user_id_here",
    "name": "Alice",
    "email": "alice@example.com",
    "createdAt": "2025-09-24T12:00:00.000Z"
  }
}
```

* **Error Responses:**

  * 401 → No token provided
  * 401 → Invalid token
  * 404 → User not found

---

## **💻 Curl Testing Commands**

### 1. Register Alice

```bash
curl -X POST http://localhost:5000/api/register \
-H "Content-Type: application/json" \
-d '{"name":"Alice","email":"alice@example.com","password":"password123"}'
```

### 2. Register Bob

```bash
curl -X POST http://localhost:5000/api/register \
-H "Content-Type: application/json" \
-d '{"name":"Bob","email":"bob@example.com","password":"mypassword"}'
```

### 3. Login Alice

```bash
curl -X POST http://localhost:5000/api/login \
-H "Content-Type: application/json" \
-d '{"email":"alice@example.com","password":"password123"}'
```

### 4. Fetch Alice’s Profile

```bash
curl -X GET http://localhost:5000/api/profile \
-H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### 5. Register Duplicate Alice (Error)

```bash
curl -X POST http://localhost:5000/api/register \
-H "Content-Type: application/json" \
-d '{"name":"Alice Dup","email":"alice@example.com","password":"newpassword"}'
```

---

## **🏗 Architectural Choices**

* **React frontend** communicates with **Express backend** via REST API.
* **JWT-based auth** keeps frontend stateless and secure.
* **MongoDB** for flexible data storage.
* **Modular backend:**

  * `controllers/` → API logic
  * `models/` → MongoDB schemas
  * `routes/` → API endpoints
  * `middlewares/` → Auth & error handling

---

## **🔒 Authentication & Security**

* **Passwords** hashed using **bcrypt**
* **JWT tokens** for stateless authentication
* **Protected routes** verified via `authMiddleware`
* Only authenticated users can access `/api/profile`

---

## **⚠️ Error Handling**

* Centralized `errorHandler` middleware
* Returns proper HTTP status codes:

  * 400 → Bad request
  * 401 → Unauthorized
  * 500 → Server error
* JSON responses:

```json
{
  "success": false,
  "message": "Error message"
}
```

---

## **📈 Scaling & Improvements**

* **Database:** MongoDB Atlas or Replica Set for horizontal scaling
* **Caching:** Use Redis for frequently accessed data
* **Microservices:** Split auth, user management, recruitment features
* **Roles & Permissions:** Add admin, recruiter, candidate roles
* **Frontend:** Enhance UI, form validation, error feedback
* **Security:** Rate limiting, HTTPS, refresh tokens

