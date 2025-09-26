# Design Guidelines: Enterprise AMU/MRL Monitoring Web Application

## Design Approach
**Selected Approach:** Design System (Enterprise/Utility-Focused)
**System Choice:** Fluent Design with Material Design influences
**Justification:** This enterprise compliance application prioritizes data density, workflow efficiency, and regulatory requirements over visual appeal. Users need quick access to critical compliance information and streamlined data entry workflows.

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Light Mode: 220 85% 25% (Deep professional blue)
- Dark Mode: 220 70% 15% (Darker blue for enterprise feel)

**Supporting Colors:**
- Success: 142 76% 36% (Compliance green)
- Warning: 38 92% 50% (Alert amber for MRL warnings)
- Error: 0 84% 60% (Violation red)
- Neutral: 220 14% 96% (Light backgrounds)
- Text: 220 25% 25% (High contrast)

### B. Typography
**Font System:** Inter (via Google Fonts CDN)
- Headers: 600 weight, 1.2 line height
- Body: 400 weight, 1.5 line height
- Data/Numbers: 500 weight, tabular-nums
- Labels: 500 weight, 0.875rem size

### C. Layout System
**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, 12, 16
- Micro spacing: p-2, m-2 (forms, buttons)
- Standard spacing: p-4, m-4 (cards, sections)
- Large spacing: p-8, m-8 (page layouts)
- XL spacing: p-16 (hero sections only)

### D. Component Library

**Navigation:**
- Fixed sidebar with collapsible sections
- Breadcrumb navigation for deep workflows
- Tab navigation for related data views

**Data Display:**
- Dense data tables with sortable columns
- Card layouts for animal profiles
- Status indicators with color coding
- Metric cards for dashboard KPIs

**Forms:**
- Multi-step forms for drug administration
- Inline validation with immediate feedback
- Auto-save functionality indicators
- Required field marking

**Alerts & Notifications:**
- Toast notifications for real-time alerts
- Banner alerts for system-wide notices
- Inline validation messages
- Modal dialogs for critical confirmations

**Dashboard Elements:**
- Chart.js integration for compliance trends
- Real-time status indicators
- Quick action buttons
- Recent activity feeds

### E. Animations
**Minimal Animation Strategy:**
- Loading spinners for data fetching only
- Smooth transitions for tab switching (200ms)
- Hover states for interactive elements
- No decorative animations

## Enterprise-Specific Considerations

**Data Density:** Prioritize information hierarchy with clear visual separation between data sections. Use consistent spacing and typography scales to handle complex compliance data.

**Workflow Efficiency:** Design forms and interfaces that minimize clicks and cognitive load. Group related actions and provide clear progress indicators for multi-step processes.

**Accessibility:** Ensure WCAG 2.1 AA compliance with high contrast ratios, keyboard navigation, and screen reader support. All compliance status indicators must be accessible via color and text/icons.

**Responsive Design:** Mobile-first approach with tablet optimization for field use. Desktop remains primary platform for detailed compliance analysis.

**Trust & Authority:** Use consistent spacing, professional color palette, and clear information hierarchy to convey enterprise reliability and regulatory compliance capabilities.