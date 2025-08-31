# Enhanced Database Schema for Buddhist Reading Plans

## Enhanced Schema Design

### 0. **ENUM Types** (Define first)
```sql

-- Difficulty level enum
CREATE TYPE difficulty_level AS ENUM (
    'BEGINNER',
    'INTERMEDIATE',
    'ADVANCED'
);

-- Content type enum
CREATE TYPE content_type AS ENUM (
    'TEXT',
    'AUDIO',
    'VIDEO',
    'IMAGE',
    'SOURCE_REFERENCE'
);

-- User plan status enum
CREATE TYPE user_plan_status AS ENUM (
    'NOT_STARTED',
    'ACTIVE',
    'PAUSED',
    'COMPLETED',
    'ABANDONED'
);

-- Plan status enum
CREATE TYPE plan_status AS ENUM (
    'DRAFT',
    'PUBLISHED',
    'ARCHIVED',
    'UNDER_REVIEW'
);

-- Language codes enum (ISO 639-1)
CREATE TYPE language_code AS ENUM (
    'en', 'bo', 'zh'
);
```

### 1. **plans** table (Enhanced)
```sql
CREATE TABLE plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Basic information with validation
    title VARCHAR(255) NOT NULL ,
    description TEXT ,
    -- Authorship - make required and consistent
    author_id UUID NOT NULL REFERENCES authors(id) ON DELETE RESTRICT,
    
    -- Localization with standardized codes
    language language_code DEFAULT 'en' NOT NULL,
    
    -- Classification with validation
    difficulty_level difficulty_level NOT NULL,
    duration_days INTEGER NOT NULL,
    estimated_daily_minutes INTEGER,
    
    -- Flexible categorization with validation
    tags JSONB DEFAULT '[]'::jsonb NOT NULL CHECK (jsonb_typeof(tags) = 'array'),
    
    -- Status and visibility
    status plan_status DEFAULT 'DRAFT' NOT NULL,
    featured BOOLEAN DEFAULT FALSE NOT NULL,
    
    -- Content metadata
    image_url VARCHAR(255),
    
    -- Audit trail
    created_by VARCHAR(255) NOT NULL, -- Email of creator
    updated_by VARCHAR(255), -- Email of last updater
    
    -- Soft delete
    deleted_at TIMESTAMPTZ NULL,
    deleted_by VARCHAR(255), -- Email of deleter
    
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for plan discovery
CREATE INDEX idx_plans_discovery ON plans(tags, difficulty_level, is_active);
CREATE INDEX idx_plans_featured ON plans(featured) WHERE featured = TRUE;
CREATE INDEX idx_plans_search ON plans USING gin(to_tsvector('english', title || ' ' || description));
CREATE INDEX idx_plans_tags ON plans USING gin(tags);
```

### 2. **plan_items** table (Enhanced)
```sql
CREATE TABLE plan_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_id UUID REFERENCES plans(id) ON DELETE CASCADE,
    day_number INTEGER NOT NULL,
    
    -- Audit trail
    created_by VARCHAR(255) NOT NULL, -- Email of creator
    updated_by VARCHAR(255), -- Email of last updater
    
    -- Soft delete
    deleted_at TIMESTAMPTZ NULL,
    deleted_by VARCHAR(255), -- Email of deleter
    
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(plan_id, day_number)
);

CREATE INDEX idx_plan_items_plan_day ON plan_items(plan_id, day_number);
```

### 3. **plan_tasks** table (Enhanced)
```sql
CREATE TABLE plan_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_item_id UUID REFERENCES plan_items(id) ON DELETE CASCADE,
    title TEXT,
    content_type content_type NOT NULL,
    content TEXT, -- Main content
    display_order INTEGER NOT NULL,
    estimated_time INTEGER, -- minutes
    is_required BOOLEAN DEFAULT TRUE,
    
    -- Audit trail
    created_by VARCHAR(255) NOT NULL, -- Email of creator
    updated_by VARCHAR(255), -- Email of last updater
    
    -- Soft delete
    deleted_at TIMESTAMPTZ NULL,
    deleted_by VARCHAR(255), -- Email of deleter
    
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_plan_tasks_plan_item_order ON plan_tasks(plan_item_id, display_order);
CREATE INDEX idx_plan_tasks_content_type ON plan_tasks(content_type);
```

