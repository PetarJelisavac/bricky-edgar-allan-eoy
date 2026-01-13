import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBuildStore } from '../../store/buildStore';
import { buildSteps } from '../../data/buildSteps';
import { instructionConfigs } from '../../data/instructionConfigs';
import PageLayout from '../../components/layout/PageLayout';


import audioIcon from '../../assets/images/audio-icon.svg';
import arrowBack from '../../assets/images/arrow-back.svg';

import brickBaddyBlue from '../../assets/images/brick-baddy-blue.svg';
import brickWine from '../../assets/images/brick-wine.svg';
import brickSunshine from '../../assets/images/brick-sunshine.svg';
import brickRojo from '../../assets/images/brick-rojo.svg';
import brickCoal from '../../assets/images/brick-coal.svg';
import Brick1x2 from '../../components/bricks/Brick1x2';
import Brick2x1 from '../../components/bricks/Brick2x1';
import Brick2x2 from '../../components/bricks/Brick2x2';
import Brick3x1 from '../../components/bricks/Brick3x1';
import Brick4x1 from '../../components/bricks/Brick4x1';
import Brick4x2 from '../../components/bricks/Brick4x2';
import Brick6x1 from '../../components/bricks/Brick6x1';
import BrickVertical from '../../components/bricks/BrickVertical';
import BrickTop from '../../components/bricks/BrickTop';
import BrickTopLeftCurve from '../../components/bricks/BrickTopLeftCurve';
import BrickTopCurveRight from '../../components/bricks/BrickTopCurveRight';
import Brick1x2SidePip from '../../components/bricks/Brick1x2SidePip';
import Brick3x1White from '../../components/bricks/Brick3x1White';
import Brick3x1Flat from '../../components/bricks/Brick3x1Flat';
import Brick8x2 from '../../components/bricks/Brick8x2';
import InstructionPlaceholder from '../../components/bricks/InstructionPlaceholder';
import { brickColorPalettes } from '../../store/buildStore';

