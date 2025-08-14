# Internal CMS Wireframe Design

## Overview

These wireframes show the user interface design for the internal Buddhist Reading Plans CMS. The design focuses on simplicity and efficiency for internal employees creating content.

## 1. Login Page

```
┌─────────────────────────────────────────────────────────────┐
│                    Buddhist Plans CMS                      │
│                                                             │
│                    [🕉️ Logo]                                │
│                                                             │
│               Internal Content Management                   │
│                                                             │
│    ┌─────────────────────────────────────────────────┐     │
│    │ Email: ________________________________         │     │
│    └─────────────────────────────────────────────────┘     │
│                                                             │
│    ┌─────────────────────────────────────────────────┐     │
│    │ Password: ____________________________         │     │
│    └─────────────────────────────────────────────────┘     │
│                                                             │
│                    [   Login   ]                           │
│                                                             │
│               Forgot password? Contact admin                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 2. Employee Dashboard

```
┌─────────────────────────────────────────────────────────────┐
│ Buddhist Plans CMS                          Sarah ▼ Logout │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Welcome back, Sarah (Content Creator)                      │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Quick Actions                                           │ │
│ │ [+ New Plan] [My Plans] [Analytics] [Media Library]    │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌──────────────────────┐ ┌──────────────────────────────┐   │
│ │ My Plans             │ │ Quick Stats                  │   │
│ │ ┌──────────────────┐ │ │ • Total Plans: 5             │   │
│ │ │ Mindfulness      │ │ │ • Published: 3               │   │
│ │ │ Basics           │ │ │ • Draft: 2                   │   │
│ │ │ Published • 45   │ │ │ • Total Enrollments: 127     │   │
│ │ │ [Edit] [Analytics]│ │ │ • Average Rating: 4.2        │   │
│ │ └──────────────────┘ │ └──────────────────────────────┘   │
│ │ ┌──────────────────┐ │                                    │
│ │ │ Daily Meditation │ │ ┌──────────────────────────────┐   │
│ │ │ Published • 23   │ │ │ Recent Activity              │   │
│ │ │ [Edit] [Analytics]│ │ │ • 15 new enrollments today   │   │
│ │ └──────────────────┘ │ │ • 3 new reviews this week    │   │
│ │ ┌──────────────────┐ │ │ • Buddhist Ethics completed  │   │
│ │ │ Buddhist Ethics  │ │ │   by John yesterday          │   │
│ │ │ Draft            │ │ └──────────────────────────────┘   │
│ │ │ [Edit] [Assign]  │ │                                    │
│ │ └──────────────────┘ │                                    │
│ └──────────────────────┘                                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 3. My Plans List View

```
┌─────────────────────────────────────────────────────────────┐
│ Buddhist Plans CMS                          Sarah ▼ Logout │
├─────────────────────────────────────────────────────────────┤
│ My Plans                                    [+ New Plan]    │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ 🔍 Search: _________________ [All Status ▼] [Filter]   │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Plan Title              Status      Users    Actions    │ │
│ ├─────────────────────────────────────────────────────────┤ │
│ │ Mindfulness Basics      Published   45       [Edit]    │ │
│ │                                              [Assign]   │ │
│ │                                              [Analytics]│ │
│ │                                              [Archive]  │ │
│ ├─────────────────────────────────────────────────────────┤ │
│ │ Daily Meditation        Published   23       [Edit]    │ │
│ │                                              [Assign]   │ │
│ │                                              [Analytics]│ │
│ │                                              [Archive]  │ │
│ ├─────────────────────────────────────────────────────────┤ │
│ │ Buddhist Ethics         Draft       0        [Edit]    │ │
│ │                                              [Assign]   │ │
│ │                                              [Delete]   │ │
│ ├─────────────────────────────────────────────────────────┤ │
│ │ Loving Kindness         Published   67       [Edit]    │ │
│ │                                              [Assign]   │ │
│ │                                              [Analytics]│ │
│ │                                              [Archive]  │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ Showing 4 of 5 plans                          [1] 2 Next  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 4. Plan Creation - Step 1 (Basic Info)

```
┌─────────────────────────────────────────────────────────────┐
│ Buddhist Plans CMS                          Sarah ▼ Logout │
├─────────────────────────────────────────────────────────────┤
│ Create New Plan                                             │
│                                                             │
│ Step 1 of 2: Basic Information                             │
│ ●━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━○                   │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Plan Title *                                            │ │
│ │ ┌─────────────────────────────────────────────────────┐ │ │
│ │ │ Introduction to Mindfulness                         │ │ │
│ │ └─────────────────────────────────────────────────────┘ │ │
│ │                                                         │ │
│ │ Description *                                           │ │
│ │ ┌─────────────────────────────────────────────────────┐ │ │
│ │ │ A 14-day journey into mindfulness practice for     │ │ │
│ │ │ beginners. Learn basic meditation techniques...     │ │ │
│ │ │                                                     │ │ │
│ │ └─────────────────────────────────────────────────────┘ │ │
│ │                                                         │ │
│ │ Duration (days) *        Difficulty Level *            │ │
│ │ ┌─────────────┐          ┌─────────────────────────┐    │ │
│ │ │ 14          │          │ Beginner            ▼  │    │ │
│ │ └─────────────┘          └─────────────────────────┘    │ │
│ │                                                         │ │
│ │ Buddhist Tradition *     Practice Type *               │ │
│ │ ┌─────────────────────┐  ┌─────────────────────────┐    │ │
│ │ │ General         ▼   │  │ Meditation          ▼   │    │ │
│ │ └─────────────────────┘  └─────────────────────────┘    │ │
│ │                                                         │ │
│ │ Tags (comma separated)                                  │ │
│ │ ┌─────────────────────────────────────────────────────┐ │ │
│ │ │ mindfulness, meditation, beginner, daily practice   │ │ │
│ │ └─────────────────────────────────────────────────────┘ │ │
│ │                                                         │ │
│ │ Estimated Duration per Day (minutes)                   │ │
│ │ ┌─────────────┐                                        │ │
│ │ │ 30          │                                        │ │
│ │ └─────────────┘                                        │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│                              [Cancel] [Next: Add Content]  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 5. Plan Creation - Step 2 (Daily Content)