### 4. **user_plan_progress** table (Enhanced)
```sql
CREATE TABLE user_plan_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    plan_id UUID REFERENCES plans(id) ON DELETE CASCADE,
    
    -- Progress tracking
    started_at TIMESTAMPTZ NOT NULL,
    
    -- Engagement metrics
    streak_count INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    
    -- Status
    status user_plan_status DEFAULT 'ACTIVE',
    is_completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(user_id, plan_id)
);

CREATE INDEX idx_user_progress_user_status ON user_plan_progress(user_id, status);
CREATE INDEX idx_user_progress_plan ON user_plan_progress(plan_id);
```

### 5. **user_task_completion** table (Simplified)
```sql
CREATE TABLE user_task_completion (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    task_id UUID REFERENCES plan_tasks(id) ON DELETE CASCADE,
    
    -- Completion tracking
    completed_at TIMESTAMPTZ NOT NULL,
    
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    
    UNIQUE(user_id, task_id)
);

CREATE INDEX idx_user_completion_user_task ON user_task_completion(user_id, task_id);
CREATE INDEX idx_user_completion_completed_at ON user_task_completion(completed_at);
```

### 6. **plan_reviews** table (User ratings and feedback)
```sql
CREATE TABLE plan_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_id UUID REFERENCES plans(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    
    -- Review details
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    review_text TEXT,
    
    -- Moderation
    is_approved BOOLEAN DEFAULT FALSE,
    approved_by VARCHAR(255), -- Email of approver
    moderated_by VARCHAR(255), -- Email of moderator
    
    -- Soft delete
    deleted_at TIMESTAMPTZ NULL,
    deleted_by VARCHAR(255), -- Email of deleter
    
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(user_id, plan_id) -- One review per user per plan
);

CREATE INDEX idx_plan_reviews_plan_approved ON plan_reviews(plan_id, is_approved) WHERE is_approved = TRUE;
CREATE INDEX idx_plan_reviews_rating ON plan_reviews(plan_id, rating);
```

## **New Tables for Enhanced Features**

### 7. **authors** table (Buddhist teachers and content creators)
```sql
CREATE TABLE authors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    bio TEXT,
    image_url VARCHAR(255),
    -- Contact and social information
    email VARCHAR(255),
    password VARCHAR(255) NOT NULL, -- bcrypt hash
    -- Verification and status
    is_verified BOOLEAN DEFAULT FALSE, -- Verified by user with email
    is_active BOOLEAN DEFAULT TRUE, -- Mananaged by admin
    
    -- Audit trail
    created_by VARCHAR(255) NOT NULL, -- Email of admin who created
    updated_by VARCHAR(255), -- Email of admin who last updated
    
    -- Soft delete
    deleted_at TIMESTAMPTZ NULL,
    deleted_by VARCHAR(255), -- Email of admin who deleted
    
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_authors_verified ON authors(is_verified) WHERE is_verified = TRUE;
```
### 8. Favorites
```sql
CREATE TABLE favorites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    plan_id UUID REFERENCES plans(id) ON DELETE CASCADE,
    
    -- Audit trail
    created_by VARCHAR(255) NOT NULL, -- Email of user who favorited
    
    -- Soft delete
    deleted_at TIMESTAMPTZ NULL,
    deleted_by VARCHAR(255), -- Email of user who unfavorited
    
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_favorites_user_plan ON favorites(user_id, plan_id);
```
    

## **Schema Features Summary**

### **Core Tables:**
- ✅ **plans** - Main plan metadata with simplified categorization
- ✅ **plan_items** - Daily content items within each plan
- ✅ **plan_tasks** - Individual tasks within each day's content
- ✅ **user_plan_progress** - User's overall progress through plans
- ✅ **user_task_completion** - Granular task completion tracking
- ✅ **plan_reviews** - User ratings and feedback system
- ✅ **authors** - Buddhist teachers and content creators
- ✅ **favorites** - User's favorite plans

### **Simplified Categorization System:**
- ✅ **difficulty_level** enum for user matching (BEGINNER, INTERMEDIATE, ADVANCED)
- ✅ **tags** JSONB field for flexible categorization (covers practice types, life situations, content types)
- ✅ **featured** flag for admin-curated plan promotion

### **Enhanced User Experience:**
- ✅ **estimated_daily_minutes** for time planning
- ✅ **preview_content** for plan discovery
- ✅ **streak_count** and **longest_streak** for engagement
- ✅ **multiple content types** (TEXT, AUDIO, VIDEO, IMAGE, SOURCE_REFERENCE)

### **Performance & Search:**
- ✅ **Full-text search** indexes on plan titles and descriptions
- ✅ **GIN indexes** for JSONB tags querying
- ✅ **Optimized indexes** for plan discovery and user progress tracking
- ✅ **Multi-language support** with language field in plans table

