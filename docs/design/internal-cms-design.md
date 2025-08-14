# Internal CMS for Buddhist Reading Plans

## Overview

A simple Content Management System for **internal employees only** to create and manage Buddhist reading plans. No public content creators, no approval workflows, no complex permissions.

## User Roles

### **Content Creator (Employee)**
- Create and manage reading plans
- Assign plans to other employees
- Upload media content
- View plan performance
- Edit published plans directly

### **Admin (Manager)**
- All Content Creator permissions
- Manage employee accounts
- Reassign plans between employees
- Feature/unfeature plans
- Platform analytics

## Simplified Features

### 1. **Employee Dashboard**
```
┌─────────────────────────────────────┐
│ Buddhist Plans CMS                  │
│ Welcome, Sarah (Content Creator)    │
├─────────────────────────────────────┤
│ Quick Actions:                      │
│ [+ New Plan] [My Plans] [Analytics] │
├─────────────────────────────────────┤
│ My Plans:                           │
│ • Mindfulness Basics - 45 enrolled │
│ • Daily Meditation - 23 enrolled   │
│ • Buddhist Ethics (Draft)          │
├─────────────────────────────────────┤
│ Platform Stats:                     │
│ • Total Plans: 25                   │
│ • Total Users: 1,247               │
│ • This Week: 89 new enrollments    │
└─────────────────────────────────────┘
```

### 2. **Simple Plan Creation**

**Step 1: Basic Info** (uses existing `plans` table)
```
Plan Title: ________________
Description: _______________
Duration: [14] days
Difficulty: [Beginner ▼]
Tradition: [Theravada ▼]
Practice Type: [Meditation ▼]
Tags: meditation, mindfulness
Estimated Duration: [30] minutes/day
```

**Step 2: Daily Content** (creates `plan_items` and `tasks`)
```
Day 1: Introduction to Mindfulness
┌─────────────────────────────────────┐
│ Day Title: ______________________   │
│ Description: ___________________    │
│ Unlock Condition: [Sequential ▼]   │
├─────────────────────────────────────┤
│ Tasks:                              │
│ 1. [Text] Reading Assignment        │
│ 2. [Audio] Guided Meditation       │
│ 3. [Reflection] Journal Questions   │
│                                     │
│ [+ Add Task] [Upload Media]         │
└─────────────────────────────────────┘

[+ Add Day] [Save Draft] [Publish Now]
```

### 3. **Content Management**

**My Plans List:**
```
┌─────────────────────────────────────┐
│ Plan Title          Status   Users  │
├─────────────────────────────────────┤
│ Mindfulness Basics  Published  45   │
│ Daily Meditation    Published  23   │
│ Buddhist Ethics     Draft      0    │
│ Loving Kindness     Published  67   │
└─────────────────────────────────────┘
[Edit] [Assign] [Duplicate] [Archive] [Analytics]
```

### 4. **Media Library**
```
┌─────────────────────────────────────┐
│ Upload Files: [Choose Files] [Upload]│
├─────────────────────────────────────┤
│ Recent Uploads:                     │
│ 🎵 meditation-bell.mp3 (2.1 MB)     │
│ 🖼️ buddha-statue.jpg (856 KB)       │
│ 🎵 chanting-om.mp3 (4.2 MB)        │
│ 🖼️ lotus-flower.jpg (1.2 MB)       │
└─────────────────────────────────────┘
```

### 5. **Plan Assignment**

**Assign Plan to Another Employee:**
```
┌─────────────────────────────────────┐
│ Plan: Buddhist Ethics               │
│ Current Assignee: Sarah             │
├─────────────────────────────────────┤
│ Assign to:                          │
│ [Select Employee ▼] [Assign]        │
├─────────────────────────────────────┤
│ Assignment Note (optional):         │
│ "Please complete the meditation     │
│  sections for days 8-14"            │
└─────────────────────────────────────┘
```

**Assignment History:**
```
┌─────────────────────────────────────┐
│ Assignment History:                 │
│ • Created by Sarah (Jan 15)         │
│ • Assigned to John (Jan 20)         │
│ • Assigned to Lisa (Jan 25)         │
│ • Current: Lisa                     │
└─────────────────────────────────────┘
```

## Database Schema

**Note**: The CMS uses the same database schema as the main application. See `/docs/database/database-schema.md` for the complete schema.

### **CMS-Specific Tables Only**

