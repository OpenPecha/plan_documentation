# CMS API Endpoints for Content Creators

## Overview

This document defines the API endpoints specifically designed for the Content Management System (CMS) used by Authors and Admins to create and manage Buddhist reading plans.

## Base URL

- **Production**: `https://api.webuddhist.com/v1`
- **Staging**: `https://staging-api.webuddhist.com/v1`
- **Development**: `http://localhost:8000/v1`

## Authentication & Authorization

Most CMS endpoints require JWT authentication. Include the token in the Authorization header:

```http
Authorization: Bearer <your-jwt-token>
```

**User Roles:**
- **Author**: Can manage their own content
- **Admin**: Can manage all content and system settings

## Rate Limiting

- **Authenticated users**: 1000 requests per hour
- **Unauthenticated users**: 100 requests per hour

## 1. Authentication Endpoints

### **POST /cms/auth/login**
Author login to the CMS system.

**Request Body:**
```json
{
  "email": "author@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "first_name": "John",
    "last_name": "Doe",
    "name": "John Doe",
    "email": "author@example.com",
    "avatar_url": "https://example.com/avatar.jpg",
    "is_active": true
  },
  "auth": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "bearer"
  }
}
```

### **POST /cms/auth/register**
Author registration (requires email verification and admin activation).

**Request Body:**
```json
{
  "first_name": "Jane",
  "last_name": "Smith",
  "email": "jane@example.com",
  "password": "securepassword"
}
```

**Response (201):**
```json
{
  "first_name": "Jane",
  "last_name": "Smith",
  "email": "jane@example.com",
  "status": "pending_verification",
  "message": "Registration successful. Please check your email to verify your account."
}
```

### **POST /cms/auth/verify-email**
Verify email address with token.

**Request Body:**
```json
{
  "token": "verification-token-here"
}
```

### **POST /cms/auth/refresh-token**
Refresh access token.

**Request Body:**
```json
{
  "token": "refresh-token-here"
}
```

## 2. Plan Management Endpoints

### **GET /cms/plans**
Get all plans with filtering and pagination.

**Query Parameters:**
- `search`: Search by plan title
- `sort_by`: Sort plans by field (title, total_days, status) - default: title
- `sort_order`: Sort order (asc, desc) - default: asc
- `skip`: Number of items to skip (default: 0)
- `limit`: Maximum items to return (default: 20, max: 50)

**Response (200):**
```json
{
  "plans": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "title": "Introduction to Meditation",
      "description": "A comprehensive guide to meditation practices",
      "image_url": "https://example.com/plan-image.jpg",
      "total_days": 21,
      "status": "PUBLISHED",
      "subscription_count": 342
    }
  ],
  "skip": 0,
  "limit": 20,
  "total": 5
}
```

### **POST /cms/plans**
Create a new plan.

**Request Body:**
```json
{
  "title": "Mindfulness in Daily Life",
  "description": "A 14-day journey into integrating mindfulness practices",
  "difficulty_level": "beginner",
  "total_days": 14,
  "image_url": "https://example.com/plan-image.jpg",
  "tags": ["mindfulness", "daily_practice", "beginner"]
}
```

**Response (201):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Mindfulness in Daily Life",
  "description": "A 14-day journey into integrating mindfulness practices",
  "image_url": "https://example.com/plan-image.jpg",
  "total_days": 14,
  "status": "DRAFT",
  "subscription_count": 0
}
```

### **GET /cms/plans/{plan_id}**
Get plan details with days listing.

**Response (200):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Introduction to Meditation",
  "description": "A comprehensive guide to meditation practices",
  "days": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "day_number": 1,
      "title": "Day 1: What is Meditation?",
      "tasks": [
        {
          "id": "550e8400-e29b-41d4-a716-446655440002",
          "title": "Read: Basics of Meditation",
          "description": "Introduction to meditation concepts",
          "content_type": "text",
          "content": "Meditation is the practice of...",
          "estimated_time": 10
        }
      ]
    }
  ]
}
```

### **PUT /cms/plans/{plan_id}**
Update plan (Admin/Author only).

**Request Body:**
```json
{
  "title": "Updated Plan Title",
  "description": "Updated description",
  "difficulty_level": "intermediate",
  "total_days": 30,
  "image_url": "https://example.com/new-image.jpg",
  "tags": ["updated", "meditation"]
}
```

