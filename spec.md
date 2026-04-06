# Mothera

## Current State
- BabyInfoPage collects Mother's Details (first name, last name, DOB, phone, blood group, **doctor name**), Baby's Details, and an **Emergency Contact** section.
- When role === 'baby' and profile is completed, App.tsx renders the pregnancy dashboard (same as the pregnancy role).
- No dedicated "Already Having Baby" dashboard exists yet.

## Requested Changes (Diff)

### Add
- New `BabyDashboard.tsx` component — a fully separate dashboard for "Already Having Baby" users with 4 main modules:
  1. **Baby Care** — baby milestones tracker, feeding log (breastfeed/formula), sleep tracker, diaper log, vaccination schedule, and growth chart (weight/height over time)
  2. **Mother Wellness Hub** — postpartum wellness cards (exercise, yoga, nutrition, mental health), curated YouTube links, self-care tips, mood tracker
  3. **Mothers Community** — discussion forum-style module with topic threads (e.g. Sleep Tips, First Foods, Postpartum Recovery), ability to post messages, like posts (all client-side, no backend)
  4. **Baby Products** — e-commerce-style product catalog with categories (Feeding, Clothing, Toys, Skincare, Safety, Nursery), product cards with image placeholder/emoji, name, price, rating, "Add to Cart" button, cart sidebar with total

### Modify
- `BabyInfoPage.tsx`: Remove **Doctor's Name** field from Mother's Details section. Remove entire **Emergency Contact** section. Update `BabyUserInfo` interface accordingly.
- `App.tsx`: When role === 'baby' and profile completed, render `<BabyDashboard>` passing `babyUserInfo` instead of the pregnancy dashboard.

### Remove
- Doctor's Name input field from BabyInfoPage Mother's Details.
- Emergency Contact section from BabyInfoPage.
- `motherDoctorName`, `emergencyName`, `emergencyPhone` from `BabyUserInfo` interface.

## Implementation Plan
1. Update `BabyInfoPage.tsx` — remove doctor name field, remove emergency contact section, update interface.
2. Create `BabyDashboard.tsx` — full dashboard with Baby Care, Mother Wellness Hub, Mothers Community, Baby Products modules.
3. Update `App.tsx` — import BabyDashboard, pass babyUserInfo, render BabyDashboard when role === 'baby' after profile completion.
