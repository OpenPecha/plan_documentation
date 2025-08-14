# CMS API Endpoints for Content Creators

## Overview

This document defines the API endpoints specifically designed for the Content Management System (CMS) used by Authors and Admins to create and manage Buddhist reading plans.

## Authentication & Authorization

All CMS endpoints require authentication and appropriate role-based permissions:
- **Author**: Can manage their own content
- **Admin**: Can manage all content and system settings

```http
Authorization: Bearer <jwt-token>
```

## 1. Dashboard Endpoints

### **GET /cms/dashboard**
Get dashboard data based on user role.

**Author Response:**
```json
{
  "my_plans": {
    "total": 5,
    "published": 3,
    "draft": 2,
    "total_enrollments": 1250,
    "average_rating": 4.6
  },
  "recent_activity": [
    {
      "type": "new_enrollment",
      "plan_id": "123",
      "plan_title": "Mindfulness for Beginners",
      "count": 15,
      "timestamp": "2024-01-15T10:30:00Z"
    }
  ],
  "performance_metrics": {
    "this_month_enrollments": 89,
    "completion_rate": 0.78,
    "recent_reviews": 12
  }
}
```

**Admin Response:**
```json
{
  "platform_overview": {
    "total_plans": 156,
    "total_authors": 23,
    "total_users": 5420,
    "active_plans": 134
  },
  "moderation_queue": {
    "pending_plans": 7,
    "reported_content": 2
  },
  "system_health": {
    "api_response_time": "120ms",
    "error_rate": 0.02,
    "uptime": 99.9
  }
}
```

## 2. Plan Management Endpoints

### **GET /cms/plans**
Get plans for the authenticated user (Author) or all plans (Admin).

**Query Parameters:**
- `status`: draft, published, archived
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)
- `search`: Search in title/description
- `tradition`: Filter by Buddhist tradition
- `author_id`: Filter by author (Admin only)

**Response:**
```json
{
  "plans": [
    {
      "id": "plan_123",
      "title": "Introduction to Meditation",
      "status": "published",
      "duration_days": 21,
      "tradition": "general",
      "difficulty_level": "beginner",
      "enrollments": 342,
      "average_rating": 4.5,
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-15T10:30:00Z",
      "author": {
        "id": "author_456",
        "name": "Lama Tenzin",
        "is_verified": true
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 5,
    "total_pages": 1
  }
}
```

### **POST /cms/plans**
Create a new plan.

**Request Body:**
```json
{
  "title": "Mindfulness in Daily Life",
  "description": "A 14-day journey into integrating mindfulness...",
  "duration_days": 14,
  "tradition": "general",
  "difficulty_level": "beginner",
  "practice_type": "meditation",
  "tags": ["mindfulness", "daily_practice", "beginner"],
  "unlock_condition": "sequential",
  "is_featured": false,
  "visibility": "public"
}
```

**Response:**
```json
{
  "id": "plan_789",
  "title": "Mindfulness in Daily Life",
  "status": "draft",
  "created_at": "2024-01-20T15:00:00Z",
  "author_id": "author_456"
}
```

### **GET /cms/plans/{plan_id}**
Get detailed plan information for editing.

**Response:**
```json
{
  "id": "plan_123",
  "title": "Introduction to Meditation",
  "description": "A comprehensive guide...",
  "status": "published",
  "duration_days": 21,
  "tradition": "general",
  "difficulty_level": "beginner",
  "practice_type": "meditation",
  "tags": ["meditation", "beginner"],
  "unlock_condition": "sequential",
  "is_featured": false,
  "visibility": "public",
  "plan_items": [
    {
      "id": "item_001",
      "day_number": 1,
      "title": "What is Meditation?",
      "description": "Introduction to meditation concepts",
      "unlock_condition": "sequential",
      "tasks": [
        {
          "id": "task_001",
          "type": "text",
          "title": "Read: Basics of Meditation",
          "content": {
            "text": "Meditation is the practice of...",
            "estimated_duration": 10
          },
          "order": 1
        }
      ]
    }
  ],
  "analytics": {
    "enrollments": 342,
    "completions": 267,
    "average_rating": 4.5,
    "completion_rate": 0.78
  }
}
```

