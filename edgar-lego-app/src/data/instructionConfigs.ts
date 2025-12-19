// Configuration for each instruction step's brick layout and animations

export interface BrickConfig {
  id: string;
  type: '1x2' | '2x1' | '2x2' | '3x1' | '4x1' | '4x2' | '6x1' | 'single';
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
  type: '1x2' | '2x1' | '2x2' | '3x1' | '4x1' | '4x2' | '6x1' | 'single';
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
      // Upper left 4x1 brick
      {
        id: 'brick-1',
        type: '4x1',
        left: '341px',
        top: '481px',
        finalTop: '481px',
        width: '120px',
        height: '80.5px',
        animationDelay: '0s',
        zIndex: 2,
      },
      // Upper right 4x1 brick
      {
        id: 'brick-2',
        type: '4x1',
        left: '435px',
        top: '530px',
        finalTop: '530px',
        width: '120px',
        height: '80.5px',
        animationDelay: '0.3s',
        zIndex: 1,
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
  // Step 2 (index 3) - Two 4x2 bricks
  // Based on Figma design: https://www.figma.com/design/lLpX6OSZHOGKcHxsuOnJQ3/EOY_LegoAssets?node-id=70-13175
  3: {
    stepNumber: 2,
    staticBricks: [
      // Bricks from step 1 that should remain visible at the bottom
      {
        type: '4x1',
        left: '341px',
        top: '481px',
        width: '120px',
        height: '80.5px',
        zIndex: 1,
      },
      {
        type: '4x1',
        left: '435px',
        top: '530px',
        width: '120px',
        height: '80.5px',
        zIndex: 1,
      },
    ],
    bricks: [
      // Upper left 4x2 brick
      {
        id: 'brick-1',
        type: '4x2',
        left: '341px',
        top: '237px',
        finalTop: '237px',
        width: '120px',
        height: '113px',
        animationDelay: '0s',
        zIndex: 3,
      },
      // Upper right 4x2 brick
      {
        id: 'brick-2',
        type: '4x2',
        left: '436px',
        top: '300px',
        finalTop: '300px',
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
  // Step 3 (index 4) - Additional bricks
  4: {
    stepNumber: 3,
    staticBricks: [
      // Bricks from step 1 (at the bottom)
      {
        type: '4x1',
        left: '341px',
        top: '481px',
        width: '120px',
        height: '80.5px',
        zIndex: 1,
      },
      {
        type: '4x1',
        left: '435px',
        top: '530px',
        width: '120px',
        height: '80.5px',
        zIndex: 1,
      },
      // Bricks from step 2 (at the top)
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
      {
        id: 'brick-1',
        type: '4x1',
        left: '435px',
        top: '530px',
        finalTop: '530px',
        width: '120.001px',
        height: '80.501px',
        animationDelay: '0.5s',
        zIndex: 4,
      },
      {
        id: 'brick-2',
        type: '4x1',
        left: '341px',
        top: '481px',
        finalTop: '481px',
        width: '120.001px',
        height: '80.501px',
        animationDelay: '0.8s',
        zIndex: 3,
      },
      {
        id: 'brick-3',
        type: '4x2',
        left: '245px',
        top: '290px',
        finalTop: '290px',
        width: '120.001px',
        height: '122.764px',
        animationDelay: '1.1s',
        zIndex: 2,
      },
      {
        id: 'brick-4',
        type: '4x2',
        left: '305px',
        top: '360px',
        finalTop: '360px',
        width: '120.001px',
        height: '122.764px',
        animationDelay: '1.4s',
        zIndex: 2,
      },
    ],
    placeholders: [
      {
        left: '434.5px',
        top: '530px',
        width: '118px',
        height: '78.5px',
      },
      {
        left: '341px',
        top: '480px',
        width: '118px',
        height: '78.5px',
        animationDelay: '0.3s',
      },
    ],
  },
};
