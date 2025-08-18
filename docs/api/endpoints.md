# Buddhist Reading Plans API Documentation

## Overview

This document provides detailed information about the Buddhist Reading Plans API, including design decisions, usage patterns, and implementation guidelines.

## API Design Principles

### **RESTful Design**
- Resource-based URLs (`/plans`, `/users/me/plans`)
- HTTP methods match actions (GET, POST, PUT, DELETE)
- Consistent response formats across all endpoints
- Proper HTTP status codes

### **Authentication & Authorization**
- **Integrates with existing user API** for authentication
- **JWT-based authentication** with Bearer tokens
- **Role-based access control**: Admin, Author, User
- **Public endpoints** for plan discovery and browsing
- **Protected endpoints** for user-specific actions

### **Data Consistency**
- All timestamps in ISO 8601 format
- Consistent pagination across list endpoints
- Standardized error response format
- Clear field validation rules

## Authentication Flow

### **Integration with Existing User API**
```
1. User authenticates via existing user API
2. Obtain JWT access token from user API
3. Include access token in Authorization header for Buddhist Plans API
4. Token validation handled by existing authentication middleware
```

### **Token Management**
- **Access tokens**: Provided by existing user API
- **Token validation**: Handled by shared authentication middleware
- **User context**: User ID and roles extracted from JWT claims

## Core API Workflows

### **Plan Discovery**
```
1. GET /plans → Browse all plans with filtering
   - Filter by difficulty, tags, is_active, featured, search
   - Search by title/description
   - Paginated results

2. GET /plans/{id} → Get detailed plan information
   - Includes author info, ratings, enrollment count
   - Public endpoint (no auth required)

3. GET /plans/{id}/items → Get plan structure (days)
   - Shows all days and their content overview
   - Public endpoint for plan preview
```

### **User Enrollment & Progress**
```
1. POST /users/me/plans → Enroll in a plan
   - Creates user_plan_progress record
   - Sets status to 'active'

2. GET /users/me/plans → View enrolled plans
   - Filter by status (active, completed, etc.)
   - Shows streaks and status

3. GET /plans/{id}/items/{day} → Get specific day content
   - Returns tasks for the day
   - Includes completion status if user is authenticated

4. POST /users/me/tasks/{id}/complete → Mark task as done
   - Updates task completion tracking
   - Updates streaks
```

### **Favorites**
```
1. GET /users/me/favorites → List favorite plans
2. POST /plans/{id}/favorite → Favorite a plan
3. DELETE /plans/{id}/favorite → Unfavorite a plan
```

### **Content Management (Admin/Author)**
```
1. POST /plans → Create new plan
2. POST /plans/{id}/items → Add day content
3. PUT /plans/{id} → Update plan details
4. DELETE /plans/{id} → Remove plan (Admin only)
```

## Pagination

All list endpoints use consistent pagination:

```json
{
  "items": [...],
  "total": 150,
  "page": 1,
  "limit": 20,
  "total_pages": 8
}
```

**Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20, max: 100)

## Error Handling

### **Standard Error Format**
```json
{
  "error": "error_type",
  "message": "Human-readable error message",
  "details": {...}
}
```

### **HTTP Status Codes**
- **200 OK**: Request successful
- **201 Created**: Resource created successfully
- **204 No Content**: Request successful, no content returned
- **400 Bad Request**: Invalid request data or validation failed
- **401 Unauthorized**: Invalid or missing authentication token
- **403 Forbidden**: Insufficient permissions for the requested action
- **404 Not Found**: Requested resource doesn't exist
- **409 Conflict**: Resource already exists or conflict with current state
- **422 Unprocessable Entity**: Request data is valid but cannot be processed
- **429 Too Many Requests**: Rate limit exceeded
- **500 Internal Server Error**: Unexpected server error

### **Validation Errors (400 Bad Request)**
```json
{
  "error": "validation_failed",
  "message": "Request validation failed"
}
```

## Rate Limiting

