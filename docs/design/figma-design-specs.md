# Buddhist Reading Plans CMS - Figma Design Specifications

## Design System Overview

### **Color Palette**
```
Primary Colors:
- Primary Blue: #1E40AF (Navigation, CTAs)
- Primary Orange: #EA580C (Accent, Highlights)
- Success Green: #059669 (Published status, Success states)
- Warning Amber: #D97706 (Draft status, Warnings)
- Error Red: #DC2626 (Delete actions, Errors)

Neutral Colors:
- Gray 50: #F9FAFB (Background)
- Gray 100: #F3F4F6 (Card backgrounds)
- Gray 200: #E5E7EB (Borders)
- Gray 300: #D1D5DB (Disabled states)
- Gray 500: #6B7280 (Secondary text)
- Gray 700: #374151 (Primary text)
- Gray 900: #111827 (Headers)

Buddhist-Inspired Accents:
- Saffron: #FF9500 (Special highlights)
- Deep Purple: #7C3AED (Meditation content)
- Teal: #0D9488 (Wisdom/Teaching content)
```

### **Typography**
```
Font Family: Inter (Clean, readable, professional)

Headings:
- H1: 32px, Bold, Gray 900
- H2: 24px, Semibold, Gray 900
- H3: 20px, Semibold, Gray 700
- H4: 18px, Medium, Gray 700

Body Text:
- Large: 16px, Regular, Gray 700
- Medium: 14px, Regular, Gray 600
- Small: 12px, Regular, Gray 500

UI Elements:
- Button Text: 14px, Medium
- Input Labels: 14px, Medium, Gray 700
- Input Text: 14px, Regular, Gray 900
- Caption: 12px, Regular, Gray 500
```

### **Spacing System**
```
Base Unit: 4px

Spacing Scale:
- XS: 4px
- SM: 8px
- MD: 16px
- LG: 24px
- XL: 32px
- 2XL: 48px
- 3XL: 64px

Component Padding:
- Buttons: 12px 24px
- Cards: 24px
- Modals: 32px
- Page Containers: 32px
```

### **Border Radius**
```
- Small: 4px (Buttons, inputs)
- Medium: 8px (Cards, modals)
- Large: 12px (Large cards)
- Full: 9999px (Pills, avatars)
```

### **Shadows**
```
- Card Shadow: 0 1px 3px rgba(0, 0, 0, 0.1)
- Modal Shadow: 0 10px 25px rgba(0, 0, 0, 0.15)
- Button Hover: 0 2px 4px rgba(0, 0, 0, 0.1)
```

## Component Library

### **1. Buttons**

#### Primary Button
```
Background: #1E40AF
Text: White, 14px, Medium
Padding: 12px 24px
Border Radius: 4px
Hover: #1D4ED8
Active: #1E3A8A
```

#### Secondary Button
```
Background: White
Border: 1px solid #D1D5DB
Text: #374151, 14px, Medium
Padding: 12px 24px
Border Radius: 4px
Hover: #F9FAFB
```

#### Danger Button
```
Background: #DC2626
Text: White, 14px, Medium
Padding: 12px 24px
Border Radius: 4px
Hover: #B91C1C
```

### **2. Form Elements**

#### Input Field
```
Background: White
Border: 1px solid #D1D5DB
Padding: 12px 16px
Border Radius: 4px
Font: 14px, Regular
Focus: Border #1E40AF, Shadow 0 0 0 3px rgba(30, 64, 175, 0.1)
```

#### Select Dropdown
```
Background: White
Border: 1px solid #D1D5DB
Padding: 12px 16px
Border Radius: 4px
Arrow: Gray 400
Focus: Border #1E40AF
```

#### Textarea
```
Background: White
Border: 1px solid #D1D5DB
Padding: 12px 16px
Border Radius: 4px
Min Height: 120px
Resize: Vertical
```

### **3. Cards**

#### Plan Card
```
Background: White
Border: 1px solid #E5E7EB
Border Radius: 8px
Padding: 24px
Shadow: 0 1px 3px rgba(0, 0, 0, 0.1)
```

#### Stats Card
```
Background: White
Border: 1px solid #E5E7EB
Border Radius: 8px
Padding: 20px
Icon: 32px, Primary Blue
Title: 16px, Semibold
Value: 24px, Bold
```

