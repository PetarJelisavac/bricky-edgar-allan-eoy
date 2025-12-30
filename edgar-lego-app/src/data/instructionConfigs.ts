// Configuration for each instruction step's brick layout and animations

export interface BrickConfig {
  id: string;
  type: '1x2' | '2x1' | '2x2' | '3x1' | '4x1' | '4x2' | '6x1' | '8x2' | 'single';
  left: string;
  top: string;
  finalTop: string; // Where brick lands after animation
  width: string;
  height: string;
  animationDelay: string;
  zIndex: number;
}

export interface PlaceholderConfig {
  left: string;
  top: string;
  width: string;
  height: string;
  animationDelay?: string;
}

export interface StaticBrickConfig {
  type: '1x2' | '2x1' | '2x2' | '3x1' | '4x1' | '4x2' | '6x1' | '8x2' | 'single';
  left: string;
  top: string;
  width: string;
  height: string;
  zIndex: number;
}

export interface InstructionConfig {
  stepNumber: number;
  staticBricks: StaticBrickConfig[]; // Bricks from previous steps that are already built
  bricks: BrickConfig[]; // New bricks that animate in
  placeholders: PlaceholderConfig[];
}

export const instructionConfigs: Record<number, InstructionConfig> = {
  // Step 1 (index 2) - Two 4x1 bricks
  // Based on Figma design: https://www.figma.com/design/lLpX6OSZHOGKcHxsuOnJQ3/EOY_LegoAssets?node-id=59-14550
  2: {
    stepNumber: 1,
    staticBricks: [], // First step, no previous bricks
    bricks: [
      // Left 4x1 brick - drops from above
      {
        id: 'brick-1',
        type: '4x1',
        left: '596px',
        top: '-100px',
        finalTop: '392px', // Where brick is positioned in Figma
        width: '120px',
        height: '80.5px',
        animationDelay: '0s',
        zIndex: 2,
      },
      // Right 4x1 brick - drops from above
      {
        id: 'brick-2',
        type: '4x1',
        left: '690px',
        top: '-100px',
        finalTop: '441px', // Where brick is positioned in Figma
        width: '120px',
        height: '80.5px',
        animationDelay: '0.3s',
        zIndex: 1,
      },
    ],
    placeholders: [
      {
        left: '596px',
        top: '503px',
        width: '118px',
        height: '78.5px',
      },
      {
        left: '689.5px',
        top: '553px',
        width: '118px',
        height: '78.5px',
        animationDelay: '0.3s',
      },
    ],
  },
  // Step 2 (index 3) - Two 4x2 bricks
  // Based on Figma design: https://www.figma.com/design/lLpX6OSZHOGKcHxsuOnJQ3/EOY_LegoAssets?node-id=70-13175
  3: {
    stepNumber: 2,
    staticBricks: [
      // Bricks from step 1 - exactly where they ended in Step 1
      {
        type: '4x1',
        left: '596px',
        top: '392px', // From Step 1 finalTop
        width: '120px',
        height: '80.5px',
        zIndex: 1,
      },
      {
        type: '4x1',
        left: '690px',
        top: '441px', // From Step 1 finalTop
        width: '120px',
        height: '80.5px',
        zIndex: 1,
      },
    ],
    bricks: [
      // Left 4x2 brick - drops from above
      {
        id: 'brick-1',
        type: '4x2',
        left: '596px',
        top: '-100px',
        finalTop: '281px',
        width: '120px',
        height: '113px',
        animationDelay: '0s',
        zIndex: 3,
      },
      // Right 4x2 brick - drops from above
      {
        id: 'brick-2',
        type: '4x2',
        left: '690px',
        top: '-100px',
        finalTop: '330px',
        width: '120px',
        height: '113px',
        animationDelay: '0.3s',
        zIndex: 2,
      },
    ],
    placeholders: [
      {
        left: '341px',
        top: '480px',
        width: '118px',
        height: '78.5px',
      },
      {
        left: '434.5px',
        top: '530px',
        width: '118px',
        height: '78.5px',
        animationDelay: '0.3s',
      },
    ],
  },
  // Step 3 (index 4) - Two 2x2 bricks
  // Based on Figma design: https://www.figma.com/design/lLpX6OSZHOGKcHxsuOnJQ3/EOY_LegoAssets?node-id=70-13274
  4: {
    stepNumber: 3,
    staticBricks: [
      // Bricks from step 1 (4x1 bricks at the bottom)
      {
        type: '4x1',
        left: '341px',
        top: '480px', // Matches Step 1 finalTop
        width: '120px',
        height: '80.5px',
        zIndex: 1,
      },
      {
        type: '4x1',
        left: '434.5px', // Matches Step 1 left
        top: '530px',
        width: '120px',
        height: '80.5px',
        zIndex: 1,
      },
      // Bricks from step 2 (4x2 bricks in the middle-top)
      {
        type: '4x2',
        left: '341px',
        top: '237px',
        width: '120px',
        height: '113px',
        zIndex: 3,
      },
      {
        type: '4x2',
        left: '436px',
        top: '300px',
        width: '120px',
        height: '113px',
        zIndex: 2,
      },
    ],
    bricks: [
      // New 2x2 brick on the left - drops from above
      {
        id: 'brick-1',
        type: '2x2',
        left: '341px',
        top: '-100px',
        finalTop: '390px',
        width: '90px',
        height: '97px',
        animationDelay: '0s',
        zIndex: 4,
      },
      // New 2x2 brick on the right - drops from above
      {
        id: 'brick-2',
        type: '2x2',
        left: '465px',
        top: '-100px',
        finalTop: '427px',
        width: '90px',
        height: '97px',
        animationDelay: '0.3s',
        zIndex: 3,
      },
    ],
    placeholders: [
      {
        left: '341px',
        top: '389px',
        width: '88px',
        height: '95px',
      },
      {
        left: '465px',
        top: '426px',
        width: '88px',
        height: '95px',
        animationDelay: '0.3s',
      },
    ],
  },
  // Step 4 (index 5) - One 8x2 brick
  // Based on Figma design: https://www.figma.com/design/lLpX6OSZHOGKcHxsuOnJQ3/EOY_LegoAssets?node-id=70-13414
  5: {
    stepNumber: 4,
    staticBricks: [
      // All bricks from steps 1-3
      { type: '4x1', left: '341px', top: '480px', width: '120px', height: '80.5px', zIndex: 1 },
      { type: '4x1', left: '434.5px', top: '530px', width: '120px', height: '80.5px', zIndex: 1 },
      { type: '4x2', left: '341px', top: '237px', width: '120px', height: '113px', zIndex: 3 },
      { type: '4x2', left: '436px', top: '300px', width: '120px', height: '113px', zIndex: 2 },
      { type: '2x2', left: '341px', top: '390px', width: '90px', height: '97px', zIndex: 4 },
      { type: '2x2', left: '465px', top: '427px', width: '90px', height: '97px', zIndex: 3 },
    ],
    bricks: [
      // New 8x2 brick - drops from above
      {
        id: 'brick-1',
        type: '8x2',
        left: '341px',
        top: '-100px',
        finalTop: '172px',
        width: '180px',
        height: '142px',
        animationDelay: '0s',
        zIndex: 5,
      },
    ],
    placeholders: [
      {
        left: '341px',
        top: '171px',
        width: '178px',
        height: '140px',
      },
    ],
  },
  // Step 5 (index 6) - Multiple bricks
  // Based on Figma design: https://www.figma.com/design/lLpX6OSZHOGKcHxsuOnJQ3/EOY_LegoAssets?node-id=70-13590
  6: {
    stepNumber: 5,
    staticBricks: [
      // All bricks from steps 1-4
      { type: '4x1', left: '341px', top: '480px', width: '120px', height: '80.5px', zIndex: 1 },
      { type: '4x1', left: '434.5px', top: '530px', width: '120px', height: '80.5px', zIndex: 1 },
      { type: '4x2', left: '341px', top: '237px', width: '120px', height: '113px', zIndex: 3 },
      { type: '4x2', left: '436px', top: '300px', width: '120px', height: '113px', zIndex: 2 },
      { type: '2x2', left: '341px', top: '390px', width: '90px', height: '97px', zIndex: 4 },
      { type: '2x2', left: '465px', top: '427px', width: '90px', height: '97px', zIndex: 3 },
      { type: '8x2', left: '341px', top: '172px', width: '180px', height: '142px', zIndex: 5 },
    ],
    bricks: [
      // New 2x2 brick - drops from above
      {
        id: 'brick-1',
        type: '2x2',
        left: '465px',
        top: '-100px',
        finalTop: '330px',
        width: '90px',
        height: '97px',
        animationDelay: '0s',
        zIndex: 6,
      },
      // New 4x1 brick - drops from above
      {
        id: 'brick-2',
        type: '4x1',
        left: '341px',
        top: '-100px',
        finalTop: '159px',
        width: '120px',
        height: '80.5px',
        animationDelay: '0.3s',
        zIndex: 7,
      },
      // New 2x1 brick - drops from above
      {
        id: 'brick-3',
        type: '2x1',
        left: '435px',
        top: '-100px',
        finalTop: '192px',
        width: '90px',
        height: '63px',
        animationDelay: '0.6s',
        zIndex: 6,
      },
      // Another 4x1 brick - drops from above
      {
        id: 'brick-4',
        type: '4x1',
        left: '461px',
        top: '-100px',
        finalTop: '240px',
        width: '120px',
        height: '80.5px',
        animationDelay: '0.9s',
        zIndex: 5,
      },
    ],
    placeholders: [
      {
        left: '465px',
        top: '329px',
        width: '88px',
        height: '95px',
      },
      {
        left: '341px',
        top: '158px',
        width: '118px',
        height: '78.5px',
        animationDelay: '0.3s',
      },
      {
        left: '435px',
        top: '191px',
        width: '88px',
        height: '61px',
        animationDelay: '0.6s',
      },
      {
        left: '461px',
        top: '239px',
        width: '118px',
        height: '78.5px',
        animationDelay: '0.9s',
      },
    ],
  },
  // Step 6 (index 7) - Two 2x1 bricks
  // Based on Figma design: https://www.figma.com/design/lLpX6OSZHOGKcHxsuOnJQ3/EOY_LegoAssets?node-id=70-14146
  7: {
    stepNumber: 6,
    staticBricks: [
      // All bricks from steps 1-5
      { type: '4x1', left: '341px', top: '480px', width: '120px', height: '80.5px', zIndex: 1 },
      { type: '4x1', left: '434.5px', top: '530px', width: '120px', height: '80.5px', zIndex: 1 },
      { type: '4x2', left: '341px', top: '237px', width: '120px', height: '113px', zIndex: 3 },
      { type: '4x2', left: '436px', top: '300px', width: '120px', height: '113px', zIndex: 2 },
      { type: '2x2', left: '341px', top: '390px', width: '90px', height: '97px', zIndex: 4 },
      { type: '2x2', left: '465px', top: '427px', width: '90px', height: '97px', zIndex: 3 },
      { type: '8x2', left: '341px', top: '172px', width: '180px', height: '142px', zIndex: 5 },
      { type: '2x2', left: '465px', top: '330px', width: '90px', height: '97px', zIndex: 6 },
      { type: '4x1', left: '341px', top: '159px', width: '120px', height: '80.5px', zIndex: 7 },
      { type: '2x1', left: '435px', top: '192px', width: '90px', height: '63px', zIndex: 6 },
      { type: '4x1', left: '461px', top: '240px', width: '120px', height: '80.5px', zIndex: 5 },
    ],
    bricks: [
      // New 2x1 brick on left - drops from above
      {
        id: 'brick-1',
        type: '2x1',
        left: '379px',
        top: '-100px',
        finalTop: '139px',
        width: '90px',
        height: '63px',
        animationDelay: '0s',
        zIndex: 8,
      },
      // New 2x1 brick on right - drops from above
      {
        id: 'brick-2',
        type: '2x1',
        left: '465px',
        top: '-100px',
        finalTop: '172px',
        width: '90px',
        height: '63px',
        animationDelay: '0.3s',
        zIndex: 7,
      },
    ],
    placeholders: [
      {
        left: '379px',
        top: '138px',
        width: '88px',
        height: '61px',
      },
      {
        left: '465px',
        top: '171px',
        width: '88px',
        height: '61px',
        animationDelay: '0.3s',
      },
    ],
  },
};