### **DELETE /cms/plans/{plan_id}**
Delete plan (Admin only).

**Response (204):** No content

### **PATCH /cms/plans/{plan_id}/status**
Update plan status.

**Request Body:**
```json
{
  "status": "PUBLISHED"
}
```

**Response (200):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Introduction to Meditation",
  "description": "A comprehensive guide",
  "status": "PUBLISHED",
  "total_days": 21,
  "subscription_count": 342
}
```

## 3. Day Management Endpoints

### **POST /cms/plans/{plan_id}/days**
Add a new day to a plan (auto-generates day_number and title).

**Request Body:**
```json
{
  "title": "Loving-Kindness Practice"
}
```

**Response (201):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440003",
  "day_number": 5,
  "title": "Day 5: Loving-Kindness Practice",
  "tasks": []
}
```

### **PATCH /cms/plans/{plan_id}/days**
Reorder days within a plan.

**Request Body:**
```json
{
  "days": [
    {
      "day_id": "550e8400-e29b-41d4-a716-446655440003",
      "day_number": 1
    },
    {
      "day_id": "550e8400-e29b-41d4-a716-446655440004",
      "day_number": 2
    }
  ]
}
```

### **DELETE /cms/plans/{plan_id}/days/{day_id}**
Delete a day and all its tasks.

**Response (204):** No content

## 4. Task Management Endpoints

### **POST /cms/plans/{plan_id}/days/{day_id}/tasks**
Add a task to a specific day.

**Request Body:**
```json
{
  "title": "Guided Loving-Kindness Meditation",
  "description": "Practice sending love and compassion",
  "content_type": "audio",
  "content": "https://cdn.example.com/audio/loving-kindness.mp3",
  "estimated_time": 20
}
```

**Response (201):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440005",
  "title": "Guided Loving-Kindness Meditation",
  "description": "Practice sending love and compassion",
  "content_type": "audio",
  "content": "https://cdn.example.com/audio/loving-kindness.mp3",
  "estimated_time": 20
}
```

### **PUT /cms/plans/{plan_id}/days/{day_id}/tasks/{task_id}**
Update a specific task.

**Request Body:**
```json
{
  "title": "Updated Task Title",
  "description": "Updated description",
  "content_type": "text",
  "content": "Updated content",
  "estimated_time": 15
}
```

### **DELETE /cms/plans/{plan_id}/days/{day_id}/tasks/{task_id}**
Delete a specific task.

**Response (204):** No content

### **PATCH /cms/plans/{plan_id}/tasks/{task_id}**
Move a task to a different day.

**Request Body:**
```json
{
  "day_id": "550e8400-e29b-41d4-a716-446655440006"
}
```

## 5. Media Upload Endpoints

### **POST /cms/media/upload**
Upload image for plans or tasks.

**Request:** Multipart form data
- `file`: Image file (JPEG, PNG, WebP)
- `path`: Storage path for the uploaded file (e.g., "plans/images/")

**Response (201):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440007",
  "url": "https://cdn.example.com/plans/images/meditation-image.jpg",
  "filename": "meditation-image.jpg",
  "size": 2048576,
  "mime_type": "image/jpeg",
  "path": "plans/images/",
  "uploaded_at": "2024-01-20T15:00:00Z",
  "uploaded_by": "550e8400-e29b-41d4-a716-446655440000"
}
```

## 6. Reviews Endpoints

### **GET /cms/plans/{plan_id}/reviews**
Get plan reviews.

**Query Parameters:**
- `skip`: Number of items to skip (default: 0)
- `limit`: Maximum items to return (default: 10, max: 50)

**Response (200):**
```json
{
  "reviews": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440008",
      "plan_id": "550e8400-e29b-41d4-a716-446655440000",
      "author_id": "550e8400-e29b-41d4-a716-446655440009",
      "author_name": "John Practitioner",
      "rating": 5,
      "review_text": "Excellent meditation plan! Very helpful for beginners.",
      "is_approved": true,
      "created_at": "2024-01-15T10:30:00Z"
    }
  ],
  "skip": 0,
  "limit": 10,
  "total": 25
}
```

## 7. Admin Author Management Endpoints

### **GET /cms/admin/pending-authors**
Get authors pending activation (Admin only).