### **PUT /cms/plans/{plan_id}**
Update plan metadata.

### **DELETE /cms/plans/{plan_id}**
Delete a plan (Admin only, or Author if no enrollments).

### **POST /cms/plans/{plan_id}/publish**
Publish a draft plan.

### **POST /cms/plans/{plan_id}/unpublish**
Unpublish a plan (move to draft).

## 3. Plan Content Management

### **POST /cms/plans/{plan_id}/items**
Add a new daily item to a plan.

**Request Body:**
```json
{
  "day_number": 5,
  "title": "Loving-Kindness Meditation",
  "description": "Practice sending love and compassion",
  "unlock_condition": "sequential",
  "tasks": [
    {
      "type": "audio",
      "title": "Guided Loving-Kindness Meditation",
      "content": {
        "audio_url": "https://cdn.example.com/audio/loving-kindness.mp3",
        "duration": 1200,
        "transcript": "Begin by finding a comfortable position..."
      },
      "order": 1
    },
    {
      "type": "reflection",
      "title": "Reflection Questions",
      "content": {
        "questions": [
          "How did you feel during the meditation?",
          "What challenges did you encounter?"
        ]
      },
      "order": 2
    }
  ]
}
```

### **PUT /cms/plans/{plan_id}/items/{item_id}**
Update a plan item.

### **DELETE /cms/plans/{plan_id}/items/{item_id}**
Delete a plan item.

### **POST /cms/plans/{plan_id}/items/{item_id}/tasks**
Add a task to a plan item.

### **PUT /cms/plans/{plan_id}/items/{item_id}/tasks/{task_id}**
Update a task.

### **DELETE /cms/plans/{plan_id}/items/{item_id}/tasks/{task_id}**
Delete a task.

## 4. Media Management

### **GET /cms/media**
Get media library for the authenticated user.

**Query Parameters:**
- `type`: audio, video, image, document
- `folder`: Folder path
- `search`: Search in filename/tags
- `page`, `limit`: Pagination

**Response:**
```json
{
  "media": [
    {
      "id": "media_123",
      "filename": "meditation-bell.mp3",
      "type": "audio",
      "size": 2048576,
      "duration": 300,
      "url": "https://cdn.example.com/audio/meditation-bell.mp3",
      "folder": "/my-plans/mindfulness-basics/audio",
      "tags": ["bell", "meditation", "timer"],
      "uploaded_at": "2024-01-15T10:00:00Z",
      "usage_count": 5
    }
  ],
  "folders": [
    "/my-plans/mindfulness-basics",
    "/shared-resources/meditation-guides"
  ]
}
```

### **POST /cms/media/upload**
Upload media files.

**Request:** Multipart form data
- `file`: The media file
- `folder`: Target folder (optional)
- `tags`: Comma-separated tags (optional)
- `description`: File description (optional)

**Response:**
```json
{
  "id": "media_456",
  "filename": "guided-meditation.mp3",
  "url": "https://cdn.example.com/audio/guided-meditation.mp3",
  "type": "audio",
  "size": 15728640,
  "duration": 1800
}
```

### **PUT /cms/media/{media_id}**
Update media metadata (tags, description, folder).

### **DELETE /cms/media/{media_id}**
Delete media file.

### **POST /cms/media/folders**
Create a new folder.

### **GET /cms/media/{media_id}/usage**
Get usage information for a media file.

## 5. Analytics Endpoints

### **GET /cms/analytics/plans/{plan_id}**
Get detailed analytics for a specific plan.

