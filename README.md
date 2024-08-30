
# bar-restau

## Overview
This is the backend of a web application for a bar-restaurant, developed using the MERN stack (MongoDB, Express, React, Node.js). The backend provides RESTful API services for user authentication, table booking, and ordering

## Features
- **User Authentication**: Secure login and registration using bcrypt for password hashing and JWT for token-based authentication.
- **Table Booking**: APIs for booking tables and managing reservations.
- **Ordering**: APIs for creating and managing user orders.

## Libraries and Tools Used
- **bcrypt**: For hashing passwords before storing them in the database.
- **body-parser**: For parsing incoming request bodies.
- **cookie-parser**: For parsing cookies attached to client requests.
- **cors**: To allow cross-origin requests.
- **express**: The web framework for building RESTful APIs.
- **jsonwebtoken**: For creating and verifying JSON Web Tokens (JWTs) for authentication.
- **mongoose**: For interacting with MongoDB.

## Areas for Improvement
- **Design**: Refactor the codebase for better scalability and readability.
- **Error Handling**: Implement comprehensive error handling and logging for better reliability.
- **Admin Page API**: Add endpoints for managing users, orders, and reservations.
- **Payments API**: Integrate payment processing functionality.
- **Geolocation API**: Add functionality to fetch GPS coordinates automatically for deliveries.

## Getting Started
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Set up variables for MongoDB connection and JWT secrets.
4. Run `npm start` to start the server.

## Folder Structure
```
/src
  /config
  /controllers
  /middleware
  /models
  server.js
```