### **employees** table
```sql
CREATE TABLE employees (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    name VARCHAR(255),
    email VARCHAR(255),
    role VARCHAR(20) DEFAULT 'content_creator', -- content_creator, admin
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### **plan_assignments** table
```sql
CREATE TABLE plan_assignments (
    id UUID PRIMARY KEY,
    plan_id UUID REFERENCES plans(id) ON DELETE CASCADE,
    from_employee_id UUID REFERENCES employees(id),
    to_employee_id UUID REFERENCES employees(id),
    assignment_note TEXT,
    assigned_at TIMESTAMP DEFAULT NOW()
);
```

### **cms_plan_metadata** table
```sql
CREATE TABLE cms_plan_metadata (
    id UUID PRIMARY KEY,
    plan_id UUID REFERENCES plans(id) ON DELETE CASCADE UNIQUE,
    assigned_employee_id UUID REFERENCES employees(id),
    cms_status VARCHAR(20) DEFAULT 'draft', -- draft, published, archived
    created_by_employee_id UUID REFERENCES employees(id),
    last_edited_by UUID REFERENCES employees(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### **Existing Tables Used by CMS**

The CMS directly uses these existing tables:
- **`plans`** - Main plan data (title, description, duration, etc.) - **UNCHANGED**
- **`plan_items`** - Daily content items within plans - **UNCHANGED**
- **`tasks`** - Individual tasks within each day - **UNCHANGED**
- **`authors`** - Author information (linked to employees)
- **`media_library`** - File storage and management
- **`user_plan_progress`** - For analytics
- **`plan_reviews`** - For feedback and ratings

**Key Design Principle**: The main `plans` table remains clean and user-focused. All CMS-specific data (assignments, status, workflow) is stored in separate `cms_plan_metadata` table, keeping the core schema uncluttered.

### **CMS Indexes for Performance**

```sql
-- Indexes for CMS queries
CREATE INDEX idx_cms_plan_metadata_employee ON cms_plan_metadata(assigned_employee_id);
CREATE INDEX idx_cms_plan_metadata_status ON cms_plan_metadata(cms_status);
CREATE INDEX idx_plan_assignments_plan ON plan_assignments(plan_id);
CREATE INDEX idx_plan_assignments_employee ON plan_assignments(to_employee_id);
```

## API Endpoints

**Note**: These endpoints work with the existing database schema and extend the main application's API.

### **Authentication**
```
POST /cms/login - Employee login
GET /cms/profile - Get employee profile
```

### **Plans**
```
GET /cms/plans - List all plans (with filters)
POST /cms/plans - Create new plan
GET /cms/plans/{id} - Get plan details
PUT /cms/plans/{id} - Update plan
DELETE /cms/plans/{id} - Delete plan
POST /cms/plans/{id}/publish - Publish plan
POST /cms/plans/{id}/unpublish - Unpublish plan
```

### **Media**
```
POST /cms/media/upload - Upload files
GET /cms/media - List uploaded files
DELETE /cms/media/{id} - Delete file
```

### **Plan Assignment**
```
POST /cms/plans/{id}/assign - Assign plan to another employee
GET /cms/plans/{id}/assignment-history - Get plan assignment history
```

### **Analytics**
```
GET /cms/analytics/plans/{id} - Plan performance
GET /cms/analytics/overview - Platform overview
```

### **Admin Only**
```
GET /cms/admin/employees - List employees
POST /cms/admin/employees - Add employee
PUT /cms/admin/employees/{id} - Update employee
POST /cms/plans/{id}/feature - Feature plan
DELETE /cms/plans/{id}/feature - Unfeature plan
```

## Key Benefits of Internal-Only

### **Simplified Workflow**
- ✅ **No approval process** - employees publish directly
- ✅ **No user registration** - admin adds employees
- ✅ **No content moderation** - trusted internal team
- ✅ **No complex permissions** - two simple roles only

### **Faster Development**
- ✅ **No public author profiles** or verification
- ✅ **No review queues** or moderation workflows
- ✅ **No complex analytics** - basic metrics only

### **Easier Management**
- ✅ **Direct control** over who creates content
- ✅ **Quality control** through hiring trusted employees
- ✅ **Consistent content** style across all plans
- ✅ **Direct feedback** within the team
- ✅ **No external content creator support** needed

### **Flexible Plan Assignment**
- **Specialized expertise** - assign plans to subject matter experts
- **Workload distribution** - balance work across team members
- **Knowledge transfer** - share context with assignment notes
- **Clear ownership** - one person responsible at a time
- **Complete history** - track plan evolution and contributors

## Implementation Plan

### **Week 1-2: Core Setup**
- Employee authentication
- Basic plan CRUD operations
- Simple plan editor
- File upload functionality

### **Week 3-4: Content Management**
- Plan listing and filtering
- Media library
- Basic analytics
- Publish/unpublish functionality

### **Week 5-6: Admin Features**
- Employee management
- Featured plans
- Platform analytics
- UI polish

### **Week 7-8: Testing & Launch**
- Internal testing with team
- Bug fixes and improvements
- Documentation and training
- Production deployment

## Employee Onboarding

### **New Employee Setup**
1. Admin creates employee account
2. Employee receives login credentials
3. Brief training on CMS usage (30 minutes)
4. Access to content guidelines document
5. Start creating plans immediately

### **Content Guidelines**
- Buddhist authenticity and accuracy
- Appropriate difficulty progression
- Consistent formatting and style
- Proper attribution for sources
- Accessibility considerations

## Success Metrics

- **Time to create plan**: Under 2 hours for 7-day plan
- **Employee adoption**: 100% of content team using CMS
- **Plan quality**: Consistent user ratings above 4.0
- **Publishing frequency**: Regular content updates
- **System reliability**: 99%+ uptime

This internal-only approach removes all the complexity of public content creators while providing a powerful, easy-to-use tool for your team to create high-quality Buddhist reading plans.
