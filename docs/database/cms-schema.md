# Internal CMS Database Schema

## Overview

This document outlines the database schema for the internal Content Management System. The CMS uses the existing Buddhist Reading Plans schema and adds minimal CMS-specific tables for internal employee workflow management.

**Key Principle**: The main `plans`, `plan_items`, and `tasks` tables remain completely unchanged. All CMS-specific data is stored in separate tables to keep the core schema clean for user-facing functionality.

## CMS-Specific Tables

### 1. **employees** table
```sql
CREATE TABLE employees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(20) DEFAULT 'content_creator', -- content_creator, admin
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_employees_user_id ON employees(user_id);
CREATE INDEX idx_employees_role ON employees(role);
CREATE INDEX idx_employees_active ON employees(is_active);
```

### 2. **cms_plan_metadata** table
```sql
CREATE TABLE cms_plan_metadata (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_id UUID NOT NULL REFERENCES plans(id) ON DELETE CASCADE UNIQUE,
    assigned_employee_id UUID REFERENCES employees(id),
    cms_status VARCHAR(20) DEFAULT 'draft', -- draft, published, archived
    created_by_employee_id UUID REFERENCES employees(id),
    last_edited_by UUID REFERENCES employees(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_cms_plan_metadata_plan_id ON cms_plan_metadata(plan_id);
CREATE INDEX idx_cms_plan_metadata_employee ON cms_plan_metadata(assigned_employee_id);
CREATE INDEX idx_cms_plan_metadata_status ON cms_plan_metadata(cms_status);
CREATE INDEX idx_cms_plan_metadata_created_by ON cms_plan_metadata(created_by_employee_id);
```

### 3. **plan_assignments** table
```sql
CREATE TABLE plan_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_id UUID NOT NULL REFERENCES plans(id) ON DELETE CASCADE,
    from_employee_id UUID REFERENCES employees(id),
    to_employee_id UUID NOT NULL REFERENCES employees(id),
    assignment_note TEXT,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_plan_assignments_plan_id ON plan_assignments(plan_id);
CREATE INDEX idx_plan_assignments_to_employee ON plan_assignments(to_employee_id);
CREATE INDEX idx_plan_assignments_from_employee ON plan_assignments(from_employee_id);
```

## Existing Tables Used by CMS

The CMS uses these existing tables from the main Buddhist Reading Plans schema **without any modifications**:

- **`plans`** - Main plan data (title, description, duration, tradition, etc.)
- **`plan_items`** - Daily content items within plans
- **`tasks`** - Individual tasks within each day
- **`authors`** - Author information (can be linked to employees)
- **`media_library`** - File storage and management (if exists)
- **`user_plan_progress`** - For analytics
- **`plan_reviews`** - For feedback and ratings

## Key Design Principles

1. **Clean Separation**: Core tables (`plans`, `plan_items`, `tasks`) remain unchanged
2. **Optional CMS Data**: Plans can exist without CMS metadata
3. **Performance**: User queries don't need to filter CMS fields
4. **Flexibility**: CMS features can be added/removed without schema changes

## Common CMS Queries

### Get plans assigned to an employee
```sql
SELECT p.*, cpm.cms_status, cpm.assigned_employee_id
FROM plans p
JOIN cms_plan_metadata cpm ON p.id = cpm.plan_id
WHERE cpm.assigned_employee_id = $1;
```

### Get plan assignment history
```sql
SELECT pa.*, e_from.name as from_employee, e_to.name as to_employee
FROM plan_assignments pa
LEFT JOIN employees e_from ON pa.from_employee_id = e_from.id
JOIN employees e_to ON pa.to_employee_id = e_to.id
WHERE pa.plan_id = $1
ORDER BY pa.assigned_at DESC;
```

### Get employee dashboard data
```sql
SELECT 
    COUNT(*) as total_plans,
    COUNT(CASE WHEN cmp.cms_status = 'published' THEN 1 END) as published_plans,
    COUNT(CASE WHEN cmp.cms_status = 'draft' THEN 1 END) as draft_plans
FROM cms_plan_metadata cmp
WHERE cmp.assigned_employee_id = $1;
```

## Migration Notes

For existing plans that don't have CMS metadata:

```sql
-- Create CMS metadata for existing plans
INSERT INTO cms_plan_metadata (plan_id, cms_status, created_at)
SELECT id, 'published', created_at
FROM plans
WHERE id NOT IN (SELECT plan_id FROM cms_plan_metadata);
```

This schema design ensures that the CMS can be added to an existing Buddhist Reading Plans system without disrupting user-facing functionality.
