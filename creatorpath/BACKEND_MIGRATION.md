# Backend Migration: Node.js to Django

The backend for **CreatorPath** has been successfully migrated to Python and Django.

## Changes Made

### 1. New Django Backend
- Located in the `backend/` directory.
- Uses **Django REST Framework (DRF)** for the API endpoints.
- **App Created**: `accounts` (handles user authentication).
- **Serializers**: Defined for User data and Registration.
- **Views**: Implemented `RegisterView`, `LoginView`, and `ProfileView`.

### 2. Database Integration
- Successfully migrated to use the existing **MySQL** database.
- **Configured DB**: `creatorpath` on `127.0.0.1:3307` with user `root`.
- Ran all necessary Django migrations.

### 3. Frontend Updates
- Updated `login.js` and `register.js` in `creatorpath-login/src/frontend/js/`.
- Endpoint URLs changed from `http://localhost:3001` to `http://localhost:8000`.

### 4. Project Scripts
- Updated `package.json` to support running the Django server.
- **Run the backend**: `npm run dev` or `npm start`.

## How to Run
1. Ensure your MySQL server (port 3307) is running.
2. Run `npm run dev` in the `creatorpath` directory to start the Django backend.
3. Open your frontend `index.html` (e.g., via Live Server) and test the login/register flows.
