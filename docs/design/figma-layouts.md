# Figma Layout Specifications - Buddhist Reading Plans CMS

## Frame Sizes & Breakpoints

### **Desktop Frames**
- **Desktop**: 1440px × 1024px (Primary design)
- **Large Desktop**: 1920px × 1080px (Large screens)
- **Tablet**: 768px × 1024px (iPad)
- **Mobile**: 375px × 812px (iPhone X/11/12)

## Detailed Page Layouts

### **1. Login Page**
```
Frame: 1440 × 1024px
Background: Linear gradient (#F9FAFB to #E5E7EB)

Layout:
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                    [Buddhist Symbol Logo]                   │
│                   Buddhist Plans CMS                        │
│                                                             │
│              ┌─────────────────────────────┐                │
│              │                             │                │
│              │  Employee Login             │                │
│              │                             │                │
│              │  Email Address              │                │
│              │  ┌─────────────────────────┐ │                │
│              │  │                         │ │                │
│              │  └─────────────────────────┘ │                │
│              │                             │                │
│              │  Password                   │                │
│              │  ┌─────────────────────────┐ │                │
│              │  │                         │ │                │
│              │  └─────────────────────────┘ │                │
│              │                             │                │
│              │     [Sign In Button]        │                │
│              │                             │                │
│              │  Forgot password?           │                │
│              │                             │                │
│              └─────────────────────────────┘                │
│                                                             │
└─────────────────────────────────────────────────────────────┘

Components:
- Card: 400px × 480px, centered
- Logo: 64px height
- Input fields: 352px × 48px
- Button: 352px × 48px
- Links: 14px, Primary Blue
```

### **2. Dashboard Layout**
```
Frame: 1440 × 1024px

Header (64px height):
┌─────────────────────────────────────────────────────────────┐
│ 🕉️ Buddhist Plans CMS    [Search]     Sarah Chen ▼ Logout │
└─────────────────────────────────────────────────────────────┘

Main Content (960px height):
┌─────────────────────────────────────────────────────────────┐
│ Dashboard                                                   │
│                                                             │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐             │
│ │   📚    │ │   👥    │ │   ⭐    │ │   📊    │             │
│ │My Plans │ │Assigned │ │Featured │ │Analytics│             │
│ │   12    │ │    3    │ │    2    │ │  View   │             │
│ └─────────┘ └─────────┘ └─────────┘ └─────────┘             │
│                                                             │
│ Quick Actions                                               │
│ [+ Create New Plan]  [📁 Media Library]  [📋 View All]     │
│                                                             │
│ Recent Activity                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ 📝 "Mindfulness Basics" updated by Sarah Chen           │ │
│ │ 2 hours ago                                             │ │
│ ├─────────────────────────────────────────────────────────┤ │
│ │ ✅ "Buddhist Ethics" published by Mike Johnson          │ │
│ │ 4 hours ago                                             │ │
│ ├─────────────────────────────────────────────────────────┤ │
│ │ 👥 "Loving Kindness" assigned to Sarah Chen             │ │
│ │ 1 day ago                                               │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘

Grid Layout:
- Stats cards: 4 columns, 280px each, 24px gaps
- Quick actions: 3 buttons, 200px each
- Activity feed: Full width, 56px per item
```

