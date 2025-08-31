# Database Relationship Diagram

## mermaid live editor
https://mermaid.live/

## Entity Relationship Diagram

```mermaid
erDiagram
    %% Core Plan Structure
    plans ||--o{ plan_items : "has daily content"
    plan_items ||--o{ plan_tasks : "contains tasks"
    
    %% Author Relationships
    authors ||--o{ plans : "creates"
    
    %% User Progress Tracking
    plans ||--o{ user_plan_progress : "tracked by users"
    plan_tasks ||--o{ user_task_completion : "completed by users"
    
    %% User Interactions
    plans ||--o{ plan_reviews : "reviewed by users"
    plans ||--o{ favorites : "favorited by users"
    
    %% Table Definitions
    plans {
        id uuid PK
        title varchar
        description text
        author_id uuid FK
        language language_code
        difficulty_level difficulty_level
        duration_days integer
        estimated_daily_minutes integer
        tags jsonb
        status plan_status
        featured boolean
        image_url varchar
        created_by varchar
        updated_by varchar
        deleted_at timestamptz
        deleted_by varchar
        created_at timestamptz
        updated_at timestamptz
    }
    
    authors {
        id uuid PK
        first_name varchar
        last_name varchar
        bio text
        image_url varchar
        email varchar
        password varchar
        is_verified boolean
        is_active boolean
        created_by varchar
        updated_by varchar
        deleted_at timestamptz
        deleted_by varchar
        created_at timestamptz
        updated_at timestamptz
    }
    
    plan_items {
        id uuid PK
        plan_id uuid FK
        day_number integer
        created_by varchar
        updated_by varchar
        deleted_at timestamptz
        deleted_by varchar
        created_at timestamptz
        updated_at timestamptz
    }
    
    plan_tasks {
        id uuid PK
        plan_item_id uuid FK
        title text
        content_type content_type
        content text
        display_order integer
        estimated_time integer
        is_required boolean
        created_by varchar
        updated_by varchar
        deleted_at timestamptz
        deleted_by varchar
        created_at timestamptz
        updated_at timestamptz
    }
    
    user_plan_progress {
        id uuid PK
        user_id uuid
        plan_id uuid FK
        started_at timestamptz
        streak_count integer
        longest_streak integer
        status user_plan_status
        is_completed boolean
        completed_at timestamptz
        created_at timestamptz
        updated_at timestamptz
    }
    
    user_task_completion {
        id uuid PK
        user_id uuid
        task_id uuid FK
        completed_at timestamptz
        created_at timestamptz
    }
    
    plan_reviews {
        id uuid PK
        plan_id uuid FK
        user_id uuid
        rating integer
        review_text text
        is_approved boolean
        approved_by varchar
        moderated_by varchar
        deleted_at timestamptz
        deleted_by varchar
        created_at timestamptz
        updated_at timestamptz
    }
    
    favorites {
        id uuid PK
        user_id uuid
        plan_id uuid FK
        created_by varchar
        deleted_at timestamptz
        deleted_by varchar
        created_at timestamptz
        updated_at timestamptz
    }

```

## Key Relationships

### **Core Content Hierarchy**
- **plans** → **plan_items** → **plan_tasks**
  - One plan has multiple daily items (plan_items)
  - Each daily item contains multiple tasks (plan_tasks)

### **Authorship**
- **authors** → **plans**
  - Each plan is created by one author
  - Authors can create multiple plans

### **User Engagement**
- **user_plan_progress**: Tracks overall user progress through plans
- **user_task_completion**: Granular tracking of individual task completions
- **plan_reviews**: User ratings and feedback on plans
- **favorites**: User's bookmarked/favorite plans

### **Data Integrity Features**
- **Soft Delete**: Most tables support soft deletion with `deleted_at` and `deleted_by` fields
- **Audit Trail**: All tables track `created_by`, `updated_by` for accountability
- **Unique Constraints**: 
  - One review per user per plan
  - One progress record per user per plan
  - One completion record per user per task
  - Unique day numbers within each plan

### **Performance Optimizations**
- **GIN Indexes**: For JSONB tags and full-text search
- **Partial Indexes**: For featured plans and approved reviews
- **Composite Indexes**: For common query patterns (user + status, plan + day, etc.)

## Schema Design Principles

1. **Hierarchical Content Structure**: Plans → Items → Tasks
2. **Flexible Categorization**: JSONB tags instead of rigid categories
3. **Comprehensive Audit Trail**: Track who created/modified/deleted what
4. **Soft Delete Support**: Maintain data integrity while allowing "deletion"
5. **Performance-First Indexing**: Optimized for common query patterns
6. **Multi-language Support**: Built-in language codes for internationalization