**Query Parameters:**
- `skip`: Number of items to skip (default: 0)
- `limit`: Maximum items to return (default: 20, max: 50)

**Response (200):**
```json
{
  "authors": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440010",
      "first_name": "Jane",
      "last_name": "Smith",
      "email": "jane@example.com",
      "name": "Jane Smith",
      "is_active": false,
      "is_email_verified": true,
      "created_at": "2024-01-20T10:00:00Z",
      "activated_at": null
    }
  ],
  "skip": 0,
  "limit": 20,
  "total": 5
}
```

### **PATCH /cms/admin/authors/{author_id}/activate**
Activate author account (Admin only).

**Response (200):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440010",
  "first_name": "Jane",
  "last_name": "Smith",
  "email": "jane@example.com",
  "name": "Jane Smith",
  "is_active": true,
  "is_email_verified": true,
  "created_at": "2024-01-20T10:00:00Z",
  "activated_at": "2024-01-21T09:00:00Z"
}
```

### **PATCH /cms/admin/authors/{author_id}/deactivate**
Deactivate author account (Admin only).

## 8. Author Management Endpoints

### **GET /cms/authors**
Get all authors (Admin only).

**Query Parameters:**
- `verified_only`: Filter to verified authors only (default: false)

**Response (200):**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440010",
    "first_name": "Jane",
    "last_name": "Smith",
    "email": "jane@example.com",
    "name": "Jane Smith",
    "image_url": "https://example.com/avatar.jpg",
    "is_active": true,
    "is_email_verified": true,
    "created_at": "2024-01-20T10:00:00Z",
    "activated_at": "2024-01-21T09:00:00Z"
  }
]
```

### **GET /cms/authors/me**
Get current author's details.

**Response (200):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440010",
  "first_name": "Jane",
  "last_name": "Smith",
  "email": "jane@example.com",
  "name": "Jane Smith",
  "image_url": "https://example.com/avatar.jpg",
  "is_active": true,
  "is_email_verified": true,
  "created_at": "2024-01-20T10:00:00Z",
  "plan_count": 5,
  "average_rating": 4.6,
  "bio": "Experienced meditation teacher with 10 years of practice."
}
```

### **PUT /cms/authors/me**
Update current author's details.

**Request Body:**
```json
{
  "name": "Jane Smith-Doe",
  "image_url": "https://example.com/new-avatar.jpg",
  "bio": "Updated bio with more experience details."
}
```

### **GET /cms/authors/{author_id}**
Get author details (Admin only).

### **PATCH /cms/authors/{author_id}**
Enable/disable author (Admin only).

**Request Body:**
```json
{
  "is_active": false
}
```

### **DELETE /cms/authors/{author_id}**
Delete author (Admin only).

**Response (204):** No content

### **GET /cms/authors/{author_id}/plans**
Get plans by author (Admin only).

**Response (200):**
```json
{
  "plans": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "title": "Introduction to Meditation",
      "description": "A comprehensive guide",
      "total_days": 21,
      "status": "PUBLISHED",
      "subscription_count": 342
    }
  ]
}
```

## Error Responses

All endpoints follow consistent error response format:

```json
{
  "error": "validation_failed",
  "message": "Request validation failed"
}
```

**Common HTTP Status Codes:**
- `200`: Success
- `201`: Created
- `204`: No Content
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `409`: Conflict
- `413`: File Too Large

## Pagination Format

All paginated endpoints use consistent pagination:

**Query Parameters:**
- `skip`: Number of items to skip (default: 0)
- `limit`: Maximum items to return

**Response Format:**
```json
{
  "[resource_name]": [...],
  "skip": 0,
  "limit": 20,
  "total": 100
}
```

## Content Types

Supported content types for tasks:
- `text`: Text-based content
- `audio`: Audio files and URLs
- `video`: Video files and URLs
- `image`: Image files and URLs
- `source_reference`: References to Buddhist texts

## Difficulty Levels

- `beginner`: For new practitioners
- `intermediate`: For those with some experience
- `advanced`: For experienced practitioners

## Buddhist Traditions

- `theravada`: Theravada Buddhism
- `mahayana`: Mahayana Buddhism
- `vajrayana`: Vajrayana Buddhism
- `zen`: Zen Buddhism
- `pure_land`: Pure Land Buddhism
- `nichiren`: Nichiren Buddhism
- `general`: General Buddhist teachings
