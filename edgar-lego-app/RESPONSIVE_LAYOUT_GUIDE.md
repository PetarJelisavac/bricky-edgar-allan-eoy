# Responsive Layout Implementation Guide

## Overview
This guide documents the responsive layout pattern used for the LEGO Build App, specifically the Welcome Screen. Use this as a reference when implementing other pages to maintain consistency.

---

## Layout Structure

### 1. Container Hierarchy

```
Outer Wrapper (100svh)
  └── Container Main (max-width: 1440px, 100svh)
      ├── Logo Wrapper (top)
      ├── Content Wrapper (center)
      │   ├── Layout (text + button)
      │   └── SVG Container (image)
      └── Empty Spacer (bottom)
```

### 2. Key Principles

- **Mobile-first approach**: Start with mobile layout, enhance for desktop
- **100svh height**: Full viewport height on all screens
- **Max-width constraints**: Prevent content from becoming too wide
- **Centered alignment**: Content centered on mobile, left-aligned on desktop
- **Fixed SVG container**: Consistent image sizing across breakpoints

---

## Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| Mobile | < 1024px | Vertical stack, centered content |
| Desktop | ≥ 1024px (lg) | Horizontal layout, left-aligned content |

**Important**: Use `lg` (1024px) breakpoint to avoid layout issues on tablets.

---

## Implementation Details

### Outer Wrapper
```tsx
<div 
  className="bg-[#fefff8] flex items-center justify-center px-5 py-10 lg:px-16 relative w-full"
  style={{ minHeight: '100svh' }}
>
```

**Properties:**
- Background: `#fefff8` (off-white)
- Padding: `px-5 py-10` (mobile) → `lg:px-16` (desktop)
- Height: `100svh` minimum
- Centers content horizontally and vertically

---

### Container Main
```tsx
<div className="w-full max-w-[1440px] flex flex-col justify-between items-center lg:items-stretch relative" 
     style={{ minHeight: '100svh' }}>
```

**Properties:**
- Max-width: `1440px`
- Flex direction: `flex-col` (always vertical)
- Justify: `justify-between` (space-between for logo at top, content in middle)
- Align: `items-center` (mobile) → `lg:items-stretch` (desktop)
- Height: `100svh` minimum

---

### Logo Wrapper
```tsx
<div className="flex items-center w-full shrink-0">
  <img
    src={logoLego}
    alt="LEGO Logo"
    className="w-[69.4px] h-[69.4px]"
  />
</div>
```

**Properties:**
- Fixed size: `69.4px × 69.4px`
- Sticks to top due to parent's `justify-between`
- No responsive scaling

---

### Content Wrapper
```tsx
<div className="flex flex-col lg:flex-row gap-10 lg:gap-6 items-center justify-center w-full shrink-0">
```

**Properties:**
- Direction: `flex-col` (mobile) → `lg:flex-row` (desktop)
- Gap: `gap-10` (40px mobile) → `lg:gap-6` (24px desktop)
- Alignment: `items-center` (centers all children)
- Justification: `justify-center` (centers content vertically/horizontally)

---

### Layout (Text + Button Container)
```tsx
<div className="flex flex-col gap-6 items-center lg:items-start justify-center w-full lg:max-w-[457px] shrink-0">
```

**Properties:**
- Direction: `flex-col` (always vertical)
- Gap: `gap-6` (24px between text and button)
- Alignment: `items-center` (mobile) → `lg:items-start` (desktop)
- Max-width: Full width (mobile) → `457px` (desktop)

---

### Content (Text Container)
```tsx
<div className="flex flex-col gap-1 items-start justify-center w-full max-w-[350px] lg:max-w-[460px]">
```

**Properties:**
- Direction: `flex-col` (vertical stack)
- Gap: `gap-1` (4px between heading and paragraph)
- Alignment: `items-start` (left-aligned text)
- Max-width: `350px` (mobile) → `460px` (desktop)

---

### Heading with Fluid Typography
```tsx
<h1 
  className="font-['Epilogue'] font-semibold text-black m-0 w-full"
  style={{ 
    fontSize: 'clamp(40px, 5vw, 60px)',
    lineHeight: '1.2'
  }}
>
  It's time to build together in 2026!
</h1>
```

**Properties:**
- Font: Epilogue, Semibold
- Size: `clamp(40px, 5vw, 60px)` - smoothly scales from 40px to 60px
- Line-height: `1.2` (consistent spacing)
- Color: Black
- Width: Full width of parent

**Why clamp()?**
- Provides smooth, fluid scaling between breakpoints
- No sudden jumps in font size
- Better reading experience across all screen sizes

---

### Body Text
```tsx
<p className="font-['Epilogue'] font-normal text-[18px] leading-[28px] text-black m-0 w-full">
  Welcome! We hope the new year finds you well...
</p>
```

**Properties:**
- Font: Epilogue, Regular
- Size: `18px` (fixed, no scaling)
- Line-height: `28px`
- Color: Black
- Width: Full width of parent

---

### Button
```tsx
<button
  onClick={() => navigate('/step/1')}
  className="bg-black text-[#fefff8] px-[30px] py-[13.5px] h-[68px] w-full max-w-[350px] rounded-[100px] font-['Petrona'] font-medium italic text-[24px] leading-normal border-none cursor-pointer flex items-center justify-center transition-transform hover:scale-[1.02] shrink-0"
>
  Lets get building!
</button>
```