```
┌─────────────────────────────────────────────────────────────┐
│ Buddhist Plans CMS                          Sarah ▼ Logout │
├─────────────────────────────────────────────────────────────┤
│ Create New Plan: Introduction to Mindfulness               │
│                                                             │
│ Step 2 of 2: Daily Content                                 │
│ ○━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━●                   │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Day 1: What is Mindfulness?                             │ │
│ │ ┌─────────────────────────────────────────────────────┐ │ │
│ │ │ Day Title: What is Mindfulness?                     │ │ │
│ │ │ Description: Introduction to mindfulness concepts   │ │ │
│ │ │ Unlock: [Sequential ▼]                              │ │ │
│ │ │                                                     │ │ │
│ │ │ Tasks:                                              │ │ │
│ │ │ 1. [📖 Text] Reading: Basics of Mindfulness        │ │ │
│ │ │    [Edit] [Delete] [↑] [↓]                          │ │ │
│ │ │ 2. [🎵 Audio] Guided Meditation (10 min)           │ │ │
│ │ │    [Edit] [Delete] [↑] [↓]                          │ │ │
│ │ │ 3. [💭 Reflection] Journal Questions                │ │ │
│ │ │    [Edit] [Delete] [↑] [↓]                          │ │ │
│ │ │                                                     │ │ │
│ │ │ [+ Add Task] [📁 Upload Media]                      │ │ │
│ │ └─────────────────────────────────────────────────────┘ │ │
│ │ [▼ Collapse] [🗑️ Delete Day]                           │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Day 2: Breathing Meditation                             │ │
│ │ [▶ Expand]                                              │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ [+ Add Day]                                                 │
│                                                             │
│                    [Back] [Save Draft] [Publish Now]       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 6. Task Editor Modal

```
┌─────────────────────────────────────────────────────────────┐
│ Edit Task                                           [✕]     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Task Type: [📖 Text Reading ▼]                             │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Task Title *                                            │ │
│ │ ┌─────────────────────────────────────────────────────┐ │ │
│ │ │ Basics of Mindfulness                               │ │ │
│ │ └─────────────────────────────────────────────────────┘ │ │
│ │                                                         │ │
│ │ Instructions                                            │ │
│ │ ┌─────────────────────────────────────────────────────┐ │ │
│ │ │ Read the following text carefully and take notes    │ │ │
│ │ │ on key concepts that resonate with you.             │ │ │
│ │ └─────────────────────────────────────────────────────┘ │ │
│ │                                                         │ │
│ │ Content *                                               │ │
│ │ ┌─────────────────────────────────────────────────────┐ │ │
│ │ │ [B] [I] [U] [🔗] [📋] [📷]                          │ │ │
│ │ │                                                     │ │ │
│ │ │ Mindfulness is the practice of being fully         │ │ │
│ │ │ present and engaged with whatever we're doing       │ │ │
│ │ │ at the moment — free from distraction or           │ │ │
│ │ │ judgment, and aware of where we are and what       │ │ │
│ │ │ we're doing...                                      │ │ │
│ │ │                                                     │ │ │
│ │ └─────────────────────────────────────────────────────┘ │ │
│ │                                                         │ │
│ │ Estimated Time (minutes): [10]                         │ │
│ │                                                         │ │
│ │ ☑ Required Task    ☐ Optional Task                     │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│                                    [Cancel] [Save Task]    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 7. Media Library