### **3. Plan Creation - Step 1**
```
Frame: 1440 × 1024px

Header: Same as dashboard

Breadcrumb (48px height):
┌─────────────────────────────────────────────────────────────┐
│ Dashboard > Create New Plan                                 │
└─────────────────────────────────────────────────────────────┘

Form Container (800px width, centered):
┌─────────────────────────────────────────────────────────────┐
│                    Create New Plan                          │
│                                                             │
│ Step 1 of 2: Basic Information                             │
│ ●━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━○                   │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Plan Title *                                            │ │
│ │ ┌─────────────────────────────────────────────────────┐ │ │
│ │ │                                                     │ │ │
│ │ └─────────────────────────────────────────────────────┘ │ │
│ │                                                         │ │
│ │ Description *                                           │ │
│ │ ┌─────────────────────────────────────────────────────┐ │ │
│ │ │                                                     │ │ │
│ │ │                                                     │ │ │
│ │ │                                                     │ │ │
│ │ └─────────────────────────────────────────────────────┘ │ │
│ │                                                         │ │
│ │ Duration (days) *        Difficulty Level *            │ │
│ │ ┌─────────────┐          ┌─────────────────────────┐    │ │
│ │ │             │          │ Beginner            ▼  │    │ │
│ │ └─────────────┘          └─────────────────────────┘    │ │
│ │                                                         │ │
│ │ Category *                                              │ │
│ │ ┌─────────────────────────────────────────────────────┐ │ │
│ │ │ Meditation                              ▼           │ │ │
│ │ └─────────────────────────────────────────────────────┘ │ │
│ │                                                         │ │
│ │ Tags (optional)                                         │ │
│ │ ┌─────────────────────────────────────────────────────┐ │ │
│ │ │ mindfulness, beginner, daily practice               │ │ │
│ │ └─────────────────────────────────────────────────────┘ │ │
│ │                                                         │ │
│ │              [Cancel]           [Next: Daily Content]   │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘

Form Specifications:
- Container: 800px width, 32px padding
- Input fields: Full width (736px)
- Two-column fields: 352px each with 32px gap
- Textarea: 120px height
- Buttons: 160px width, right aligned
```

### **4. Plan List View**
```
Frame: 1440 × 1024px

Header: Same as dashboard

Filters Bar (64px height):
┌─────────────────────────────────────────────────────────────┐
│ [🔍 Search plans...]  [Status ▼]  [Category ▼]  [+ New Plan]│
└─────────────────────────────────────────────────────────────┘

Table Container:
┌─────────────────────────────────────────────────────────────┐
│ Plan Name          Status      Enrollments    Actions       │
│ ├─────────────────────────────────────────────────────────┤ │
│ │ Mindfulness      Published      45         [Edit]        │ │
│ │ Basics                                     [Assign]      │ │
│ │                                            [Analytics]   │ │
│ │                                            [Archive]     │ │
│ ├─────────────────────────────────────────────────────────┤ │
│ │ Buddhist Ethics  Draft          0         [Edit]        │ │
│ │                                            [Assign]      │ │
│ │                                            [Delete]      │ │
│ ├─────────────────────────────────────────────────────────┤ │
│ │ Loving Kindness  Published      67        [Edit]        │ │
│ │                                            [Assign]      │ │
│ │                                            [Analytics]   │ │
│ │                                            [Archive]     │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ Showing 3 of 12 plans                    [1] 2 3 Next     │
└─────────────────────────────────────────────────────────────┘

Table Specifications:
- Row height: 80px
- Columns: 300px, 120px, 120px, 200px
- Actions: Dropdown menu, 32px trigger
- Pagination: Right aligned
```

### **5. Task Editor Modal**
```
Modal: 800px × 600px, centered overlay

┌─────────────────────────────────────────────────────────────┐
│ Edit Task - Day 3                                      ✕   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Content Type *                                              │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Reading                                             ▼   │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ Task Content *                                              │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ [B] [I] [U] [📎] [🎵] [📷]                              │ │
│ ├─────────────────────────────────────────────────────────┤ │
│ │ Read Chapter 3: "The Nature of Suffering"              │ │
│ │                                                         │ │
│ │ Focus on understanding the Four Noble Truths...        │ │
│ │                                                         │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ Instructions (optional)                                     │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Take your time with this reading. Make notes of        │ │
│ │ any questions that arise.                               │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ Reflection Prompt (optional)                               │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ How do you see suffering manifesting in your daily     │ │
│ │ life? What patterns do you notice?                      │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ⏱️ Estimated Time: [15] minutes    ☑️ Required Task         │
│                                                             │
│                          [Cancel]  [Save Task]             │
└─────────────────────────────────────────────────────────────┘

Modal Specifications:
- Overlay: rgba(0,0,0,0.5)
- Modal: 800px × 600px, 32px padding
- Rich text editor: Full width, 200px height
- Footer buttons: Right aligned
```

