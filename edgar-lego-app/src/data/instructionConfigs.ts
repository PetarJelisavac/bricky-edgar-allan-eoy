// Configuration for each instruction step's brick layout and animations

export interface BrickConfig {
  id: string;
  type: '1x2' | '2x1' | '2x2' | '3x1' | '4x1' | '4x2' | '6x1' | '8x2' | 'single' | '3x1-white' | '3x1-flat' | '1x2-side-pip' | '1x1-side-pip' | '1x2-side-pip-new' | '1x1-side-pip-white' | 'vertical-white' | 'vertical-blue' | 'top-curve-right' | 'top-left-curve' | 'top' | 'back-side' | 'back-side-right-column' | 'right-side-column' | 'back-completed' | 'back-side-step1' | 'back-side-step1-front' | 'circle' | '4x1-back-white' | '1x2-back-white' | '1x1-back-white' | 'doors-left-side' | 'doors-right-side';
  left: string;
  top: string;
  finalTop: string; // Where brick lands after animation
  finalLeft?: string; // Optional: for gap-closing animation
  width: string;
  height: string;
  animationDelay: string;
  zIndex: number;
  fadeRight?: boolean; // Optional: for fading out the right side
}

export interface PlaceholderConfig {
  left: string;
  top: string;
  width: string;
  height: string;
  animationDelay?: string;
}

export interface StaticBrickConfig {
  type: '1x2' | '2x1' | '2x2' | '3x1' | '4x1' | '4x2' | '6x1' | '8x2' | 'single' | '3x1-white' | '3x1-flat' | '1x2-side-pip' | '1x1-side-pip' | '1x2-side-pip-new' | '1x1-side-pip-white' | 'vertical-white' | 'vertical-blue' | 'top-curve-right' | 'top-left-curve' | 'top' | 'back-side' | 'back-side-right-column' | 'right-side-column' | 'back-completed' | 'back-side-step1' | 'back-side-step1-front' | 'circle' | '4x1-back-white' | '1x2-back-white' | '1x1-back-white' | 'left-side-z0' | 'left-side-z2' | 'back-side-last-scene';
  left: string;
  top: string;
  width: string;
  height: string;
  zIndex: number;
  fadeRight?: boolean; // Optional: for fading out the right side
}

export interface InstructionConfig {
  stepNumber: number;
  staticBricks: StaticBrickConfig[]; // Bricks from previous steps that are already built
  bricks: BrickConfig[]; // New bricks that animate in
  placeholders: PlaceholderConfig[];
}