```
┌─────────────────────────────────────────────────────────────┐
│ Buddhist Plans CMS                          Sarah ▼ Logout │
├─────────────────────────────────────────────────────────────┤
│ Media Library                                               │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ [📁 Upload Files] [🗂️ New Folder]                       │ │
│ │ 🔍 Search: _________ [All Types ▼] [All Plans ▼]       │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ 📁 Mindfulness Basics/                                  │ │
│ │   📁 audio/                                             │ │
│ │   📁 images/                                            │ │
│ │ 📁 Daily Meditation/                                    │ │
│ │ 📁 Shared Resources/                                    │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Recent Uploads                                          │ │
│ │ ┌─────────────────────────────────────────────────────┐ │ │
│ │ │ 🎵 meditation-bell.mp3        2.1 MB    Jan 15     │ │ │
│ │ │    [👁️ Preview] [📝 Edit] [🗑️ Delete]               │ │ │
│ │ └─────────────────────────────────────────────────────┘ │ │
│ │ ┌─────────────────────────────────────────────────────┐ │ │
│ │ │ 🖼️ buddha-statue.jpg          856 KB    Jan 14     │ │ │
│ │ │    [👁️ Preview] [📝 Edit] [🗑️ Delete]               │ │ │
│ │ └─────────────────────────────────────────────────────┘ │ │
│ │ ┌─────────────────────────────────────────────────────┐ │ │
│ │ │ 🎵 chanting-om.mp3            4.2 MB    Jan 13     │ │ │
│ │ │    [👁️ Preview] [📝 Edit] [🗑️ Delete]               │ │ │
│ │ └─────────────────────────────────────────────────────┘ │ │
│ │ ┌─────────────────────────────────────────────────────┐ │ │
│ │ │ 🖼️ lotus-flower.jpg           1.2 MB    Jan 12     │ │ │
│ │ │    [👁️ Preview] [📝 Edit] [🗑️ Delete]               │ │ │
│ │ └─────────────────────────────────────────────────────┘ │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ Showing 4 of 23 files                         [1] 2 3 Next │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 8. Plan Assignment Modal

```
┌─────────────────────────────────────────────────────────────┐
│ Assign Plan                                         [✕]     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Plan: Buddhist Ethics                                       │
│ Current Assignee: Sarah                                     │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Assign to Employee *                                    │ │
│ │ ┌─────────────────────────────────────────────────────┐ │ │
│ │ │ John (Meditation Expert)                        ▼   │ │ │
│ │ └─────────────────────────────────────────────────────┘ │ │
│ │                                                         │ │
│ │ Assignment Note (optional)                              │ │
│ │ ┌─────────────────────────────────────────────────────┐ │ │
│ │ │ Please complete the meditation practices for        │ │ │
│ │ │ days 8-14. Focus on loving-kindness techniques.    │ │ │
│ │ │                                                     │ │ │
│ │ └─────────────────────────────────────────────────────┘ │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Assignment History                                      │ │
│ │ • Created by Sarah (Jan 15)                            │ │
│ │ • Assigned to John (Jan 20)                            │ │
│ │ • Assigned to Lisa (Jan 25)                            │ │
│ │ • Current: Sarah                                        │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│                                      [Cancel] [Assign Plan]│
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 9. Plan Analytics Dashboard

