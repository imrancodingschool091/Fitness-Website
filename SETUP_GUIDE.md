# Complete Setup & Running Instructions

## 1. Database Setup
Make sure MongoDB is running locally on `mongodb://localhost:27017`

```bash
# Check if MongoDB is running
mongod --version
```

## 2. Backend Server Setup

```bash
cd server
npm install  # if not done yet
npm run dev  # starts on localhost:5000
```

**Backend will:**
- Connect to MongoDB
- Provide API endpoints:
  - `POST /api/quiz/submit` - Save quiz answers
  - `POST /api/auth/signin` - Create/update user & link quiz

## 3. Frontend Server Setup

```bash
cd client
npm install  # if not done yet
npm run dev  # starts on localhost:3000
```

**Frontend will:**
- Create API proxy routes that forward to backend
- Host the Next.js app

## 4. Complete Flow

### Step 1: Take Quiz
1. Navigate to `http://localhost:3000/quiz`
2. Complete all 5 questions
3. Submit (sends to `/api/quiz/submit`)

### Step 2: Success Page
1. Redirected to `/quiz-success`
2. Click "Sign Up Now"

### Step 3: Sign Up
1. Redirected to `/signup`
2. Enter email address
3. Click "Sign Up"
4. Backend creates user + links quiz data
5. Redirected to home

### Step 4: Already Have Account?
1. On signup page, click "Sign In"
2. Goes to `/signin`
3. Enter email
4. If quiz was taken, it will be linked automatically

## 5. Files Created/Updated

### Frontend
- `/client/app/api/quiz/submit/route.js` - Quiz API proxy
- `/client/app/api/auth/signin/route.js` - Auth API proxy
- `/client/app/signup/page.js` - NEW: Signup page
- `/client/app/quiz-success/page.js` - Updated to link to signup
- `/client/components/quiz/QuizFlow.js` - Updated quiz submission
- `/client/.env.local` - Backend URL config

### Backend
- `/server/models/Quiz.js` - NEW: Quiz collection schema
- `/server/controllers/quizController.js` - Quiz submission logic
- `/server/controllers/authController.js` - Updated to link quiz
- `/server/routes/quizRoutes.js` - NEW: Quiz API routes
- `/server/server.js` - Updated to include quiz routes

## 6. Database Collections

### Quiz Collection
```
{
  sessionId: unique identifier for quiz session
  gender, bodyType, goal, problemAreas, height, heightUnit
  linked: boolean (linked to user?)
  linkedUserId: ObjectId reference to user
  email: user's email if registered
  timestamps
}
```

### Users Collection
```
{
  email: user's email
  quizAnswers: {
    gender, bodyType, goal, problemAreas, height, heightUnit
    completedAt: timestamp
  }
  timestamps
}
```

## 7. Environment Variables

### Backend (.env)
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/mern
```

### Frontend (.env.local)
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

## 8. Troubleshooting

**Error: "JSON parsing error" on quiz page**
- Make sure backend server is running on port 5000
- Check MongoDB is connected

**Error: "Cannot find module"**
- Run `npm install` in both client and server folders

**Quiz data not saving**
- Check MongoDB is running
- Check backend server logs for errors
- Verify API routes are correct

**Signup not working**
- Make sure backend is running
- Check network tab in browser DevTools for API errors
- Verify email format is valid