### **4. Navigation**

#### Top Navigation
```
Background: White
Border Bottom: 1px solid #E5E7EB
Height: 64px
Padding: 0 32px
Logo: Left aligned
User Menu: Right aligned
```

#### Sidebar Navigation (if needed)
```
Background: #F9FAFB
Width: 256px
Padding: 24px 16px
Border Right: 1px solid #E5E7EB
```

### **5. Status Badges**

#### Published
```
Background: #D1FAE5
Text: #065F46, 12px, Medium
Padding: 4px 12px
Border Radius: 9999px
```

#### Draft
```
Background: #FEF3C7
Text: #92400E, 12px, Medium
Padding: 4px 12px
Border Radius: 9999px
```

#### Archived
```
Background: #F3F4F6
Text: #374151, 12px, Medium
Padding: 4px 12px
Border Radius: 9999px
```

## Page Layouts

### **1. Dashboard Layout**
```
Container: Max width 1200px, centered
Grid: 3 columns for stats cards
Spacing: 24px between cards
Sidebar: Optional 256px left sidebar
```

### **2. Form Layout**
```
Container: Max width 800px, centered
Form Width: 100%
Field Spacing: 24px vertical
Section Spacing: 48px vertical
```

### **3. Table Layout**
```
Container: Full width with 32px padding
Table: Full width, responsive
Row Height: 56px
Cell Padding: 16px
```

## Figma File Structure

### **Pages to Create:**

1. **🎨 Design System**
   - Color palette
   - Typography scale
   - Component library
   - Icons and illustrations

2. **📱 Wireframes**
   - Low-fidelity layouts
   - User flow diagrams
   - Information architecture

3. **🖥️ Desktop Designs**
   - Login page
   - Dashboard
   - Plan creation flow
   - Plan management
   - Media library
   - Analytics
   - Admin views

4. **📱 Mobile Responsive**
   - Mobile adaptations
   - Touch-friendly interactions
   - Collapsed navigation

5. **🔄 Interactive Prototype**
   - Clickable prototype
   - User flow connections
   - Micro-interactions

### **Component Organization:**
```
Components/
├── Buttons/
│   ├── Primary
│   ├── Secondary
│   └── Danger
├── Forms/
│   ├── Input
│   ├── Select
│   ├── Textarea
│   └── Checkbox
├── Cards/
│   ├── Plan Card
│   ├── Stats Card
│   └── Media Card
├── Navigation/
│   ├── Top Nav
│   └── Breadcrumbs
├── Modals/
│   ├── Confirmation
│   ├── Form Modal
│   └── Assignment Modal
└── Status/
    ├── Badges
    ├── Progress Bars
    └── Loading States
```

## Buddhist-Inspired Design Elements

### **Visual Motifs**
- **Lotus patterns** for decorative elements
- **Mandala-inspired** loading animations
- **Zen minimalism** in layout and spacing
- **Natural color gradients** for backgrounds
- **Peaceful imagery** for empty states

### **Icons**
- **Meditation pose** for meditation content
- **Lotus flower** for spiritual content
- **Prayer beads** for practice tracking
- **Dharma wheel** for teachings
- **Om symbol** for sacred content

### **Illustrations**
- **Peaceful landscapes** for empty states
- **Buddhist symbols** as decorative elements
- **Minimalist line art** for onboarding
- **Calming gradients** for backgrounds

## Implementation Notes

### **Figma Setup Steps:**
1. Create new Figma file: "Buddhist Reading Plans CMS"
2. Set up design system with colors and typography
3. Create component library with variants
4. Design desktop layouts first
5. Create mobile responsive versions
6. Build interactive prototype
7. Share with team for feedback

### **Export Guidelines:**
- **Assets**: Export at 1x, 2x, 3x for different screen densities
- **Icons**: Export as SVG for scalability
- **Images**: Export as PNG/JPG optimized for web
- **Specs**: Use Figma's developer handoff features

### **Collaboration:**
- **Comments**: Use Figma comments for feedback
- **Versions**: Save major iterations as versions
- **Sharing**: Share with view/edit permissions as needed
- **Handoff**: Use Figma's dev mode for implementation

This comprehensive design system will ensure consistency across all CMS interfaces while maintaining the peaceful, focused aesthetic appropriate for Buddhist content creation.