```
┌─────────────────────────────────────────────────────────────┐
│ Buddhist Plans CMS                          Sarah ▼ Logout │
├─────────────────────────────────────────────────────────────┤
│ Analytics: Mindfulness Basics                              │
│                                                             │
│ ┌──────────────────────┐ ┌──────────────────────────────┐   │
│ │ Overview             │ │ Engagement                   │   │
│ │ • Total Enrollments: │ │ ┌──────────────────────────┐ │   │
│ │   342                │ │ │     Completion Rate      │ │   │
│ │ • Completions: 267   │ │ │                          │ │   │
│ │ • Completion Rate:   │ │ │        ████████░░        │ │   │
│ │   78%                │ │ │          78%             │ │   │
│ │ • Average Rating:    │ │ └──────────────────────────┘ │   │
│ │   4.5/5 (89 reviews) │ │                              │   │
│ └──────────────────────┘ └──────────────────────────────┘   │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Daily Completion Rates                                  │ │
│ │ ┌─────────────────────────────────────────────────────┐ │ │
│ │ │ Day 1  ████████████████████████████████████████ 95% │ │ │
│ │ │ Day 2  ██████████████████████████████████████   89% │ │ │
│ │ │ Day 3  ████████████████████████████████████     84% │ │ │
│ │ │ Day 4  ██████████████████████████████████       80% │ │ │
│ │ │ Day 5  ████████████████████████████████         76% │ │ │
│ │ │ Day 6  ██████████████████████████████           72% │ │ │
│ │ │ Day 7  ████████████████████████████             68% │ │ │
│ │ │ ...                                              │ │ │
│ │ └─────────────────────────────────────────────────────┘ │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌──────────────────────┐ ┌──────────────────────────────┐   │
│ │ Recent Reviews       │ │ Drop-off Points              │   │
│ │ ⭐⭐⭐⭐⭐ "Excellent    │ │ • Day 7: 15% drop-off        │   │
│ │ guide for beginners" │ │ • Day 14: 8% drop-off        │   │
│ │ - User123            │ │ • Day 21: 5% drop-off        │   │
│ │                      │ │                              │   │
│ │ ⭐⭐⭐⭐⭐ "Very helpful │ │ Most Engaging:               │   │
│ │ daily practices"     │ │ • Day 5: Loving-Kindness     │   │
│ │ - MindfulMom         │ │ • Day 10: Walking Meditation │   │
│ │                      │ │ • Day 15: Body Scan          │   │
│ │ [View All Reviews]   │ └──────────────────────────────┘   │
│ └──────────────────────┘                                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 10. Admin Dashboard (Manager View)

```
┌─────────────────────────────────────────────────────────────┐
│ Buddhist Plans CMS                          Admin ▼ Logout │
├─────────────────────────────────────────────────────────────┤
│ Admin Dashboard                                             │
│                                                             │
│ ┌──────────────────────┐ ┌──────────────────────────────┐   │
│ │ Platform Overview    │ │ Content Status               │   │
│ │ • Total Plans: 25    │ │ • Published Plans: 18        │   │
│ │ • Total Employees: 8 │ │ • Draft Plans: 7             │   │
│ │ • Total Users: 1,247 │ │ • Plans in Progress: 5       │   │
│ │ • This Week:         │ │ • Featured Plans: 3          │   │
│ │   89 enrollments     │ └──────────────────────────────┘   │
│ └──────────────────────┘                                    │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Employee Activity                                       │ │
│ │ ┌─────────────────────────────────────────────────────┐ │ │
│ │ │ Employee        Active Plans    Last Activity       │ │ │
│ │ ├─────────────────────────────────────────────────────┤ │ │
│ │ │ Sarah           3 plans         2 hours ago         │ │ │
│ │ │ John            2 plans         1 day ago           │ │ │
│ │ │ Lisa            1 plan          3 days ago          │ │ │
│ │ │ Mike            0 plans         1 week ago          │ │ │
│ │ └─────────────────────────────────────────────────────┘ │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌──────────────────────┐ ┌──────────────────────────────┐   │
│ │ Quick Actions        │ │ Recent Plan Activity         │   │
│ │ [+ Add Employee]     │ │ • "Buddhist Ethics" assigned │   │
│ │ [📊 Full Analytics]  │ │   to John (2 hours ago)     │   │
│ │ [⚙️ System Settings] │ │ • "Daily Meditation"         │   │
│ │ [🎯 Feature Plans]   │ │   published (1 day ago)     │   │
│ │ [👥 Manage Users]    │ │ • "Loving Kindness" created  │   │
│ └──────────────────────┘ │   by Lisa (2 days ago)      │   │
│                          └──────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Design Principles

### **Visual Hierarchy**
- Clear navigation with user role indication
- Prominent action buttons for common tasks
- Card-based layout for easy scanning
- Consistent spacing and typography

### **User Experience**
- **Progressive Disclosure**: Complex forms broken into steps
- **Contextual Actions**: Relevant buttons based on content state
- **Clear Feedback**: Status indicators and confirmation messages
- **Efficient Workflow**: Minimal clicks for common tasks

### **Responsive Considerations**
- Tables collapse to cards on mobile
- Side-by-side layouts stack vertically
- Touch-friendly button sizes
- Simplified navigation on smaller screens

### **Accessibility**
- High contrast colors
- Clear focus indicators
- Keyboard navigation support
- Screen reader friendly labels
- Alt text for all images

These wireframes provide a solid foundation for implementing the internal CMS with a focus on usability and efficiency for Buddhist content creators.
