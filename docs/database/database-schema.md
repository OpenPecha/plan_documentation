# Enhanced Database Schema for Buddhist Reading Plans

## Enhanced Schema Design

### 0. **ENUM Types** (Define first)
```sql

-- Difficulty level enum
CREATE TYPE difficulty_level AS ENUM (
    'beginner',
    'intermediate',
    'advanced'
);

-- Unlock condition enum
CREATE TYPE unlock_condition AS ENUM (
    'sequential',
    'date_based'
);

-- Content type enum
CREATE TYPE content_type AS ENUM (
    'text',
    'audio',
    'video',
    'image',
    'source_reference'
);

-- User plan status enum
CREATE TYPE user_plan_status AS ENUM (
    'not_started',
    'active',
    'paused',
    'completed',
    'abandoned'
);
```

### 1. **plans** table (Enhanced)
```sql
CREATE TABLE plans (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    author_id BIGINT REFERENCES authors(id), -- Reference to authors table
    language VARCHAR(10) DEFAULT 'en',
    
    difficulty_level difficulty_level,
    -- Flexible categorization
    tags JSONB, -- ['meditation', 'compassion', 'sutra_study', 'dealing_with_loss'] - covers category, practice_type, life_situation
    featured BOOLEAN DEFAULT FALSE, -- Admin-curated plans for homepage/discovery promotion
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Content metadata
    image_url VARCHAR(255),
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
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
    id BIGSERIAL PRIMARY KEY,
    plan_id BIGINT REFERENCES plans(id) ON DELETE CASCADE,
    day_number INTEGER NOT NULL,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    UNIQUE(plan_id, day_number)
);

CREATE INDEX idx_plan_items_plan_day ON plan_items(plan_id, day_number);
```

### 3. **tasks** table (Enhanced)
```sql
CREATE TABLE tasks (
    id BIGSERIAL PRIMARY KEY,
    plan_item_id BIGINT REFERENCES plan_items(id) ON DELETE CASCADE,
    title TEXT,
    content_type content_type NOT NULL,
    content TEXT, -- Main content
    display_order INTEGER NOT NULL,
    estimated_time INTEGER, -- minutes
    is_required BOOLEAN DEFAULT TRUE,
    
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_tasks_plan_item_order ON tasks(plan_item_id, display_order);
CREATE INDEX idx_tasks_content_type ON tasks(content_type);
```

### 4. **user_plan_progress** table (Enhanced)
```sql
CREATE TABLE user_plan_progress (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    plan_id BIGINT REFERENCES plans(id) ON DELETE CASCADE,
    
    -- Progress tracking
    started_at TIMESTAMP NOT NULL,
    
    -- Engagement metrics
    streak_count INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    
    -- Status
    status user_plan_status DEFAULT 'active',
    is_completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    UNIQUE(user_id, plan_id)
);

CREATE INDEX idx_user_progress_user_status ON user_plan_progress(user_id, status);
CREATE INDEX idx_user_progress_plan ON user_plan_progress(plan_id);
```

### 5. **user_task_completion** table (Simplified)
```sql
CREATE TABLE user_task_completion (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    task_id BIGINT REFERENCES tasks(id) ON DELETE CASCADE,
    
    -- Completion tracking
    completed_at TIMESTAMP NOT NULL,
    
    created_at TIMESTAMP DEFAULT NOW(),
    
    UNIQUE(user_id, task_id)
);

CREATE INDEX idx_user_completion_user_task ON user_task_completion(user_id, task_id);
CREATE INDEX idx_user_completion_completed_at ON user_task_completion(completed_at);
```

### 6. **plan_reviews** table (User ratings and feedback)
```sql
CREATE TABLE plan_reviews (
    id BIGSERIAL PRIMARY KEY,
    plan_id BIGINT REFERENCES plans(id) ON DELETE CASCADE,
    user_id BIGINT NOT NULL,
    
    -- Review details
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    review_text TEXT,
    
    -- Moderation
    is_approved BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    UNIQUE(user_id, plan_id) -- One review per user per plan
);

CREATE INDEX idx_plan_reviews_plan_approved ON plan_reviews(plan_id, is_approved) WHERE is_approved = TRUE;
CREATE INDEX idx_plan_reviews_rating ON plan_reviews(plan_id, rating);
```

## **New Tables for Enhanced Features**

### 7. **authors** table (Buddhist teachers and content creators)
```sql
CREATE TABLE authors (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    bio TEXT
    image_url VARCHAR(255),
    -- Contact and social information
    email VARCHAR(255),
    -- Verification and status
    is_verified BOOLEAN DEFAULT FALSE, -- Verified by admin
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_authors_verified ON authors(is_verified) WHERE is_verified = TRUE;
```
### 8. Favorite
```sql
CREATE TABLE favorites (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    plan_id BIGINT REFERENCES plans(id) ON DELETE CASCADE,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_favorites_user_plan ON favorites(user_id, plan_id);
```
    

## **Schema Features Summary**

### **Core Tables:**
- ✅ **plans** - Main plan metadata with simplified categorization
- ✅ **plan_items** - Daily content items within each plan
- ✅ **tasks** - Individual tasks within each day's content
- ✅ **user_plan_progress** - User's overall progress through plans
- ✅ **user_task_completion** - Granular task completion tracking
- ✅ **plan_reviews** - User ratings and feedback system
- ✅ **authors** - Buddhist teachers and content creators
- ✅ **favorites** - User's favorite plans

### **Simplified Categorization System:**
- ✅ **difficulty_level** enum for user matching (beginner, intermediate, advanced)
- ✅ **tags** JSONB field for flexible categorization (covers practice types, life situations, content types)
- ✅ **featured** flag for admin-curated plan promotion

### **Enhanced User Experience:**
- ✅ **estimated_daily_minutes** for time planning
- ✅ **preview_content** for plan discovery
- ✅ **streak_count** and **longest_streak** for engagement
- ✅ **multiple content types** (text, audio, video, image, source_reference)

### **Performance & Search:**
- ✅ **Full-text search** indexes on plan titles and descriptions
- ✅ **GIN indexes** for JSONB tags querying
- ✅ **Optimized indexes** for plan discovery and user progress tracking
- ✅ **Multi-language support** with language field in plans table

