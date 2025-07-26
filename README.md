# Buddhist Reading Plan Feature

A comprehensive reading plan system inspired by Bible.com, designed specifically for Buddhist teachings, sutras, and meditation practices.

## Overview

This feature enables users to follow structured reading and practice plans that guide them through Buddhist teachings over multiple days. Each plan contains daily content items with specific tasks like reading sutras, meditation practices, reflection exercises, and dharma study.

## Key Features

### Phase 1 (Core Features)
- **Multi-day Reading Plans**: Structured programs ranging from 7 days to 365 days
- **Buddhist-Specific Content**: Sutras, meditation guides, dharma teachings, and mindfulness practices
- **Difficulty Levels**: Plans designed for all levels - from complete beginners to Buddhist experts and scholars
- **Plan Discovery**: Browse by Buddhist tradition, practice type, teacher, and life situation
- **Progress Tracking**: Complete tracking of user progress through plans and individual tasks
- **Flexible Content Types**: Support for text, audio, video, images, and reference to the buddhist text
- **Multi-language Support**: Content available in multiple languages including Tibetan, English, Chinese

### Phase 2 (Enhanced Features)
- **Social & Sharing Features**: Share progress, insights, and favorite teachings with the community
- **Offline Downloads**: Download plans for offline practice and study
- **Daily Notifications**: Gentle reminders and inspirational quotes for consistent practice

## Architecture

### Database Schema
- **plans**: Main plan metadata and configuration
- **plan_items**: Daily content items within each plan
- **tasks**: Individual tasks within each day's content
- **user_plan_progress**: User's overall progress through plans
- **user_task_completion**: Granular task completion tracking

### Technology Stack
- **Backend**: Python/Fast
- **Database**: PostgreSQL with JSON support for flexible content
- **Frontend**: React/Vue.js for web and Flutter for mobile
- **Content Storage**: AWS S3 or similar for media files
- **Caching**: dragon fly for performance optimization

## Open Discussion Points

### Streak Tracking Strategy
**Current Decision**: Plan-specific streaks (each plan has its own streak counter)

**Alternative Approaches**:
- **Global Streaks**: One unified practice streak across all Buddhist activities
- **Hybrid Approach**: Both plan-specific and global streak tracking

**Considerations**:
- **Plan-Specific Pros**: Motivates plan completion, supports different practice types, allows parallel plan work
- **Global Pros**: Encourages holistic Buddhist practice, simpler user experience, builds overall habit
- **User Research Needed**: Test which approach better motivates consistent practice

**Decision Rationale**: Buddhist reading plans are structured programs with different commitment levels (7-day vs 365-day). Plan-specific streaks provide targeted motivation for completing specific practices while allowing flexibility to work on multiple plans.

### Multiple Active Plans Strategy
**Current Decision**: Users can have multiple active plans simultaneously (no hard limit in database schema)

**Alternative Approaches**:
- **Single Active Plan**: Force users to complete one plan before starting another
- **Limited Active Plans**: Set a maximum (e.g., 3-5 active plans per user)
- **Tiered Limits**: Different limits based on user level or subscription

**Considerations**:
- **Multiple Plans Pros**: Flexibility for different practice types (meditation + sutra study), accommodates varying schedules, user autonomy
- **Single Plan Pros**: Better focus and completion rates, simpler UX, prevents overwhelm
- **Limited Plans Pros**: Balance between flexibility and focus, prevents plan hoarding

**Questions for User Research**:
- How many plans do users realistically engage with simultaneously?
- Does having multiple active plans reduce completion rates?
- Should there be different types of plans that can run in parallel (e.g., daily meditation + weekly dharma study)?

**Technical Implications**: Current schema supports unlimited active plans via `user_plan_progress` table with `UNIQUE(user_id, plan_id)` constraint.

### Plan Categorization Strategy
**Current Decision**: Simple categorization with `tradition`, `difficulty_level`, and flexible `tags` JSON field

**Alternative Approaches**:
- **Hierarchical Categories**: Structured category system with `plan_categories` + `plan_category_mappings` tables
- **Minimal Categorization**: Only tradition and difficulty, everything else in tags
- **Hybrid Approach**: Core categories + flexible tags for edge cases

**Considerations**:
- **Simple Tags Pros**: Flexible, less redundant, easier to maintain, avoids overlapping categorization
- **Hierarchical Pros**: Structured organization, UI-friendly with icons/colors, better for complex filtering
- **Current Issues**: Too many overlapping fields (tradition, category, difficulty_level, practice_type, life_situation, tags)

**Questions for Decision**:
- How do users naturally think about organizing Buddhist content?
- Is structured hierarchy worth the added complexity?
- Can simple tags provide sufficient discoverability?

**Technical Implications**: Hierarchical approach requires additional tables and many-to-many relationships, while simple tags use JSONB with GIN indexes for flexible querying.

---

## Documentation Structure

```
docs/
├── architecture/           # System architecture documentation
├── api/                   # API documentation
├── database/              # Database schema and migrations
├── user-stories/          # User requirements and stories
├── design/                # UI/UX design specifications
└── deployment/            # Deployment and infrastructure docs
```

## Getting Started

1. Review the [Architecture Overview](docs/architecture/overview.md)
2. Understand the [Database Schema](docs/database/schema.md)
3. Check [User Stories](docs/user-stories/user-stories.md)
4. Review [API Documentation](docs/api/endpoints.md)

## Contributing

Please read our contributing guidelines and code of conduct before submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
