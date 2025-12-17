# Getting Started with Edgar Allan LEGO App

## ✅ What's Been Set Up

### 1. Project Structure
- React + TypeScript + Vite
- React Router for multi-page navigation
- Zustand for state management
- Tailwind CSS for styling
- Framer Motion for animations
- React Hook Form + Zod for form validation
- React Webcam for photo capture

### 2. Routes Configured
**Order Flow** (`/order/*`):
- Step 1: Personal information (name, email)
- Step 2: Company information (company, industry, position)
- Step 3: Delivery details (address, phone)
- Confirmation: Review and submit

**Build Flow** (`/build/*`):
- Building steps with animated LEGO bricks
- Question cards (personalized by industry/position)
- Video content
- Completion with photo capture and gallery

### 3. State Management
- **Order Store**: Handles form data, navigation, email submission
- **Build Store**: Manages build progress, music, answers, gallery photos

### 4. Features Implemented
- ✅ Form validation with error messages
- ✅ Progress indicators
- ✅ Persistent state (localStorage)
- ✅ Music toggle component
- ✅ Photo capture and gallery
- ✅ Dynamic question generation based on user data
- ✅ Responsive design with Tailwind

## 🎯 Next Steps - What You Need to Provide

### 1. Figma Assets
Send me the Figma link and I can extract:
- LEGO brick images (PNGs/SVGs)
- Product box images
- Edgar character illustrations
- UI elements and icons

Place assets in:
```
src/assets/images/
```

### 2. Build Step Configuration
For each building step, I need:
- Instruction text
- Which LEGO bricks to display
- Animation sequence (fall from top, slide from left, etc.)
- Timing/delays

### 3. Videos
Provide video files for:
- Behind-the-scenes content
- Additional instructions
- Any other video content

Place in:
```
src/assets/videos/
```

### 4. Music
Provide background music file (MP3):
```
src/assets/audio/background-music.mp3
```

### 5. Email Configuration
To enable order email submissions:
1. Sign up for EmailJS (https://www.emailjs.com/)
2. Get your Service ID, Template ID, and Public Key
3. I'll configure it in the app

### 6. Question Bank
Review and expand questions in:
```
src/utils/questionGenerator.ts
```
Add more industry/position-specific questions as needed.

## 🚀 Running the App

```bash
# Install dependencies (if not already done)
npm install

# Start development server
npm run dev

# The app will open at http://localhost:5173
```

## 📂 Key Files to Know

- `src/App.tsx` - Main routing configuration
- `src/pages/Home.tsx` - Landing page
- `src/store/orderStore.ts` - Order flow state
- `src/store/buildStore.ts` - Build flow state
- `src/data/buildSteps.ts` - Configure build sequence
- `tailwind.config.js` - Customize colors/fonts

## 🎨 Customization

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  'lego-red': '#e3000b',
  'lego-blue': '#1f71ff',
}
```

### Add New Steps
Edit `src/data/buildSteps.ts` and add new step objects.

### Modify Forms
Order form steps are in `src/pages/order/OrderStep*.tsx`

## Ready to Continue?

Share your Figma link and I'll help you integrate all the designs and assets!
