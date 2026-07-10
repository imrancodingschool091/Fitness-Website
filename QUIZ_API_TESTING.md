# Quiz API Testing Guide

## Backend Endpoint

**Endpoint**: `POST /api/quiz/submit`

**Headers**: 
```
Content-Type: application/json
```

**Request Body**:
```json
{
  "userId": "user-id-from-mongodb",
  "answers": {
    "gender": "male",
    "bodyType": "average",
    "goal": "gain-muscle",
    "problemAreas": ["chest", "arms"],
    "height": 180,
    "heightUnit": "cm"
  }
}
```

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Quiz submitted successfully",
  "data": {
    "userId": "...",
    "quizAnswers": {
      "gender": "male",
      "bodyType": "average",
      "goal": "gain-muscle",
      "problemAreas": ["chest", "arms"],
      "height": 180,
      "heightUnit": "cm",
      "completedAt": "2026-07-10T..."
    }
  }
}
```

**Error Response (400)** - Missing fields:
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "gender is required",
    "bodyType is required"
  ]
}
```

## Frontend Usage

The QuizFlow component handles:
1. Collecting answers from 5 quiz steps
2. Mapping answers to API format
3. Submitting to `/api/quiz/submit`
4. Handling errors and display
5. Redirecting to success page

## Testing Checklist

- [ ] User must be authenticated (userId in localStorage)
- [ ] Can navigate forward through all 5 steps
- [ ] Can navigate back to previous steps
- [ ] Submit button appears only on last step
- [ ] Error messages display if validation fails
- [ ] Success page shows after submission
- [ ] Quiz answers saved to database

## Notes

- The quiz endpoint is at `/api/quiz/submit` (not `/quiz/submit`)
- Make sure backend server is running on correct port (default: 5000)
- Frontend makes request to `/api/quiz/submit` via fetch (Next.js will proxy if configured)
