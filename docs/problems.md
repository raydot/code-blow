# 30 Days of Coding Practice App - Implementation Guide

## Project Overview

This is a React-based coding practice app designed for frontend developers preparing for technical interviews. The app provides 30 carefully curated problems focusing on JavaScript fundamentals rather than complex algorithms.

## Key Features

- **30-day curriculum** divided into 4 themed weeks
- **Timer functionality** to simulate interview pressure
- **Progress tracking** with visual indicators
- **Code editor** with starter code and solutions
- **Responsive design** with clean UI

## Current Status

I have a working React component with the first 10 days of problems implemented. The remaining 20 days need to be added to complete the curriculum.

## Curriculum Structure

### Week 1: Core JS Syntax (Days 1-7) ✅ IMPLEMENTED

- Array methods (forEach, map, filter, reduce)
- String manipulation
- Basic recursion
- Closures and variable arguments

### Week 2: Essential Algorithms (Days 8-14) ⚠️ PARTIALLY IMPLEMENTED

- Prime number algorithms (basic, range, sieve) ✅
- Binary search, duplicates, fibonacci ❌ NEEDS IMPLEMENTATION
- Sum operations ❌ NEEDS IMPLEMENTATION

### Week 3: Data Transformation (Days 15-21) ❌ NEEDS IMPLEMENTATION

- Object manipulation (grouping, merging)
- Array transformations (flattening, chunking)
- Functional utilities (curry, debounce)

### Week 4: Integration & Speed (Days 22-30) ❌ NEEDS IMPLEMENTATION

- Timed reviews of previous problems
- Currency converter variations
- Edge case handling
- Final data pipeline challenge

## Implementation Tasks

### 1. Complete the Curriculum Object

Add the missing 20 problems to the `curriculum` object following this structure:

```javascript
[dayNumber]: {
  week: [1-4],
  title: "Descriptive Title",
  problem: "Clear problem statement",
  example: "functionName(input) → output",
  starter: "function template with comments",
  solution: "working solution with proper formatting",
  focus: "Key learning point for this problem"
}
```

### 2. Problem Content Needed

**Days 11-14 (Week 2 completion):**

- Binary search implementation
- Find duplicates in array
- Fibonacci sequence generation
- Sum of number range

**Days 15-21 (Week 3):**

- Group objects by property
- Deep merge objects
- Flatten nested arrays
- Remove duplicates (preserving order)
- Chunk array into smaller arrays
- Matrix transpose
- Curry function implementation

**Days 22-30 (Week 4):**

- Timed reviews (days 22-24)
- Currency converter variations (days 25-27)
- Variable arguments handling (day 28)
- Edge case handling (day 29)
- Final data pipeline challenge (day 30)

### 3. Technical Requirements

**Dependencies:**

- React with hooks (useState, useEffect)
- Lucide React for icons
- Tailwind CSS for styling

**Key Functions:**

- Timer management (start/stop/format)
- Progress tracking with localStorage persistence
- Day navigation with validation
- Code editor with syntax highlighting (optional enhancement)

### 4. Recommended Enhancements

**Priority 1:**

- Add localStorage to persist progress between sessions
- Implement problem search/filter functionality
- Add keyboard shortcuts for navigation

**Priority 2:**

- Code execution/testing functionality
- Hints system for struggling users
- Export progress as PDF report

**Priority 3:**

- Dark mode toggle
- Adjustable timer settings
- Social sharing of completed challenges

## Design Guidelines

**UI/UX Principles:**

- Clean, distraction-free interface
- Clear visual hierarchy
- Responsive design for mobile practice
- Accessible color contrast and navigation

**Code Quality:**

- All problems should have working, tested solutions
- Examples should be immediately understandable
- Focus points should highlight the key learning concept
- Starter code should provide helpful structure without giving away the solution

## Problem Creation Guidelines

When adding the missing problems:

1. **Start Simple:** Each problem should have an obvious brute-force solution
2. **Build Confidence:** Focus on patterns the user will actually encounter
3. **Progressive Difficulty:** Within each week, problems should build on each other
4. **Real-World Relevance:** Especially for Week 3-4, use practical scenarios
5. **Time-Boxed:** Each problem should be solvable in 30 minutes or less

## Testing Strategy

**Manual Testing Checklist:**

- [ ] All 30 days load without errors
- [ ] Timer starts/stops correctly
- [ ] Progress saves and loads
- [ ] Navigation works in all directions
- [ ] Solutions display properly formatted
- [ ] Mobile responsive design works
- [ ] Code editor handles long solutions

**Code Quality:**

- [ ] All solutions are syntactically correct
- [ ] Examples match the expected output
- [ ] No console errors in browser
- [ ] Proper React component structure

## Deployment Notes

This is a client-side only React app with no backend requirements. It can be deployed to:

- Netlify (recommended)
- Vercel
- GitHub Pages
- Any static hosting service

**Build Process:**

```bash
npm install
npm run build
# Deploy the build/ directory
```

## Success Metrics

The app should help users:

- Complete 30 days of focused practice
- Build confidence with JavaScript fundamentals
- Develop muscle memory for common interview patterns
- Feel prepared for Advent of Code and technical interviews
- Reduce anxiety around timed coding challenges

---

**Next Steps:** Complete the curriculum object with all 30 problems, test thoroughly, and deploy for the December 1st Advent of Code goal!
