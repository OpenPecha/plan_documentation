# Buddhist Reading Plans - Visual Database Schema

## ASCII Database Schema Diagram

```
┌─────────────────┐       ┌─────────────────────────────────────┐
│     AUTHORS     │       │               PLANS                 │
├─────────────────┤   1:N ├─────────────────────────────────────┤
│ • id (PK)       │◄──────┤ • id (PK)                           │
│ • name          │       │ • title                             │
│ • image_url     │       │ • description                       │
│ • email         │       │ • author_id (FK) ──────────────────►│
│ • is_verified   │       │ • tradition (enum)                  │
│ • is_active     │       │ • difficulty_level (enum)          │
└─────────────────┘       │ • tags (JSONB)                     │
                          │ • featured                          │
                          │ • estimated_daily_minutes           │
                          └─────────────────────────────────────┘
                                              │
                                              │ 1:N
                                              ▼
                          ┌─────────────────────────────────────┐
                          │            PLAN_ITEMS               │
                          ├─────────────────────────────────────┤
                          │ • id (PK)                           │
                          │ • plan_id (FK) ─────────────────────┤
                          │ • day_number                        │
                          │ • title                             │
                          │ • description                       │
                          │ • estimated_duration                │
                          └─────────────────────────────────────┘
                                              │
                                              │ 1:N
                                              ▼
┌─────────────────────────────────────┐   ┌─────────────────────────────────────┐
│              TASKS                  │   │        USER_TASK_COMPLETION         │
├─────────────────────────────────────┤   ├─────────────────────────────────────┤
│ • id (PK)                           │   │ • id (PK)                           │
│ • plan_item_id (FK) ────────────────┤   │ • user_id                           │
│ • content_type (enum)               │   │ • task_id (FK) ─────────────────────┤
│ • content                           │   │ • completed_at                      │
│ • display_order                     │   └─────────────────────────────────────┘
│ • estimated_time                    │                     ▲
│ • is_required                       │                     │ N:1
│ • instruction                       │                     │
│ • reflection_prompt                 │◄────────────────────┘
└─────────────────────────────────────┘

┌─────────────────────────────────────┐   ┌─────────────────────────────────────┐
│         USER_PLAN_PROGRESS          │   │           PLAN_REVIEWS              │
├─────────────────────────────────────┤   ├─────────────────────────────────────┤
│ • id (PK)                           │   │ • id (PK)                           │
│ • user_id                           │   │ • plan_id (FK) ─────────────────────┤
│ • plan_id (FK) ─────────────────────┤   │ • user_id                           │
│ • started_at                        │   │ • rating (1-5)                      │
│ • completion_percentage             │   │ • review_text                       │
│ • streak_count                      │   │ • is_approved                       │
│ • longest_streak                    │   └─────────────────────────────────────┘
│ • favorite                          │                     ▲
│ • status (enum)                     │                     │ N:1
│ • is_completed                      │                     │
└─────────────────────────────────────┘                     │
                    ▲                                       │
                    │ N:1                                   │
                    │                                       │
                    └───────────────────────────────────────┘
                              PLANS
```

## Relationship Summary

**Core Content Hierarchy:**
```
AUTHORS (1) ──► PLANS (N) ──► PLAN_ITEMS (N) ──► TASKS (N)
```

**User Interactions:**
```
USERS ──► USER_PLAN_PROGRESS (tracks plan enrollment & progress)
USERS ──► USER_TASK_COMPLETION (tracks individual task completion)
USERS ──► PLAN_REVIEWS (ratings & feedback)
```

## Creating Professional Visual Diagrams

###  Code-to-Diagram Tools

**Mermaid Live Editor**
1. Go to https://mermaid.live/
2. Paste the Mermaid code from below
3. Export as PNG or SVG

