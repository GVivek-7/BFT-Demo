# Questionnaire System Guide

## Overview
The questionnaire system supports 4 different journey types with a step-by-step chapter navigation.

## Routes Structure
```
/questionnaire                                    → Selection page (choose journey type)
/questionnaire/[slug]                            → Welcome page for specific journey
/questionnaire/[slug]/chapters                   → Chapter navigation page (horizontal scroll)
/questionnaire/[slug]/chapter/[chapterId]        → Individual chapter questions
```

## Available Journeys
1. `mystery-voyage` - Mystery Voyage
2. `Tailored-escape` - Tailored Escape  
3. `purpose-retreat` - Purpose Retreat
4. `crafted-journey` - Crafted Journey

## User Flow
1. **Selection Page** (`/questionnaire`)
   - User sees all 4 journey options in a grid
   - Clicks on desired journey type

2. **Welcome Page** (`/questionnaire/[slug]`)
   - 2-step welcome introduction
   - Step 1: Introduction text with "Get started" button
   - Step 2: Name input with "Continue" button
   - After completion, navigates to chapters page

3. **Chapters Page** (`/questionnaire/[slug]/chapters`)
   - Shows all chapters in horizontal scroll (mobile)
   - Shows grid layout (desktop)
   - Each chapter card displays:
     - Chapter number
     - Chapter title
     - Question count
   - Click any chapter to start answering

4. **Chapter Questions** (`/questionnaire/[slug]/chapter/[chapterId]`)
   - Displays all questions for selected chapter
   - "Back to Chapters" button in header
   - "Previous" button (if not first chapter)
   - "Next" button (or "Submit" on last chapter)
   - Answers auto-save to localStorage

## Components

### QuestionnaireSelector
- Main selection page
- Displays 4 journey cards
- Routes to welcome page on selection

### Welcome
- 2-step introduction
- Collects user name
- Routes to chapters page

### ChapterNavigation
- Full page component
- Horizontal scroll on mobile
- Grid layout on desktop
- Shows chapter cards with metadata

### QuestionForm
- Renders questions based on type (radio, checkbox, text)
- Handles answer state
- Navigation between chapters
- Back to chapters functionality

## Features
- ✅ Separate pages for each step
- ✅ Horizontal scrolling chapter navigation
- ✅ Answer persistence with localStorage
- ✅ Support for radio, checkbox, and text questions
- ✅ Smooth page transitions
- ✅ Responsive design (mobile & desktop)
- ✅ Back navigation to chapters
- ✅ Progress tracking

## Question Types
- **radio**: Single selection from options
- **checkbox**: Multiple selections from options
- **text**: Free text input

## Data Structure
Each questionnaire has:
- `slug`: URL identifier
- `chapters`: Array of chapter objects
  - `id`: Chapter number
  - `title` or `name`: Chapter heading
  - `questions`: Array of question objects (optional)
  - `sections`: Array of section objects with questions (optional)