**Response:**
```json
{
  "plan_id": "plan_123",
  "overview": {
    "total_enrollments": 342,
    "total_completions": 267,
    "completion_rate": 0.78,
    "average_rating": 4.5,
    "total_reviews": 89
  },
  "engagement": {
    "daily_completion_rates": [
      {"day": 1, "completion_rate": 0.95},
      {"day": 2, "completion_rate": 0.89},
      {"day": 3, "completion_rate": 0.84}
    ],
    "drop_off_points": [
      {"day": 7, "drop_off_rate": 0.15},
      {"day": 14, "drop_off_rate": 0.08}
    ]
  },
  "content_performance": {
    "most_engaging_tasks": [
      {
        "task_id": "task_005",
        "title": "Guided Meditation",
        "engagement_score": 0.92
      }
    ],
    "least_engaging_tasks": [
      {
        "task_id": "task_012",
        "title": "Reading Assignment",
        "engagement_score": 0.67
      }
    ]
  },
  "user_feedback": {
    "rating_distribution": {
      "5": 45,
      "4": 32,
      "3": 8,
      "2": 3,
      "1": 1
    },
    "common_themes": [
      {"theme": "helpful_guidance", "count": 23},
      {"theme": "too_fast_paced", "count": 8}
    ]
  }
}
```

### **GET /cms/analytics/author/{author_id}**
Get analytics for an author's content (Admin only, or own data for Authors).

## 6. Content Moderation (Admin Only)

### **GET /cms/moderation/queue**
Get content awaiting moderation.

**Response:**
```json
{
  "pending_plans": [
    {
      "id": "plan_789",
      "title": "Advanced Zen Practice",
      "author": {
        "id": "author_123",
        "name": "Teacher Sarah"
      },
      "submitted_at": "2024-01-20T10:00:00Z",
      "priority": "normal"
    }
  ],
  "reported_content": [
    {
      "id": "report_001",
      "content_type": "plan",
      "content_id": "plan_456",
      "reason": "inappropriate_content",
      "reporter_id": "user_789",
      "reported_at": "2024-01-19T15:30:00Z"
    }
  ]
}
```

### **POST /cms/moderation/plans/{plan_id}/approve**
Approve a plan for publication.

### **POST /cms/moderation/plans/{plan_id}/reject**
Reject a plan with feedback.

**Request Body:**
```json
{
  "reason": "Content needs improvement",
  "feedback": "Please add more detailed instructions for the meditation practices.",
  "suggestions": [
    "Add audio guidance for day 3",
    "Clarify the breathing technique description"
  ]
}
```

### **POST /cms/moderation/plans/{plan_id}/feature**
Feature a plan on the homepage.

### **DELETE /cms/moderation/plans/{plan_id}/feature**
Remove plan from featured content.

## 7. Author Management (Admin Only)

### **GET /cms/authors**
Get all authors with management information.

### **POST /cms/authors**
Create a new author account.

### **PUT /cms/authors/{author_id}**
Update author information.

### **POST /cms/authors/{author_id}/verify**
Verify an author (add verification badge).

### **DELETE /cms/authors/{author_id}/verify**
Remove author verification.

### **POST /cms/authors/{author_id}/suspend**
Suspend an author account.

## 8. Bulk Operations

### **POST /cms/bulk/plans/export**
Export multiple plans to JSON format.

### **POST /cms/bulk/plans/import**
Import plans from JSON format.

### **POST /cms/bulk/media/organize**
Bulk organize media files into folders.

## Error Responses

All endpoints follow consistent error response format:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Plan title is required",
    "details": {
      "field": "title",
      "constraint": "required"
    }
  }
}
```

## Rate Limiting

CMS endpoints have higher rate limits for authenticated users:
- **Authors**: 1000 requests per hour
- **Admins**: 2000 requests per hour
- **File uploads**: 100 uploads per hour per user

## Webhooks

CMS supports webhooks for real-time updates:
- `plan.published`: When a plan is published
- `plan.featured`: When a plan is featured/unfeatured
- `moderation.required`: When content needs moderation
- `analytics.milestone`: When plans reach enrollment milestones