**Properties:**
- Background: Black
- Text color: `#fefff8` (off-white)
- Padding: `30px` horizontal, `13.5px` vertical
- Height: `68px` (fixed)
- Width: Full width up to `350px` max
- Border-radius: `100px` (pill shape)
- Font: Petrona, Medium Italic, 24px
- Hover: `scale-[1.02]` (subtle zoom effect)

---

### SVG Container (Fixed Dimensions)
```tsx
<div className="relative shrink-0 w-full lg:w-[350px] h-[282px]">
  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
    <img
      src={edgarLego}
      alt="Edgar LEGO Character"
      className="block w-auto h-auto"
    />
  </div>
</div>
```

**Properties:**
- Outer container: `w-full` (mobile) → `lg:w-[350px]` (desktop)
- Height: `282px` (fixed on all screens)
- Inner div: Absolute positioning for perfect centering
- Image: Natural dimensions, centered within container

**Why this approach?**
- Ensures consistent image sizing
- Prevents image from being off-center
- Maintains aspect ratio
- Works reliably across all screen sizes

---

## Responsive Behavior Summary

### Mobile (< 1024px)
- ✅ Vertical stack layout
- ✅ All content centered horizontally
- ✅ Logo at top
- ✅ Text max-width: 350px
- ✅ Button max-width: 350px
- ✅ SVG full width, centered in 282px height container
- ✅ Heading: 40px (scales with viewport)
- ✅ Gap between sections: 40px

### Desktop (≥ 1024px)
- ✅ Horizontal layout (text left, SVG right)
- ✅ Logo at top left
- ✅ Text left-aligned
- ✅ Text max-width: 460px
- ✅ Content max-width: 457px
- ✅ Button max-width: 350px
- ✅ SVG fixed: 350px × 282px container
- ✅ Heading: 60px (scales with viewport)
- ✅ Gap between sections: 24px

---

## Common Patterns to Reuse

### 1. Full Height Container with Space Between
```tsx
<div className="flex flex-col justify-between" style={{ minHeight: '100svh' }}>
  <div>Top content</div>
  <div>Middle content</div>
  <div>Bottom spacer</div>
</div>
```

### 2. Responsive Flex Direction
```tsx
<div className="flex flex-col lg:flex-row">
  {/* Vertical on mobile, horizontal on desktop */}
</div>
```

### 3. Responsive Alignment
```tsx
<div className="items-center lg:items-start">
  {/* Centered on mobile, left-aligned on desktop */}
</div>
```

### 4. Responsive Max-Width
```tsx
<div className="max-w-[350px] lg:max-w-[460px]">
  {/* Narrower on mobile, wider on desktop */}
</div>
```

### 5. Fluid Typography with Clamp
```tsx
<h1 style={{ fontSize: 'clamp(40px, 5vw, 60px)', lineHeight: '1.2' }}>
  {/* Smoothly scales between 40px and 60px */}
</h1>
```

### 6. Centered Image in Fixed Container
```tsx
<div className="relative w-[350px] h-[282px]">
  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
    <img src={image} className="block w-auto h-auto" />
  </div>
</div>
```

---

## Checklist for New Pages

When implementing a new responsive page, ensure:

- [ ] Outer wrapper has `100svh` min-height
- [ ] Container main has `max-w-[1440px]`
- [ ] Use `lg` breakpoint (1024px) for layout changes
- [ ] Mobile: vertical stack, centered content
- [ ] Desktop: horizontal layout where appropriate
- [ ] Text has proper max-widths (350px mobile, 460px desktop)
- [ ] Buttons have max-width of 350px
- [ ] Images are centered in fixed containers
- [ ] Typography uses clamp() for smooth scaling
- [ ] Gaps are responsive (larger on mobile, smaller on desktop)
- [ ] Test on mobile, tablet (iPad), and desktop sizes

---

## Testing Viewports

Test your layout at these key widths:

| Device | Width | Expected Layout |
|--------|-------|-----------------|
| iPhone 13 | 390px | Vertical, centered |
| iPad Mini | 768px | Vertical, centered |
| iPad Pro | 1024px | Horizontal (breakpoint) |
| Desktop | 1440px | Horizontal, max-width |
| Large Desktop | 1920px | Horizontal, max-width |

---

## Common Issues & Solutions

### Issue: Content cuts off on tablets
**Solution**: Use `lg` (1024px) breakpoint instead of `md` (768px)

### Issue: SVG not centered in container
**Solution**: Use absolute positioning with translate transforms
```tsx
<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
```

### Issue: Text too wide on mobile
**Solution**: Add max-width constraints
```tsx
<div className="max-w-[350px] lg:max-w-[460px]">
```

### Issue: Sudden font size jumps
**Solution**: Use clamp() for smooth scaling
```tsx
style={{ fontSize: 'clamp(40px, 5vw, 60px)' }}
```

### Issue: Layout not full height
**Solution**: Use `100svh` on both outer wrapper and container main
```tsx
style={{ minHeight: '100svh' }}
```

---

## File Reference

See implementation in:
- `/src/pages/build/WelcomeScreen.tsx`

---

## Notes

- Always test responsive behavior in browser DevTools
- Use browser preview to verify layout at different sizes
- Maintain consistency with this pattern across all pages
- Update this guide if you discover better patterns