- **Authenticated users**: 1000 requests/hour
- **Unauthenticated users**: 100 requests/hour
- **Rate limit headers** included in responses:
  ```
  X-RateLimit-Limit: 1000
  X-RateLimit-Remaining: 999
  X-RateLimit-Reset: 1640995200
  ```

## Filtering & Search

### **Plan Filtering**
```
GET /plans?difficulty_level=beginner&tags=meditation,mindfulness&is_active=true&featured=false
```

**Available filters:**
- `difficulty_level`: Beginner, intermediate, advanced
- `tags`: Comma-separated tag list
- `featured`: Boolean for featured plans
- `is_active`: Boolean to include active plans only
- `search`: Full-text search in title/description

### **Search Implementation**
- PostgreSQL full-text search
- Searches plan titles and descriptions
- Case-insensitive matching
- Relevance-based ranking

## Progress Tracking

### **Streak Calculation**
- **Daily streak**: Consecutive days with at least one task completed
- **Plan-specific**: Each plan maintains its own streak
- **Reset conditions**: Missing a day resets streak to 0
- **Longest streak**: Historical maximum streak for motivation

## Content Types

### **Supported Task Content Types**
- `text`: Written content (sutras, teachings, reflections)
- `audio`: Audio files (dharma talks, guided meditations)
- `video`: Video content (teaching videos, documentaries)
- `image`: Images (artwork, diagrams, photos)
- `source_reference`: References to external Buddhist texts

### **Content Storage**
- **Text content**: Stored directly in database
- **Media files**: Stored in AWS S3 with CDN delivery
- **File URLs**: Pre-signed URLs for secure access
- **Optimization**: Multiple formats/sizes for different devices

## Security Considerations

### **Input Validation**
- All inputs validated against schema
- SQL injection prevention via parameterized queries
- XSS protection through content sanitization
- File upload restrictions (type, size, scan for malware)

### **Data Protection**
- Passwords hashed with bcrypt
- Sensitive data encrypted at rest
- HTTPS required for all endpoints
- JWT tokens signed with secure keys

### **Access Control**
- **Public**: Plan browsing, author info
- **User**: Personal progress, task completion, reviews, favorites
- **Author**: Create/edit own plans and content
- **Admin**: Full system access, user management

## Performance Optimization

### **Caching Strategy**
- **Plan data**: Cached for 1 hour (frequently accessed)
- **User progress**: Cached for 5 minutes (frequently updated)
- **Search results**: Cached for 30 minutes
- **Static content**: CDN caching for media files

### **Database Optimization**
- Indexes on frequently queried fields
- Connection pooling for database efficiency
- Read replicas for analytics queries
- Query optimization for complex joins

### **API Response Optimization**
- Minimal data in list endpoints
- Detailed data only in specific endpoints
- Compression for large responses
- Pagination to limit response size

## Mobile App Considerations

### **Offline Support**
- Download plan content for offline reading
- Sync progress when connection restored
- Local storage for user preferences
- Background sync for seamless experience

### **Push Notifications**
- Daily reading reminders
- Streak maintenance alerts
- New content notifications
- Achievement celebrations

### **Bandwidth Optimization**
- Image optimization for mobile screens
- Progressive audio/video loading
- Compressed API responses
- Efficient data synchronization

## Analytics & Monitoring

### **Key Metrics**
- API response times and error rates
- User engagement (daily active users, session length)
- Plan completion rates by difficulty/tags
- Popular content and search terms

### **Health Monitoring**
- Endpoint availability checks
- Database performance monitoring
- Cache hit rates and performance
- Third-party service dependencies

## Future API Enhancements

### **Planned Features**
- **Real-time notifications**: WebSocket support for live updates
- **Social features**: Friend connections, shared progress
- **AI recommendations**: Personalized plan suggestions
- **Advanced search**: Semantic search, content recommendations
- **Batch operations**: Bulk task completion, progress sync

### **API Versioning**
- Current version: v1
- Backward compatibility maintained for major versions
- Deprecation notices for removed features
- Migration guides for version upgrades

This API design provides a solid foundation for the Buddhist Reading Plans application while maintaining flexibility for future enhancements.