function InstructionStep() {
  const { stepId } = useParams();
  const navigate = useNavigate();
  const { markStepCompleted, selectedBrickColor } = useBuildStore();
  const [animationKey, setAnimationKey] = React.useState(0);

  const currentStepIndex = parseInt(stepId || '0');
  const step = buildSteps[currentStepIndex];
  const config = instructionConfigs[currentStepIndex] || instructionConfigs[2];

  // Force animation restart when step changes
  React.useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [currentStepIndex]);

  // Get the appropriate single brick asset based on selected color
  const getSingleBrickAsset = () => {
    switch (selectedBrickColor) {
      case 'Wine':
        return brickWine;
      case 'Sunshine':
        return brickSunshine;
      case 'Rojo':
        return brickRojo;
      case 'Coal':
        return brickCoal;
      case 'Baddy Blue':
      default:
        return brickBaddyBlue;
    }
  };

  // Get color palette for precise color matching
  const getColorPalette = () => {
    return selectedBrickColor ? brickColorPalettes[selectedBrickColor] : undefined;
  };

  if (!step || step.type !== 'build') {
    return <div className="min-h-screen flex items-center justify-center">Step not found</div>;
  }

  const handleNext = () => {
    markStepCompleted(step.id);
    const nextIndex = currentStepIndex + 1;
    if (nextIndex >= buildSteps.length) {
      // All steps completed - navigate to completed screen
      navigate('/completed');
    } else {
      const nextStep = buildSteps[nextIndex];
      if (nextStep.type === 'build') {
        if (nextIndex === 1) {
          navigate(`/step/${nextIndex}`);
        } else {
          navigate(`/instruction/${nextIndex}`);
        }
      }
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex < 0) {
      navigate('/');
    } else {
      const prevStep = buildSteps[prevIndex];
      if (prevStep.type === 'build') {
        if (prevIndex === 1) {
          navigate(`/step/${prevIndex}`);
        } else {
          navigate(`/instruction/${prevIndex}`);
        }
      }
    }
  };

  const handleAudioToggle = () => {
    console.log('Audio toggle clicked');
  };

  const generateKeyframes = () => {
    // Calculate starting Y position based on step index
    // Steps 0-4: -300px, Steps 5-9: -275px, Steps 10-14: -250px, Steps 15+: -225px
    const stepGroup = Math.floor(currentStepIndex / 5);
    const startY = -300 + (stepGroup * 25);

    return config.bricks.map((brick, index) => {
      // Check if this brick has a gap-closing animation (finalLeft property)
      if (brick.finalLeft) {
        const startLeft = parseFloat(brick.left);
        const finalLeft = parseFloat(brick.finalLeft);
        const horizontalShift = finalLeft - startLeft;

        // Include centering transform in all keyframes
        return `
          @keyframes fallBrick${index + 1} {
            0% { opacity: 0; transform: translate(-50%, -50%) translate(0, ${startY}px) scale(0.5); }
            25% { opacity: 1; transform: translate(-50%, -50%) translate(0, ${startY}px) scale(1); }
            100% { opacity: 1; transform: translate(-50%, -50%) translate(${horizontalShift}px, 0) scale(1); }
          }
        `;
      } else {
        // Regular fall animation - include centering transform
        return `
          @keyframes fallBrick${index + 1} {
            0% { opacity: 0; transform: translate(-50%, -50%) translateY(${startY}px) scale(0.5); }
            25% { opacity: 1; transform: translate(-50%, -50%) translateY(${startY}px) scale(1); }
            100% { opacity: 1; transform: translate(-50%, -50%) translateY(0) scale(1); }
          }
        `;
      }
    }).join('\n');
  };

  const renderBrickComponent = (type: string) => {
    const colorPalette = getColorPalette();
    const singleBrickAsset = getSingleBrickAsset();

    switch (type) {
      case '1x2':
        return <Brick1x2 colorPalette={colorPalette} />;
      case '2x1':
        return <Brick2x1 colorPalette={colorPalette} />;
      case '2x2':
        return <Brick2x2 colorPalette={colorPalette} />;
      case '3x1':
        return <Brick3x1 colorPalette={colorPalette} />;
      case '4x1':
        return <Brick4x1 colorPalette={colorPalette} />;
      case '4x2':
        return <Brick4x2 colorPalette={colorPalette} />;
      case '6x1':
        return <Brick6x1 colorPalette={colorPalette} />;
      case 'vertical':
        return <BrickVertical colorPalette={colorPalette} />;
      case 'top':
        return <BrickTop colorPalette={colorPalette} />;
      case 'top-left-curve':
        return <BrickTopLeftCurve colorPalette={colorPalette} />;
      case 'top-curve-right':
        return <BrickTopCurveRight colorPalette={colorPalette} />;
      case '3x1-white':
        return <Brick3x1White />;
      case '3x1-flat':
        return <Brick3x1Flat />;
      case '8x2':
        return <Brick8x2 colorPalette={colorPalette} />;
      case '1x2-side-pip':
        return <Brick1x2SidePip colorPalette={colorPalette} />;
      case 'vertical-white':
        return <BrickVertical colorPalette={{ name: 'Baddy Blue', primary: '#FFFFFF', secondary: '#D9D9D9', tertiary: '#E5E5E5', highlight: '#FFFFFF' }} />;
      case 'vertical-blue':
        return <BrickVertical colorPalette={colorPalette} />;
      case 'single':
        return <img src={singleBrickAsset} alt="LEGO brick" className="block w-full h-full max-w-none" />;
      default:
        return <img src={singleBrickAsset} alt="LEGO brick" className="block w-full h-full max-w-none" />;
    }
  };

  // Center-based positioning: convert top-left coordinates to center offsets
  // Original design: 930x712, center at (465, 356)
  const CENTER_X = 465;
  const CENTER_Y = 356;

  const renderStaticBrick = (brickConfig: typeof config.staticBricks[0], index: number) => {
    // Calculate offset from center (in pixels for the 930x712 reference)
    const brickCenterX = parseFloat(brickConfig.left) + parseFloat(brickConfig.width) / 2;
    const brickCenterY = parseFloat(brickConfig.top) + parseFloat(brickConfig.height) / 2;
    const offsetX = brickCenterX - CENTER_X;
    const offsetY = brickCenterY - CENTER_Y;

    const containerStyle: React.CSSProperties = {
      position: 'absolute',
      left: `calc(50% + ${offsetX}px)`,
      top: `calc(50% + ${offsetY}px)`,
      width: brickConfig.width,
      height: brickConfig.height,
      transform: 'translate(-50%, -50%)',
      zIndex: brickConfig.zIndex,
    };

    return (
      <div key={`static-brick-${index}`} style={containerStyle}>
        {renderBrickComponent(brickConfig.type)}
      </div>
    );
  };

  return (
    <PageLayout showLogo={false} className="p-4 pb-[max(16px,env(safe-area-inset-bottom))]" contentClassName="justify-center items-center">
      {/* Main container - matches Figma container_main */}
      <div className="w-full max-w-[930px] flex flex-col gap-[18px] flex-1 min-h-0 overflow-hidden">
        {/* Background container - blue area from Figma */}
        <div className="relative flex-1 bg-[#cce5ff] rounded-lg min-h-[300px] overflow-hidden">
          <button
            onClick={handleAudioToggle}
            className="absolute right-[12px] top-[12px] sm:right-[22px] sm:top-[21px] w-[28px] h-[28px] sm:w-[38px] sm:h-[38px] border-none bg-transparent cursor-pointer p-0 hover:scale-110 transition-transform z-10"
          >
            <img src={audioIcon} alt="Audio toggle" className="block w-full h-full max-w-none" />
          </button>

          {/* Step number badge - positioned relative to background container (not animation wrapper) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[20px] sm:top-[30px] w-[45px] h-[50px] sm:w-[55px] sm:h-[60px] border border-black bg-transparent flex items-center justify-center z-20">
            <p className="font-epilogue font-semibold text-xl sm:text-2xl text-black text-center leading-none">
              {config.stepNumber}
            </p>
          </div>

          {/* Animation wrapper - fills background and centers content */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* 
              Animation container with fixed aspect ratio matching the design.
              Brick coordinates are based on 930x712 reference.
              Content is centered by the parent flex container.
              Scale applied on mobile for responsiveness.
            */}
            <div
              key={animationKey}
              className="relative scale-[0.9] sm:scale-100 origin-center"
              style={{
                width: 'min(100%, 930px)',
                aspectRatio: '930 / 712',
              }}
            >

              {/* Placeholder outlines - only show on first instruction step (no static bricks) */}
              {(!config.staticBricks || config.staticBricks.length === 0) && config.placeholders.map((placeholder, index) => {
                const phCenterX = parseFloat(placeholder.left) + parseFloat(placeholder.width) / 2;
                const phCenterY = parseFloat(placeholder.top) + parseFloat(placeholder.height) / 2;
                const offsetX = phCenterX - CENTER_X;
                const offsetY = phCenterY - CENTER_Y;

                return (
                  <div
                    key={`placeholder-${index}`}
                    className="absolute animate-pulse"
                    style={{
                      left: `calc(50% + ${offsetX}px)`,
                      top: `calc(50% + ${offsetY}px)`,
                      width: placeholder.width,
                      height: placeholder.height,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <InstructionPlaceholder />
                  </div>
                );
              })}

              {/* Static bricks from previous steps */}
              {config.staticBricks?.map((staticBrick, index) => renderStaticBrick(staticBrick, index))}

              {/* Animated bricks for current step */}
              {config.bricks.map((brick, index) => {
                const animationName = `fallBrick${index + 1}`;

                // Calculate center-based offset for final position
                const brickCenterX = parseFloat(brick.left) + parseFloat(brick.width) / 2;
                const brickCenterY = parseFloat(brick.finalTop) + parseFloat(brick.height) / 2;
                const offsetX = brickCenterX - CENTER_X;
                const offsetY = brickCenterY - CENTER_Y;

                const brickStyle: React.CSSProperties = {
                  left: `calc(50% + ${offsetX}px)`,
                  top: `calc(50% + ${offsetY}px)`,
                  width: brick.width,
                  height: brick.height,
                  transform: 'translate(-50%, -50%)',
                  animationName: animationName,
                  animationDuration: '4s',
                  animationTimingFunction: 'ease-in-out',
                  animationFillMode: 'forwards',
                  animationDelay: brick.animationDelay,
                  zIndex: brick.zIndex,
                };

                // Add fade effect on the right side if specified
                if (brick.fadeRight) {
                  brickStyle.maskImage = 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)';
                  brickStyle.WebkitMaskImage = 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)';
                }

                return (
                  <div
                    key={brick.id}
                    className="absolute opacity-0"
                    style={brickStyle}
                  >
                    {renderBrickComponent(brick.type)}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Button wrapper - matches Figma button_wrapper (68px height) */}
        <div className="flex items-center justify-between w-full h-[52px] sm:h-[68px] gap-4 shrink-0">
          {/* Back button - matches Figma button_back (109x68px) */}
          <button
            onClick={handleBack}
            className="flex items-center justify-center border border-[#939393] rounded-full h-full w-[80px] sm:w-[109px] bg-transparent cursor-pointer transition-transform hover:scale-105 shrink-0"
          >
            <div className="rotate-180 w-[20px] sm:w-[27px] h-[12px] sm:h-[15px]">
              <img src={arrowBack} alt="Back" className="block w-full h-full max-w-none" />
            </div>
          </button>

          {/* Next button - matches Figma button_next (399x68px) */}
          <button
            onClick={handleNext}
            className="flex-1 max-w-[399px] h-full bg-black text-[#fefff8] rounded-full px-6 sm:px-[30px] font-petrona font-medium italic text-lg sm:text-2xl border-none cursor-pointer flex items-center justify-center transition-transform hover:scale-[1.02] overflow-hidden"
          >
            Next
          </button>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        ${generateKeyframes()}
        
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </PageLayout>
  );
}

export default InstructionStep;