### **6. Media Library**
```
Frame: 1440 × 1024px

Header: Same as dashboard

Media Controls (80px height):
┌─────────────────────────────────────────────────────────────┐
│ [📁 Folders] [🔍 Search] [Type ▼] [Date ▼]    [⬆️ Upload]   │
│                                                             │
│ 📁 All Files > 📁 Audio > 📁 Meditation                     │
└─────────────────────────────────────────────────────────────┘

Media Grid (3 columns):
┌─────────────────────────────────────────────────────────────┐
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐             │
│ │ 🎵          │ │ 🎵          │ │ 🎵          │             │
│ │             │ │             │ │             │             │
│ │ Bell Sound  │ │ Chanting    │ │ Nature      │             │
│ │ 2.3 MB      │ │ 5.1 MB      │ │ 8.7 MB      │             │
│ │ MP3         │ │ MP3         │ │ MP3         │             │
│ └─────────────┘ └─────────────┘ └─────────────┘             │
│                                                             │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐             │
│ │ 📷          │ │ 📷          │ │ 📷          │             │
│ │             │ │             │ │             │             │
│ │ Buddha      │ │ Lotus       │ │ Temple      │             │
│ │ 1.2 MB      │ │ 890 KB      │ │ 2.1 MB      │             │
│ │ JPG         │ │ PNG         │ │ JPG         │             │
│ └─────────────┘ └─────────────┘ └─────────────┘             │
└─────────────────────────────────────────────────────────────┘

Grid Specifications:
- 3 columns, 400px each
- 32px gaps between items
- Cards: 400px × 300px
- Thumbnail: 400px × 200px
- Info section: 100px height
```

## Component States

### **Button States**
```
Primary Button:
- Default: #1E40AF background
- Hover: #1D4ED8 background, slight shadow
- Active: #1E3A8A background
- Disabled: #9CA3AF background, #D1D5DB text
- Loading: Spinner animation, disabled state
```

### **Input States**
```
Text Input:
- Default: White background, #D1D5DB border
- Focus: #1E40AF border, blue shadow ring
- Error: #DC2626 border, red shadow ring
- Disabled: #F3F4F6 background, #9CA3AF text
- Success: #059669 border, green shadow ring
```

### **Card States**
```
Plan Card:
- Default: White background, subtle shadow
- Hover: Slightly elevated shadow
- Selected: #1E40AF border
- Loading: Skeleton animation
```

## Responsive Breakpoints

### **Tablet (768px)**
- Stack stats cards in 2×2 grid
- Reduce padding to 24px
- Collapse navigation to hamburger menu
- Form width: 100% with 24px margins

### **Mobile (375px)**
- Single column layout
- Stack all cards vertically
- Full-width buttons and inputs
- Reduce font sizes by 2px
- 16px container padding

## Animation Specifications

### **Page Transitions**
```
Duration: 300ms
Easing: cubic-bezier(0.4, 0, 0.2, 1)
Type: Fade + slight slide up (8px)
```

### **Modal Animations**
```
Entry: Scale from 0.95 to 1.0, fade in
Exit: Scale to 0.95, fade out
Duration: 200ms
Backdrop: Fade in/out 150ms
```

### **Button Interactions**
```
Hover: 150ms ease-out
Active: 100ms ease-in
Loading: Continuous spin animation
```

### **Loading States**
```
Skeleton: Shimmer animation, 1.5s duration
Spinner: Rotate 360deg, 1s linear infinite
Progress: Smooth width transitions
```

This comprehensive Figma specification provides everything needed to create a professional, cohesive design system for the Buddhist Reading Plans CMS. Each component includes exact measurements, colors, and interaction states for pixel-perfect implementation.
