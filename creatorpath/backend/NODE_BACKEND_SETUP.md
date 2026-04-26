# Node.js Backend Setup

The backend for **CreatorPath** has been migrated to Node.js and Express.

## Architecture
- **Server**: Express.js
- **Database**: MySQL (Port 3307)
- **Authentication**: JWT (JSON Web Tokens) & BcryptJS
- **Frontend Integration**: Static file serving and API endpoints

## API Endpoints
- `POST /auth/register`: Register a new user
- `POST /auth/login`: Login and receive a JWT
- `GET /auth/profile`: Get current user profile (requires token)

## How to Run
1.  **Environment Variables**: Ensure the `.env` file in the `backend/` directory is correctly configured with your MySQL credentials.
2.  **Start the Server**:
    ```bash
    cd backend
    npm start
    ```
    or
    ```bash
    npm run dev
    ```
3.  **Access the App**: Open your browser to `http://localhost:3001`. The server automatically serves the frontend files from the `frontend/` directory (relative to the root).

## Database Schema
The server automatically creates a `users` table if it doesn't exist:
- `id`: Primary Key
- `name`: User's full name
- `email`: Unique email address
- `password`: Hashed password
- `created_at`: Timestamp