```mermaid
erDiagram
    authors {
        bigint id PK
        varchar name
        varchar image_url
        varchar email
        boolean is_verified
        boolean is_active
    }

    plans {
        bigint id PK
        varchar title
        text description
        bigint author_id FK
        buddhist_tradition tradition
        difficulty_level difficulty_level
        jsonb tags
        boolean featured
        integer estimated_daily_minutes
    }

    plan_items {
        bigint id PK
        bigint plan_id FK
        integer day_number
        varchar title
        text description
        integer estimated_duration
    }

    tasks {
        bigint id PK
        bigint plan_item_id FK
        content_type content_type
        text content
        integer display_order
        boolean is_required
        text instruction
        text reflection_prompt
    }

    user_plan_progress {
        bigint id PK
        bigint user_id
        bigint plan_id FK
        timestamp started_at
        decimal completion_percentage
        integer streak_count
        user_plan_status status
        boolean is_completed
    }

    user_task_completion {
        bigint id PK
        bigint user_id
        bigint task_id FK
        timestamp completed_at
    }

    plan_reviews {
        bigint id PK
        bigint plan_id FK
        bigint user_id
        integer rating
        text review_text
        boolean is_approved
    }

    authors ||--o{ plans : creates
    plans ||--o{ plan_items : contains
    plan_items ||--o{ tasks : includes
    plans ||--o{ user_plan_progress : tracks
    plans ||--o{ plan_reviews : receives
    tasks ||--o{ user_task_completion : completed_by
```

## Simplified Business Logic Flow

```mermaid
flowchart TD
    A[Author Creates Plan] --> B[Plan Contains Multiple Days]
    B --> C[Each Day Has Multiple Tasks]
    C --> D[User Enrolls in Plan]
    D --> E[User Completes Tasks Daily]
    E --> F[Progress Tracked & Streaks Calculated]
    F --> G[User Can Review Plan]
    
    style A fill:#e1f5fe
    style D fill:#f3e5f5
    style E fill:#e8f5e8
    style F fill:#fff3e0
    style G fill:#fce4ec
```

## Key Relationships Explained

### **Core Content Structure**
- **Authors** create **Plans**
- **Plans** contain multiple **Plan Items** (daily content)
- **Plan Items** include multiple **Tasks** (specific activities)

### **User Interaction**
- **Users** enroll in **Plans** (tracked in `user_plan_progress`)
- **Users** complete individual **Tasks** (tracked in `user_task_completion`)
- **Users** can review **Plans** (stored in `plan_reviews`)

### **Progress Tracking**
- Plan-level progress: completion percentage, streaks, status
- Task-level completion: individual task completion timestamps
- Review system: ratings and feedback for plans

## Enum Types Reference

```mermaid
classDiagram
    class buddhist_tradition {
        <<enumeration>>
        theravada
        mahayana
        vajrayana
        zen
        pure_land
        nichiren
        general
    }
    
    class difficulty_level {
        <<enumeration>>
        beginner
        intermediate
        advanced
    }
    
    class content_type {
        <<enumeration>>
        text
        audio
        video
        image
        source_reference
    }
    
    class user_plan_status {
        <<enumeration>>
        not_started
        active
        paused
        completed
        abandoned
    }
    
    class unlock_condition {
        <<enumeration>>
        sequential
        date_based
    }
```

## Business Rules Summary

### **Plan Organization**
- **Simplified Categorization**: Only `tradition`, `difficulty_level`, and flexible `tags`
- **Featured Plans**: Admin-curated plans for homepage promotion
- **Multi-language**: Plans can be created in different languages

### **User Experience**
- **Flexible Enrollment**: Users can have multiple active plans
- **Progress Tracking**: Plan-specific streaks and completion percentages
- **Task Flexibility**: Tasks can be required or optional
- **Review System**: Users can rate and review completed plans

### **Content Management**
- **Author Verification**: Authors can be verified by admins
- **Content Types**: Support for text, audio, video, images, and references
- **Scheduling**: Plans can be sequential or date-based
- **Time Estimation**: Both daily and task-level time estimates

## Key Indexes for Performance

- **Plan Discovery**: `(tradition, difficulty_level, is_active)`
- **Featured Plans**: `(featured)` where featured = TRUE
- **Full-text Search**: GIN index on plan titles and descriptions
- **Tags Search**: GIN index on JSONB tags field
- **User Progress**: `(user_id, status)` for dashboard queries
- **Task Completion**: `(user_id, task_id)` for progress tracking
