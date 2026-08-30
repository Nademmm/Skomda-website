# Redesign Hub Industri Page

## Goal
Update the Hub Industri page to a more professional look by:
- Reworking the hero section (remove unnecessary visual noise, simplify CTA buttons).
- Removing the “Tertarik Menjadi Mitra Industri?” CTA section.
- Deleting the generic eyebrow `<span>` badges that appear at the start of sections.
- Simplifying hover effects to subtle color changes only (no translate, scale, or heavy shadows).

## User Review Required
> [!IMPORTANT]
> Confirm that the following changes match your vision:
> - Hero CTA buttons will only change background color on hover (no translation or scaling).
> - The entire CTAKerjasamaSection will be removed from the page.
> - Eyebrow badge `<span>` elements in **SkemaKerjasamaSection** and **MitraIndustriSection** will be removed.
> - Hover effects will be limited to a light shadow/color change.

## Open Questions
> [!WARNING]
> - Do you want the “Active Mitra” count badge in the Mitra Industri header removed as well, or keep the text without the badge styling? yes
> - Should any other sections (e.g., AlurKerjasamaSection) also have hover simplifications beyond what we identified?

## Proposed Changes
---
### Hub Industri Page
- **[MODIFY]** `frontend/src/app/tentang-kami/hub-industri/page.tsx`
  - Remove import of `CTAKerjasamaSection`.
  - Delete `<CTAKerjasamaSection />` element from JSX.

---
### Hero Section
- **[MODIFY]** `frontend/src/components/sections/hub-industri/HubIndustriHeroSection.tsx`
  - Adjust CTA button classes: keep only `hover:bg-[#990a0e]` (or similar) and remove `translate-x-1`, `scale-[0.98]`, and extra shadow.

---
### Skema Kerjasama Section
- **[MODIFY]** `frontend/src/components/sections/hub-industri/SkemaKerjasamaSection.tsx`
  - Remove the eyebrow badge `<div className="mb-4 inline-flex ...">` block.
  - Simplify card hover class to `hover:shadow-md` (remove translate and border changes).

---
### Mitra Industri Section
- **[MODIFY]** `frontend/src/components/sections/hub-industri/MitraIndustriSection.tsx`
  - Remove the badge span displaying `{mitraList.length} Mitra Aktif` (lines 111‑115).
  - Simplify card hover class to `hover:shadow-md` (remove translate and border highlight).

---
### CTA Kerjasama Section (optional removal)
- **[DELETE]** `frontend/src/components/sections/hub-industri/CTAKerjasamaSection.tsx`
  - File will be removed as it is no longer used.

---
## Verification Plan
### Automated Tests
- Run `npx next lint` to ensure no lint errors.
- Run TypeScript check `npx tsc --noEmit`.
- Start dev server and manually verify page renders without the removed sections and with simplified hover effects.

### Manual Verification
- Open `http://localhost:3000/tentang-kami/hub-industri` and confirm:
  - Hero CTA buttons only change background color on hover.
  - No “Tertarik Menjadi Mitra Industri?” block present.
  - No eyebrow badges appear at the top of Skema Kerjasama and Mitra Industri sections.
  - Hovering over cards produces a subtle shadow only.