export const instructionConfigs: Record<number, InstructionConfig> = {
  // Step 1 (index 2) - Two 4x1 bricks (foundation)
  // Based on Figma design: https://www.figma.com/design/lLpX6OSZHOGKcHxsuOnJQ3/EOY_LegoAssets?node-id=192-17434
  2: {
    stepNumber: 1,
    staticBricks: [], // First step, no previous bricks
    bricks: [
      // Left 4x1 brick - drops from above (back)
      {
        id: 'brick-1',
        type: '4x1',
        left: '340px',
        top: '-100px',
        finalTop: '478px', // Lands on top of placeholder
        width: '120px',
        height: '78.454px',
        animationDelay: '0s',
        zIndex: 1,
      },
      // Right 4x1 brick - drops from above (front)
      {
        id: 'brick-2',
        type: '4x1',
        left: '434px',
        top: '-100px',
        finalTop: '528px', // Lands on top of placeholder
        width: '120px',
        height: '78.454px',
        animationDelay: '0.3s',
        zIndex: 2,
      },
    ],
    placeholders: [
      {
        left: '340px',
        top: '478px',
        width: '118px',
        height: '78.5px',
      },
      {
        left: '434px',
        top: '528px',
        width: '120px',
        height: '78.454px',
        animationDelay: '0.3s',
      },
    ],
  },
  // Step 2 (index 3) - Two 4x2 bricks on top of 4x1 foundation
  // Based on Figma design: https://www.figma.com/design/lLpX6OSZHOGKcHxsuOnJQ3/EOY_LegoAssets?node-id=192-17434
  3: {
    stepNumber: 2,
    staticBricks: [
      // Bricks from step 1 - the 4x1 foundation bricks
      {
        type: '4x1',
        left: '340px',
        top: '478px', // From Step 1 finalTop
        width: '120px',
        height: '78.454px',
        zIndex: 1,
      },
      {
        type: '4x1',
        left: '434px',
        top: '528px', // From Step 1 finalTop
        width: '120px',
        height: '78.454px',
        zIndex: 2,
      },
    ],
    bricks: [
      // Left 4x2 brick - drops from above, on top of left 4x1 (back)
      {
        id: 'brick-1',
        type: '4x2',
        left: '340px',
        top: '-100px',
        finalTop: '436px', // Lands on top of 4x1
        width: '120px',
        height: '113px',
        animationDelay: '0s',
        zIndex: 3,
      },
      // Right 4x2 brick - drops from above, on top of right 4x1 (front brick)
      {
        id: 'brick-2',
        type: '4x2',
        left: '434px',
        top: '-100px',
        finalTop: '486px', // Lands on top of 4x1
        width: '120px',
        height: '113px',
        animationDelay: '0.3s',
        zIndex: 4,
      },
    ],
    placeholders: [
      {
        left: '340px',
        top: '436px',
        width: '120px',
        height: '113px',
      },
      {
        left: '434px',
        top: '486px',
        width: '120px',
        height: '113px',
        animationDelay: '0.3s',
      },
    ],
  },
  // Step 3 (index 4) - Two 4x1 bricks on top of 4x2 bricks
  // Based on Figma design: https://www.figma.com/design/lLpX6OSZHOGKcHxsuOnJQ3/EOY_LegoAssets?node-id=193-17824
  4: {
    stepNumber: 3,
    staticBricks: [
      // Bricks from step 1 (4x1 foundation)
      {
        type: '4x1',
        left: '340px',
        top: '478px', // From Step 1 finalTop
        width: '120px',
        height: '78.454px',
        zIndex: 1,
      },
      {
        type: '4x1',
        left: '434px',
        top: '528px', // From Step 1 finalTop
        width: '120px',
        height: '78.454px',
        zIndex: 2,
      },
      // Bricks from step 2 (4x2 bricks on top)
      {
        type: '4x2',
        left: '340px',
        top: '436px', // From Step 2 finalTop
        width: '120px',
        height: '113px',
        zIndex: 3,
      },
      {
        type: '4x2',
        left: '434px',
        top: '486px', // From Step 2 finalTop
        width: '120px',
        height: '113px',
        zIndex: 4,
      },
    ],
    bricks: [
      // New 4x1 brick on left - drops from above, on top of left 4x2 (back)
      {
        id: 'brick-1',
        type: '4x1',
        left: '340px',
        top: '-100px',
        finalTop: '421px',
        width: '120px',
        height: '80.5px',
        animationDelay: '0s',
        zIndex: 5,
      },
      // New 4x1 brick on right - drops from above, on top of right 4x2 (front)
      {
        id: 'brick-2',
        type: '4x1',
        left: '434px',
        top: '-100px',
        finalTop: '471px',
        width: '120px',
        height: '80.5px',
        animationDelay: '0.3s',
        zIndex: 6,
      },
    ],
    placeholders: [
      {
        left: '340px',
        top: '421px',
        width: '120px',
        height: '80.5px',
      },
      {
        left: '434px',
        top: '471px',
        width: '120px',
        height: '80.5px',
        animationDelay: '0.3s',
      },
    ],
  },
  // Step 4 (index 5) - One 8x2 brick and one 2x2 brick
  // Based on Figma design: https://www.figma.com/design/lLpX6OSZHOGKcHxsuOnJQ3/EOY_LegoAssets?node-id=193-17523
  5: {
    stepNumber: 4,
    staticBricks: [
      // All bricks from steps 1-3
      { type: '4x1', left: '340px', top: '478px', width: '120px', height: '78.454px', zIndex: 1 },
      { type: '4x1', left: '434px', top: '528px', width: '120px', height: '78.454px', zIndex: 1 },
      { type: '4x2', left: '340px', top: '436px', width: '120px', height: '113px', zIndex: 2 },
      { type: '4x2', left: '434px', top: '486px', width: '120px', height: '113px', zIndex: 3 },
      { type: '4x1', left: '340px', top: '421px', width: '120px', height: '80.5px', zIndex: 4 },
      { type: '4x1', left: '434px', top: '471px', width: '120px', height: '80.5px', zIndex: 5 },
    ],
    bricks: [
      // New 8x2 brick on left - drops from above (behind 2x2)
      {
        id: 'brick-1',
        type: '8x2',
        left: '340px',
        top: '-100px',
        finalTop: '376px',
        width: '180px',
        height: '142px',
        animationDelay: '0s',
        zIndex: 5,
      },
      // New 2x2 brick on right - drops from above (in front)
      {
        id: 'brick-2',
        type: '2x2',
        left: '464px',
        top: '-100px',
        finalTop: '445px',
        width: '90px',
        height: '97px',
        animationDelay: '0.3s',
        zIndex: 6,
      },
    ],
    placeholders: [
      {
        left: '340px',
        top: '376px',
        width: '180px',
        height: '142px',
      },
      {
        left: '464px',
        top: '445px',
        width: '90px',
        height: '97px',
        animationDelay: '0.3s',
      },
    ],
  },
  // Step 5 (index 6) - Three bricks: 4x1, 2x1, 4x1
  // Based on Figma design: https://www.figma.com/design/lLpX6OSZHOGKcHxsuOnJQ3/EOY_LegoAssets?node-id=193-17674
  6: {
    stepNumber: 5,
    staticBricks: [
      // All bricks from steps 1-4
      { type: '4x1', left: '340px', top: '478px', width: '120px', height: '78.454px', zIndex: 1 },
      { type: '4x1', left: '434px', top: '528px', width: '120px', height: '78.454px', zIndex: 1 },
      { type: '4x2', left: '340px', top: '436px', width: '120px', height: '113px', zIndex: 2 },
      { type: '4x2', left: '434px', top: '486px', width: '120px', height: '113px', zIndex: 3 },
      { type: '4x1', left: '340px', top: '421px', width: '120px', height: '80.5px', zIndex: 4 },
      { type: '4x1', left: '434px', top: '471px', width: '120px', height: '80.5px', zIndex: 5 },
      { type: '8x2', left: '340px', top: '376px', width: '180px', height: '142px', zIndex: 5 },
      { type: '2x2', left: '464px', top: '445px', width: '90px', height: '97px', zIndex: 6 },
    ],
    bricks: [
      // New 4x1 brick on left - drops from above, on top of 8x2 (back)
      {
        id: 'brick-1',
        type: '4x1',
        left: '340px',
        top: '-100px',
        finalTop: '363px',
        width: '120px',
        height: '80.5px',
        animationDelay: '0s',
        zIndex: 7,
      },
      // New 2x1 brick in middle - drops from above (middle)
      {
        id: 'brick-2',
        type: '2x1',
        left: '402px',
        top: '-100px',
        finalTop: '397px',
        width: '90px',
        height: '61px',
        animationDelay: '0.3s',
        zIndex: 8,
      },
      // New 4x1 brick on right - drops from above (front)
      {
        id: 'brick-3',
        type: '4x1',
        left: '435px',
        top: '-100px',
        finalTop: '413px',
        width: '120px',
        height: '80.5px',
        animationDelay: '0.6s',
        zIndex: 9,
      },
    ],
    placeholders: [
      {
        left: '340px',
        top: '363px',
        width: '120px',
        height: '80.5px',
      },
      {
        left: '402px',
        top: '397px',
        width: '90px',
        height: '61px',
        animationDelay: '0.3s',
      },
      {
        left: '435px',
        top: '413px',
        width: '120px',
        height: '80.5px',
        animationDelay: '0.6s',
      },
    ],
  },
  // Step 6 (index 7) - Two 2x1 bricks
  // Based on Figma design: https://www.figma.com/design/lLpX6OSZHOGKcHxsuOnJQ3/EOY_LegoAssets?node-id=193-17979
  7: {
    stepNumber: 6,
    staticBricks: [
      // All bricks from steps 1-5
      { type: '4x1', left: '340px', top: '478px', width: '120px', height: '78.454px', zIndex: 1 },
      { type: '4x1', left: '434px', top: '528px', width: '120px', height: '78.454px', zIndex: 1 },
      { type: '4x2', left: '340px', top: '436px', width: '120px', height: '113px', zIndex: 2 },
      { type: '4x2', left: '434px', top: '486px', width: '120px', height: '113px', zIndex: 3 },
      { type: '4x1', left: '340px', top: '421px', width: '120px', height: '80.5px', zIndex: 4 },
      { type: '4x1', left: '434px', top: '471px', width: '120px', height: '80.5px', zIndex: 5 },
      { type: '8x2', left: '340px', top: '376px', width: '180px', height: '142px', zIndex: 5 },
      { type: '2x2', left: '464px', top: '445px', width: '90px', height: '97px', zIndex: 6 },
      { type: '4x1', left: '340px', top: '363px', width: '120px', height: '80.5px', zIndex: 7 },
      { type: '2x1', left: '402px', top: '397px', width: '90px', height: '61px', zIndex: 8 },
      { type: '4x1', left: '435px', top: '413px', width: '120px', height: '80.5px', zIndex: 9 },
    ],
    bricks: [
      // New 2x1 brick on left - drops from above
      {
        id: 'brick-1',
        type: '2x1',
        left: '341px',
        top: '-100px',
        finalTop: '348px',
        width: '90px',
        height: '61px',
        animationDelay: '0s',
        zIndex: 10,
      },
      // New 2x1 brick on right - drops from above
      {
        id: 'brick-2',
        type: '2x1',
        left: '465px',
        top: '-100px',
        finalTop: '415px',
        width: '90px',
        height: '61px',
        animationDelay: '0.3s',
        zIndex: 11,
      },
    ],
    placeholders: [
      {
        left: '341px',
        top: '348px',
        width: '90px',
        height: '61px',
      },
      {
        left: '465px',
        top: '415px',
        width: '90px',
        height: '61px',
        animationDelay: '0.3s',
      },
    ],
  },
  // Step 7 (index 8) - Three 3x1 bricks (white, blue, flat)
  // Based on Figma design: https://www.figma.com/design/lLpX6OSZHOGKcHxsuOnJQ3/EOY_LegoAssets?node-id=193-18206
  8: {
    stepNumber: 7,
    staticBricks: [
      // All bricks from steps 1-6
      { type: '4x1', left: '340px', top: '478px', width: '120px', height: '78.454px', zIndex: 1 },
      { type: '4x1', left: '434px', top: '528px', width: '120px', height: '78.454px', zIndex: 1 },
      { type: '4x2', left: '340px', top: '436px', width: '120px', height: '113px', zIndex: 2 },
      { type: '4x2', left: '434px', top: '486px', width: '120px', height: '113px', zIndex: 3 },
      { type: '4x1', left: '340px', top: '421px', width: '120px', height: '80.5px', zIndex: 4 },
      { type: '4x1', left: '434px', top: '471px', width: '120px', height: '80.5px', zIndex: 5 },
      { type: '8x2', left: '340px', top: '376px', width: '180px', height: '142px', zIndex: 5 },
      { type: '2x2', left: '464px', top: '445px', width: '90px', height: '97px', zIndex: 6 },
      { type: '4x1', left: '340px', top: '363px', width: '120px', height: '80.5px', zIndex: 7 },
      { type: '2x1', left: '402px', top: '397px', width: '90px', height: '61px', zIndex: 8 },
      { type: '4x1', left: '435px', top: '413px', width: '120px', height: '80.5px', zIndex: 9 },
      { type: '2x1', left: '341px', top: '348px', width: '90px', height: '61px', zIndex: 10 },
      { type: '2x1', left: '465px', top: '415px', width: '90px', height: '61px', zIndex: 15 },
    ],
    bricks: [
      // New 3x1 brick (blue) - drops from above first (bottom layer)
      {
        id: 'brick-1',
        type: '3x1',
        left: '372px',
        top: '-100px',
        finalTop: '363px',
        width: '120px',
        height: '96px',
        animationDelay: '0s',
        zIndex: 12,
      },
      // New 3x1 White brick - drops from above second (middle layer)
      {
        id: 'brick-2',
        type: '3x1-white',
        left: '374px',
        top: '-100px',
        finalTop: '348px',
        width: '120px',
        height: '96px',
        animationDelay: '0.3s',
        zIndex: 13,
      },
      // New 3x1 Flat brick - drops from above last (top layer)
      {
        id: 'brick-3',
        type: '3x1-flat',
        left: '375px',
        top: '-100px',
        finalTop: '333px',
        width: '120px',
        height: '96px',
        animationDelay: '0.6s',
        zIndex: 14,
      },
    ],
    placeholders: [
      {
        left: '372px',
        top: '363px',
        width: '120px',
        height: '96px',
      },
      {
        left: '374px',
        top: '348px',
        width: '120px',
        height: '96px',
        animationDelay: '0.3s',
      },
      {
        left: '375px',
        top: '333px',
        width: '120px',
        height: '96px',
        animationDelay: '0.6s',
      },
    ],
  },
  // Step 8 (index 9) - Two 2x2 bricks
  // Based on Figma design: https://www.figma.com/design/lLpX6OSZHOGKcHxsuOnJQ3/EOY_LegoAssets?node-id=193-18469
  9: {
    stepNumber: 8,
    staticBricks: [
      // All bricks from steps 1-8
      { type: '4x1', left: '340px', top: '478px', width: '120px', height: '78.454px', zIndex: 2 },
      { type: '4x1', left: '434px', top: '528px', width: '120px', height: '78.454px', zIndex: 1 },
      { type: '4x2', left: '340px', top: '436px', width: '120px', height: '113px', zIndex: 2 },
      { type: '4x2', left: '434px', top: '486px', width: '120px', height: '113px', zIndex: 3 },
      { type: '4x1', left: '340px', top: '421px', width: '120px', height: '80.5px', zIndex: 4 },
      { type: '4x1', left: '434px', top: '471px', width: '120px', height: '80.5px', zIndex: 5 },
      { type: '8x2', left: '340px', top: '376px', width: '180px', height: '142px', zIndex: 5 },
      { type: '2x2', left: '464px', top: '445px', width: '90px', height: '97px', zIndex: 6 },
      { type: '4x1', left: '340px', top: '363px', width: '120px', height: '80.5px', zIndex: 7 },
      { type: '2x1', left: '402px', top: '397px', width: '90px', height: '61px', zIndex: 8 },
      { type: '4x1', left: '435px', top: '413px', width: '120px', height: '80.5px', zIndex: 9 },
      { type: '2x1', left: '341px', top: '348px', width: '90px', height: '61px', zIndex: 10 },
      { type: '2x1', left: '465px', top: '415px', width: '90px', height: '61px', zIndex: 15 },
      { type: '3x1', left: '372px', top: '363px', width: '120px', height: '96px', zIndex: 12 },
      { type: '3x1-white', left: '374px', top: '348px', width: '120px', height: '96px', zIndex: 13 },
      { type: '3x1-flat', left: '375px', top: '333px', width: '120px', height: '96px', zIndex: 14 },
    ],
    bricks: [
      // New 2x2 brick - drops from above on left side
      {
        id: 'brick-1',
        type: '2x2',
        left: '341px',
        top: '-100px',
        finalTop: '305px',
        width: '90px',
        height: '97px',
        animationDelay: '0s',
        zIndex: 11,
      },
      // New 2x2 brick - drops from above on right side
      {
        id: 'brick-2',
        type: '2x2',
        left: '466px',
        top: '-100px',
        finalTop: '372px',
        width: '90px',
        height: '97px',
        animationDelay: '0.3s',
        zIndex: 16,
      },
    ],
    placeholders: [
      {
        left: '341px',
        top: '305px',
        width: '90px',
        height: '97px',
      },
      {
        left: '466px',
        top: '372px',
        width: '90px',
        height: '97px',
        animationDelay: '0.3s',
      },
    ],
  },
  // Step 9 (index 10) - Two 2x1 bricks on top
  // Based on Figma design: https://www.figma.com/design/lLpX6OSZHOGKcHxsuOnJQ3/EOY_LegoAssets?node-id=193-18756
  10: {
    stepNumber: 9,
    staticBricks: [
      // All bricks from steps 1-9 (exactly matching step 9)
      { type: '4x1', left: '340px', top: '478px', width: '120px', height: '78.454px', zIndex: 2 },
      { type: '4x1', left: '434px', top: '528px', width: '120px', height: '78.454px', zIndex: 1 },
      { type: '4x2', left: '340px', top: '436px', width: '120px', height: '113px', zIndex: 2 },
      { type: '4x2', left: '434px', top: '486px', width: '120px', height: '113px', zIndex: 3 },
      { type: '4x1', left: '340px', top: '421px', width: '120px', height: '80.5px', zIndex: 4 },
      { type: '4x1', left: '434px', top: '471px', width: '120px', height: '80.5px', zIndex: 5 },
      { type: '8x2', left: '340px', top: '376px', width: '180px', height: '142px', zIndex: 5 },
      { type: '2x2', left: '464px', top: '445px', width: '90px', height: '97px', zIndex: 6 },
      { type: '4x1', left: '340px', top: '363px', width: '120px', height: '80.5px', zIndex: 7 },
      { type: '2x1', left: '402px', top: '397px', width: '90px', height: '61px', zIndex: 8 },
      { type: '4x1', left: '435px', top: '413px', width: '120px', height: '80.5px', zIndex: 9 },
      { type: '2x1', left: '341px', top: '348px', width: '90px', height: '61px', zIndex: 10 },
      { type: '2x1', left: '465px', top: '415px', width: '90px', height: '61px', zIndex: 15 },
      { type: '3x1', left: '372px', top: '363px', width: '120px', height: '96px', zIndex: 12 },
      { type: '3x1-white', left: '374px', top: '348px', width: '120px', height: '96px', zIndex: 13 },
      { type: '3x1-flat', left: '375px', top: '333px', width: '120px', height: '96px', zIndex: 14 },
      { type: '2x2', left: '341px', top: '305px', width: '90px', height: '97px', zIndex: 11 },
      { type: '2x2', left: '466px', top: '372px', width: '90px', height: '97px', zIndex: 16 },
    ],
    bricks: [
      // New 2x1 brick - drops from above on left
      {
        id: 'brick-1',
        type: '2x1',
        left: '342px',
        top: '-100px',
        finalTop: '290px',
        width: '90px',
        height: '61px',
        animationDelay: '0s',
        zIndex: 17,
      },
      // New 2x1 brick - drops from above on right
      {
        id: 'brick-2',
        type: '2x1',
        left: '466px',
        top: '-100px',
        finalTop: '357px',
        width: '90px',
        height: '61px',
        animationDelay: '0.3s',
        zIndex: 18,
      },
    ],
    placeholders: [
      {
        left: '342px',
        top: '290px',
        width: '90px',
        height: '61px',
      },
      {
        left: '466px',
        top: '357px',
        width: '90px',
        height: '61px',
      },
    ],
  },
  // Step 10 (index 11) - Two 1x2 bricks on top
  // Based on Figma design: https://www.figma.com/design/lLpX6OSZHOGKcHxsuOnJQ3/EOY_LegoAssets?node-id=193-19067
  11: {
    stepNumber: 10,
    staticBricks: [
      // All bricks from steps 1-10 (exactly matching step 10 plus its new bricks)
      { type: '4x1', left: '340px', top: '478px', width: '120px', height: '78.454px', zIndex: 2 },
      { type: '4x1', left: '434px', top: '528px', width: '120px', height: '78.454px', zIndex: 1 },
      { type: '4x2', left: '340px', top: '436px', width: '120px', height: '113px', zIndex: 2 },
      { type: '4x2', left: '434px', top: '486px', width: '120px', height: '113px', zIndex: 3 },
      { type: '4x1', left: '340px', top: '421px', width: '120px', height: '80.5px', zIndex: 4 },
      { type: '4x1', left: '434px', top: '471px', width: '120px', height: '80.5px', zIndex: 5 },
      { type: '8x2', left: '340px', top: '376px', width: '180px', height: '142px', zIndex: 5 },
      { type: '2x2', left: '464px', top: '445px', width: '90px', height: '97px', zIndex: 6 },
      { type: '4x1', left: '340px', top: '363px', width: '120px', height: '80.5px', zIndex: 7 },
      { type: '2x1', left: '402px', top: '397px', width: '90px', height: '61px', zIndex: 8 },
      { type: '4x1', left: '435px', top: '413px', width: '120px', height: '80.5px', zIndex: 9 },
      { type: '2x1', left: '341px', top: '348px', width: '90px', height: '61px', zIndex: 10 },
      { type: '2x1', left: '465px', top: '415px', width: '90px', height: '61px', zIndex: 15 },
      { type: '3x1', left: '372px', top: '363px', width: '120px', height: '96px', zIndex: 12 },
      { type: '3x1-white', left: '374px', top: '348px', width: '120px', height: '96px', zIndex: 13 },
      { type: '3x1-flat', left: '375px', top: '333px', width: '120px', height: '96px', zIndex: 14 },
      { type: '2x2', left: '341px', top: '305px', width: '90px', height: '97px', zIndex: 11 },
      { type: '2x2', left: '466px', top: '372px', width: '90px', height: '97px', zIndex: 16 },
      { type: '2x1', left: '342px', top: '290px', width: '90px', height: '61px', zIndex: 17 },
      { type: '2x1', left: '466px', top: '357px', width: '90px', height: '61px', zIndex: 18 },
    ],
    bricks: [
      // New 1x2 brick - drops from above on left
      {
        id: 'brick-1',
        type: '1x2',
        left: '371px',
        top: '-100px',
        finalTop: '247px',
        width: '60px',
        height: '81px',
        animationDelay: '0s',
        zIndex: 19,
      },
      // New 1x2 brick - drops from above on right
      {
        id: 'brick-2',
        type: '1x2',
        left: '496px',
        top: '-100px',
        finalTop: '314px',
        width: '60px',
        height: '81px',
        animationDelay: '0.3s',
        zIndex: 32,
      },
    ],
    placeholders: [
      {
        left: '371px',
        top: '247px',
        width: '60px',
        height: '81px',
      },
      {
        left: '496px',
        top: '314px',
        width: '60px',
        height: '81px',
      },
    ],
  },
  // Step 11 (index 12) - Four bricks with gap-closing animation (1x2 Side Pip + 3 vertical bricks)
  // Based on Figma design: https://www.figma.com/design/lLpX6OSZHOGKcHxsuOnJQ3/EOY_LegoAssets?node-id=193-19394
  12: {
    stepNumber: 11,
    staticBricks: [
      // All bricks from steps 1-11
      { type: '4x1', left: '340px', top: '478px', width: '120px', height: '78.454px', zIndex: 2 },
      { type: '4x1', left: '434px', top: '528px', width: '120px', height: '78.454px', zIndex: 1 },
      { type: '4x2', left: '340px', top: '436px', width: '120px', height: '113px', zIndex: 2 },
      { type: '4x2', left: '434px', top: '486px', width: '120px', height: '113px', zIndex: 3 },
      { type: '4x1', left: '340px', top: '421px', width: '120px', height: '80.5px', zIndex: 4 },
      { type: '4x1', left: '434px', top: '471px', width: '120px', height: '80.5px', zIndex: 5 },
      { type: '8x2', left: '340px', top: '376px', width: '180px', height: '142px', zIndex: 5 },
      { type: '2x2', left: '464px', top: '445px', width: '90px', height: '97px', zIndex: 6 },
      { type: '4x1', left: '340px', top: '363px', width: '120px', height: '80.5px', zIndex: 7 },
      { type: '2x1', left: '402px', top: '397px', width: '90px', height: '61px', zIndex: 8 },
      { type: '4x1', left: '435px', top: '413px', width: '120px', height: '80.5px', zIndex: 9 },
      { type: '2x1', left: '341px', top: '348px', width: '90px', height: '61px', zIndex: 10 },
      { type: '2x1', left: '465px', top: '415px', width: '90px', height: '61px', zIndex: 15 },
      { type: '3x1', left: '372px', top: '363px', width: '120px', height: '96px', zIndex: 12 },
      { type: '3x1-white', left: '374px', top: '348px', width: '120px', height: '96px', zIndex: 13 },
      { type: '3x1-flat', left: '375px', top: '333px', width: '120px', height: '96px', zIndex: 14 },
      { type: '2x2', left: '341px', top: '305px', width: '90px', height: '97px', zIndex: 11 },
      { type: '2x2', left: '466px', top: '372px', width: '90px', height: '97px', zIndex: 16 },
      { type: '2x1', left: '342px', top: '290px', width: '90px', height: '61px', zIndex: 17 },
      { type: '2x1', left: '466px', top: '357px', width: '90px', height: '61px', zIndex: 18 },
      { type: '1x2', left: '371px', top: '247px', width: '60px', height: '81px', zIndex: 19 },
      { type: '1x2', left: '496px', top: '314px', width: '60px', height: '81px', zIndex: 20 },
    ],
    bricks: [
      // New bricks with gap-closing animation - they compress together
      // 1x2 Side Pip - stays in place (leftmost)
      {
        id: 'brick-1',
        type: '1x2-side-pip',
        left: '341px', // Final position - no movement needed
        finalLeft: '341px', // Stays in place
        top: '-100px',
        finalTop: '263px',
        width: '60px',
        height: '81px',
        animationDelay: '0s',
        zIndex: 21,
      },
      // Vertical White brick 1 - starts 40px to the right, moves left
      {
        id: 'brick-2',
        type: 'vertical-white',
        left: '412px', // Start position (40px gap from brick 1)
        finalLeft: '372px', // Moves LEFT to close gap
        top: '-100px',
        finalTop: '270px',
        width: '46px',
        height: '100px',
        animationDelay: '0.3s',
        zIndex: 22,
      },
      // Vertical White brick 2 - starts 54px to the right, moves left
      {
        id: 'brick-3',
        type: 'vertical-white',
        left: '440px', // Start position (more gap)
        finalLeft: '386px', // Moves LEFT to close gap
        top: '-100px',
        finalTop: '278px',
        width: '46px',
        height: '100px',
        animationDelay: '0.6s',
        zIndex: 23,
      },
      // Vertical Blue brick - starts 68px to the right, moves left most
      {
        id: 'brick-4',
        type: 'vertical-blue',
        left: '467px', // Start position (biggest gap)
        finalLeft: '399px', // Moves LEFT most to close gap
        top: '-100px',
        finalTop: '285px',
        width: '46px',
        height: '100px',
        animationDelay: '0.9s',
        zIndex: 24,
      },
    ],
    placeholders: [],
  },
  // Step 12 (index 13) - Four bricks with gap-closing animation on right side (Vertical Blue + 2 Vertical White + 1x2)
  // Based on Figma design: https://www.figma.com/design/lLpX6OSZHOGKcHxsuOnJQ3/EOY_LegoAssets?node-id=193-19767
  13: {
    stepNumber: 12,
    staticBricks: [
      // All bricks from steps 1-12
      { type: '4x1', left: '340px', top: '478px', width: '120px', height: '78.454px', zIndex: 2 },
      { type: '4x1', left: '434px', top: '528px', width: '120px', height: '78.454px', zIndex: 1 },
      { type: '4x2', left: '340px', top: '436px', width: '120px', height: '113px', zIndex: 2 },
      { type: '4x2', left: '434px', top: '486px', width: '120px', height: '113px', zIndex: 3 },
      { type: '4x1', left: '340px', top: '421px', width: '120px', height: '80.5px', zIndex: 4 },
      { type: '4x1', left: '434px', top: '471px', width: '120px', height: '80.5px', zIndex: 5 },
      { type: '8x2', left: '340px', top: '376px', width: '180px', height: '142px', zIndex: 5 },
      { type: '2x2', left: '464px', top: '445px', width: '90px', height: '97px', zIndex: 6 },
      { type: '4x1', left: '340px', top: '363px', width: '120px', height: '80.5px', zIndex: 7 },
      { type: '2x1', left: '402px', top: '397px', width: '90px', height: '61px', zIndex: 8 },
      { type: '4x1', left: '435px', top: '413px', width: '120px', height: '80.5px', zIndex: 9 },
      { type: '2x1', left: '341px', top: '348px', width: '90px', height: '61px', zIndex: 10 },
      { type: '2x1', left: '465px', top: '415px', width: '90px', height: '61px', zIndex: 15 },
      { type: '3x1', left: '372px', top: '363px', width: '120px', height: '96px', zIndex: 12 },
      { type: '3x1-white', left: '374px', top: '348px', width: '120px', height: '96px', zIndex: 13 },
      { type: '3x1-flat', left: '375px', top: '333px', width: '120px', height: '96px', zIndex: 14 },
      { type: '2x2', left: '341px', top: '305px', width: '90px', height: '97px', zIndex: 11 },
      { type: '2x2', left: '466px', top: '372px', width: '90px', height: '97px', zIndex: 33 },
      { type: '2x1', left: '342px', top: '290px', width: '90px', height: '61px', zIndex: 17 },
      { type: '2x1', left: '466px', top: '357px', width: '90px', height: '61px', zIndex: 34 },
      { type: '1x2', left: '371px', top: '247px', width: '60px', height: '81px', zIndex: 19 },
      { type: '1x2', left: '496px', top: '314px', width: '60px', height: '81px', zIndex: 35 },
      // Step 12 bricks now static (in their final positions after compression)
      { type: '1x2-side-pip', left: '341px', top: '263px', width: '60px', height: '81px', zIndex: 21 },
      { type: 'vertical-white', left: '372px', top: '270px', width: '46px', height: '100px', zIndex: 22 },
      { type: 'vertical-white', left: '386px', top: '278px', width: '46px', height: '100px', zIndex: 23 },
      { type: 'vertical-blue', left: '399px', top: '285px', width: '46px', height: '100px', zIndex: 24 },
    ],
    bricks: [
      // New bricks with gap-closing animation - they compress together from left to right
      // Vertical Blue - starts 68px to the left, moves right most
      {
        id: 'brick-1',
        type: 'vertical-blue',
        left: '358px', // Start position (68px left of final)
        finalLeft: '426px', // Moves RIGHT to close gap
        top: '-100px',
        finalTop: '303px',
        width: '46px',
        height: '100px',
        animationDelay: '0s',
        zIndex: 31,
      },
      // Vertical White brick 1 - starts 54px to the left, moves right
      {
        id: 'brick-2',
        type: 'vertical-white',
        left: '386px', // Start position (54px left of final)
        finalLeft: '440px', // Moves RIGHT to close gap
        top: '-100px',
        finalTop: '310px',
        width: '46px',
        height: '100px',
        animationDelay: '0.3s',
        zIndex: 31,
      },
      // Vertical White brick 2 - starts 40px to the left, moves right
      {
        id: 'brick-3',
        type: 'vertical-white',
        left: '412px', // Start position (40px left of final)
        finalLeft: '452px', // Moves RIGHT to close gap
        top: '-100px',
        finalTop: '317px',
        width: '46px',
        height: '100px',
        animationDelay: '0.6s',
        zIndex: 31,
      },
      // 1x2 brick - stays in place (rightmost anchor)
      {
        id: 'brick-4',
        type: '1x2',
        left: '466px', // Final position - no movement needed
        finalLeft: '466px', // Stays in place
        top: '-100px',
        finalTop: '330px',
        width: '60px',
        height: '81px',
        animationDelay: '0.9s',
        zIndex: 36,
      },
    ],
    placeholders: [],
  },
  // Step 13 (index 14) - Two 6x1 bricks and four curved top pieces (2x TopCurveRight + 2x TopLeftCurve)
  // Based on Figma design: https://www.figma.com/design/lLpX6OSZHOGKcHxsuOnJQ3/EOY_LegoAssets?node-id=194-20187
  14: {
    stepNumber: 13,
    staticBricks: [
      // All bricks from steps 1-13
      { type: '4x1', left: '340px', top: '478px', width: '120px', height: '78.454px', zIndex: 2 },
      { type: '4x1', left: '434px', top: '528px', width: '120px', height: '78.454px', zIndex: 1 },
      { type: '4x2', left: '340px', top: '436px', width: '120px', height: '113px', zIndex: 2 },
      { type: '4x2', left: '434px', top: '486px', width: '120px', height: '113px', zIndex: 3 },
      { type: '4x1', left: '340px', top: '421px', width: '120px', height: '80.5px', zIndex: 4 },
      { type: '4x1', left: '434px', top: '471px', width: '120px', height: '80.5px', zIndex: 5 },
      { type: '8x2', left: '340px', top: '376px', width: '180px', height: '142px', zIndex: 5 },
      { type: '2x2', left: '464px', top: '445px', width: '90px', height: '97px', zIndex: 6 },
      { type: '4x1', left: '340px', top: '363px', width: '120px', height: '80.5px', zIndex: 7 },
      { type: '2x1', left: '402px', top: '397px', width: '90px', height: '61px', zIndex: 8 },
      { type: '4x1', left: '435px', top: '413px', width: '120px', height: '80.5px', zIndex: 9 },
      { type: '2x1', left: '341px', top: '348px', width: '90px', height: '61px', zIndex: 10 },
      { type: '2x1', left: '465px', top: '415px', width: '90px', height: '61px', zIndex: 15 },
      { type: '3x1', left: '372px', top: '363px', width: '120px', height: '96px', zIndex: 12 },
      { type: '3x1-white', left: '374px', top: '348px', width: '120px', height: '96px', zIndex: 13 },
      { type: '3x1-flat', left: '375px', top: '333px', width: '120px', height: '96px', zIndex: 14 },
      { type: '2x2', left: '341px', top: '305px', width: '90px', height: '97px', zIndex: 11 },
      { type: '2x2', left: '466px', top: '372px', width: '90px', height: '97px', zIndex: 33 },
      { type: '2x1', left: '342px', top: '290px', width: '90px', height: '61px', zIndex: 17 },
      { type: '2x1', left: '466px', top: '357px', width: '90px', height: '61px', zIndex: 34 },
      { type: '1x2', left: '371px', top: '247px', width: '60px', height: '81px', zIndex: 19 },
      { type: '1x2', left: '496px', top: '314px', width: '60px', height: '81px', zIndex: 35 },
      // Step 12 bricks now static (in their final positions after compression)
      { type: '1x2-side-pip', left: '341px', top: '263px', width: '60px', height: '81px', zIndex: 21 },
      { type: 'vertical-white', left: '372px', top: '270px', width: '46px', height: '100px', zIndex: 22 },
      { type: 'vertical-white', left: '386px', top: '278px', width: '46px', height: '100px', zIndex: 23 },
      { type: 'vertical-blue', left: '399px', top: '285px', width: '46px', height: '100px', zIndex: 24 },
      // Step 13 bricks now static (in their final positions after compression)
      { type: 'vertical-blue', left: '426px', top: '303px', width: '46px', height: '100px', zIndex: 31 },
      { type: 'vertical-white', left: '440px', top: '310px', width: '46px', height: '100px', zIndex: 31 },
      { type: 'vertical-white', left: '452px', top: '317px', width: '46px', height: '100px', zIndex: 31 },
      { type: '1x2', left: '466px', top: '330px', width: '60px', height: '81px', zIndex: 36 },
    ],
    bricks: [
      // Two 6x1 bricks - drops from above
      {
        id: 'brick-1',
        type: '6x1',
        left: '374px',
        finalLeft: '374px',
        top: '-100px',
        finalTop: '254px',
        width: '150px',
        height: '95px',
        animationDelay: '0s',
        zIndex: 37,
      },
      {
        id: 'brick-2',
        type: '6x1',
        left: '375px',
        finalLeft: '375px',
        top: '-100px',
        finalTop: '239px',
        width: '150px',
        height: '95px',
        animationDelay: '0.3s',
        zIndex: 38,
      },
      // Two TopCurveRight pieces - drops from above
      {
        id: 'brick-3',
        type: 'top-curve-right',
        left: '467px',
        finalLeft: '467px',
        top: '-100px',
        finalTop: '254px',
        width: '90px',
        height: '93px',
        animationDelay: '0.6s',
        zIndex: 43,
      },
      {
        id: 'brick-4',
        type: 'top-curve-right',
        left: '436px',
        finalLeft: '436px',
        top: '-100px',
        finalTop: '270px',
        width: '90px',
        height: '93px',
        animationDelay: '0.9s',
        zIndex: 44,
      },
      // Two TopLeftCurve pieces - drops from above
      {
        id: 'brick-5',
        type: 'top-left-curve',
        left: '372px',
        finalLeft: '372px',
        top: '-100px',
        finalTop: '203px',
        width: '95px',
        height: '78px',
        animationDelay: '1.2s',
        zIndex: 41,
      },
      {
        id: 'brick-6',
        type: 'top-left-curve',
        left: '343px',
        finalLeft: '343px',
        top: '-100px',
        finalTop: '219px',
        width: '95px',
        height: '78px',
        animationDelay: '1.5s',
        zIndex: 42,
      },
    ],
    placeholders: [],
  },
  // Step 14 (index 15) - 2x1 brick and large top piece to complete the build
  // Based on Figma design: https://www.figma.com/design/lLpX6OSZHOGKcHxsuOnJQ3/EOY_LegoAssets?node-id=194-20699
  15: {
    stepNumber: 14,
    staticBricks: [
      // All bricks from steps 1-14
      { type: '4x1', left: '340px', top: '478px', width: '120px', height: '78.454px', zIndex: 2 },
      { type: '4x1', left: '434px', top: '528px', width: '120px', height: '78.454px', zIndex: 1 },
      { type: '4x2', left: '340px', top: '436px', width: '120px', height: '113px', zIndex: 2 },
      { type: '4x2', left: '434px', top: '486px', width: '120px', height: '113px', zIndex: 3 },
      { type: '4x1', left: '340px', top: '421px', width: '120px', height: '80.5px', zIndex: 4 },
      { type: '4x1', left: '434px', top: '471px', width: '120px', height: '80.5px', zIndex: 5 },
      { type: '8x2', left: '340px', top: '376px', width: '180px', height: '142px', zIndex: 5 },
      { type: '2x2', left: '464px', top: '445px', width: '90px', height: '97px', zIndex: 6 },
      { type: '4x1', left: '340px', top: '363px', width: '120px', height: '80.5px', zIndex: 7 },
      { type: '2x1', left: '402px', top: '397px', width: '90px', height: '61px', zIndex: 8 },
      { type: '4x1', left: '435px', top: '413px', width: '120px', height: '80.5px', zIndex: 9 },
      { type: '2x1', left: '341px', top: '348px', width: '90px', height: '61px', zIndex: 10 },
      { type: '2x1', left: '465px', top: '415px', width: '90px', height: '61px', zIndex: 15 },
      { type: '3x1', left: '372px', top: '363px', width: '120px', height: '96px', zIndex: 12 },
      { type: '3x1-white', left: '374px', top: '348px', width: '120px', height: '96px', zIndex: 13 },
      { type: '3x1-flat', left: '375px', top: '333px', width: '120px', height: '96px', zIndex: 14 },
      { type: '2x2', left: '341px', top: '305px', width: '90px', height: '97px', zIndex: 11 },
      { type: '2x2', left: '466px', top: '372px', width: '90px', height: '97px', zIndex: 33 },
      { type: '2x1', left: '342px', top: '290px', width: '90px', height: '61px', zIndex: 17 },
      { type: '2x1', left: '466px', top: '357px', width: '90px', height: '61px', zIndex: 34 },
      { type: '1x2', left: '371px', top: '247px', width: '60px', height: '81px', zIndex: 19 },
      { type: '1x2', left: '496px', top: '314px', width: '60px', height: '81px', zIndex: 35 },
      // Step 12 bricks now static
      { type: '1x2-side-pip', left: '341px', top: '263px', width: '60px', height: '81px', zIndex: 21 },
      { type: 'vertical-white', left: '372px', top: '270px', width: '46px', height: '100px', zIndex: 22 },
      { type: 'vertical-white', left: '386px', top: '278px', width: '46px', height: '100px', zIndex: 23 },
      { type: 'vertical-blue', left: '399px', top: '285px', width: '46px', height: '100px', zIndex: 24 },
      // Step 13 bricks now static
      { type: 'vertical-blue', left: '426px', top: '303px', width: '46px', height: '100px', zIndex: 31 },
      { type: 'vertical-white', left: '440px', top: '310px', width: '46px', height: '100px', zIndex: 31 },
      { type: 'vertical-white', left: '452px', top: '317px', width: '46px', height: '100px', zIndex: 31 },
      { type: '1x2', left: '466px', top: '330px', width: '60px', height: '81px', zIndex: 36 },
      // Step 14 bricks now static
      { type: '6x1', left: '374px', top: '254px', width: '150px', height: '95px', zIndex: 37 },
      { type: '6x1', left: '375px', top: '239px', width: '150px', height: '95px', zIndex: 38 },
      { type: 'top-curve-right', left: '467px', top: '254px', width: '90px', height: '93px', zIndex: 44 },
      { type: 'top-curve-right', left: '436px', top: '270px', width: '90px', height: '93px', zIndex: 44 },
      { type: 'top-left-curve', left: '372px', top: '203px', width: '95px', height: '78px', zIndex: 41 },
      { type: 'top-left-curve', left: '343px', top: '219px', width: '95px', height: '78px', zIndex: 42 },
    ],
    bricks: [
      // 2x1 brick above the 6x1 bricks
      {
        id: 'brick-1',
        type: '2x1',
        left: '402px',
        finalLeft: '402px',
        top: '-100px',
        finalTop: '237px',
        width: '90px',
        height: '61px',
        animationDelay: '0s',
        zIndex: 43,
      },
      // Large top piece
      {
        id: 'brick-2',
        type: 'top',
        left: '370px',
        finalLeft: '370px',
        top: '-100px',
        finalTop: '162px',
        width: '164px',
        height: '95px',
        animationDelay: '0.5s',
        zIndex: 44,
      },
    ],
    placeholders: [],
  },
  // Step 15 (index 16) - Circle animated, BackSideStep1 static
  16: {
    stepNumber: 15,
    staticBricks: [
      { type: 'back-side-step1', left: '340px', top: '219px', width: '212px', height: '386px', zIndex: 1 },
    ],
    bricks: [
      {
        id: 'circle',
        type: 'circle',
        left: '260px',
        top: '110px',
        finalTop: '420px',
        width: '377px',
        height: '226px',
        animationDelay: '0s',
        zIndex: 0,
      },
    ],
    placeholders: [],
  },
  // Step 16 (index 17) - Left side layers with pips scale in
  17: {
    stepNumber: 16,
    staticBricks: [
      { type: 'left-side-z0', left: '340px', top: '219px', width: '212px', height: '386px', zIndex: 0 },
      { type: 'left-side-z2', left: '342px', top: '220px', width: '208px', height: '256px', zIndex: 2 },
    ],
    bricks: [
      // 1x2 Side Pip (left) - scale in at start, slide right to final
      {
        id: '1x2-side-pip-left',
        type: '1x2-side-pip-new',
        left: '300px',
        top: '320px',
        finalTop: '320px',
        finalLeft: '370px',
        width: '65px',
        height: '106px',
        animationDelay: '0s',
        zIndex: 1,
      },
      // 1x1 Side Pip (right) - scale in at start, slide right to final
      {
        id: '1x1-side-pip-right',
        type: '1x1-side-pip-white',
        left: '380px',
        top: '390px',
        finalTop: '390px',
        finalLeft: '430px',
        width: '65px',
        height: '70px',
        animationDelay: '0s',
        zIndex: 1,
      },
    ],
    placeholders: [],
  },
  // Step 17 (index 18) - Layered approach with white back bricks scale in
  18: {
    stepNumber: 17,
    staticBricks: [
      { type: 'left-side-z0', left: '340px', top: '219px', width: '212px', height: '386px', zIndex: 0 },
      { type: '1x2-side-pip-new', left: '370px', top: '320px', width: '65px', height: '106px', zIndex: 1 },
      { type: '1x1-side-pip-white', left: '430px', top: '390px', width: '65px', height: '70px', zIndex: 1 },
      { type: 'left-side-z2', left: '342px', top: '220px', width: '208px', height: '256px', zIndex: 2 },
    ],
    bricks: [
      // 4x1 Back White - scale in
      {
        id: '4x1-back-white',
        type: '4x1-back-white',
        left: '260px',
        top: '400px',
        finalTop: '390px',
        width: '71px',
        height: '101px',
        animationDelay: '0s',
        zIndex: 1,
      },
      // 1x2 Back White - scale in
      {
        id: '1x2-back-white',
        type: '1x2-back-white',
        left: '380px',
        top: '400px',
        finalTop: '400px',
        width: '43px',
        height: '88px',
        animationDelay: '0.2s',
        zIndex: 2,
      },
      // 1x1 Back White - scale in
      {
        id: '1x1-back-white',
        type: '1x1-back-white',
        left: '320px',
        top: '490px',
        finalTop: '390px',
        width: '64px',
        height: '115px',
        animationDelay: '0.4s',
        zIndex: 1,
      },
    ],
    placeholders: [],
  },
  // Step 19 (index 19) - Final scene with Doors
  19: {
    stepNumber: 19,
    staticBricks: [
      { type: 'back-side-last-scene', left: '340px', top: '219px', width: '212px', height: '386px', zIndex: 0 },
    ],
    bricks: [
      {
        id: 'door-left',
        type: 'doors-left-side',
        left: '275px',
        top: '382px',
        finalLeft: '348px',
        finalTop: '290px',
        width: '70px',
        height: '174px',
        animationDelay: '0s',
        zIndex: 1,
      },
      {
        id: 'door-right',
        type: 'doors-right-side',
        left: '341px',
        top: '392px',
        finalLeft: '400px',
        finalTop: '318px',
        width: '70px',
        height: '174px',
        animationDelay: '0s',
        zIndex: 1,
      },
    ],
    placeholders: [],
  },
};
