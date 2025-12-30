import { useParams, useNavigate } from 'react-router-dom';
import { useBuildStore } from '../../store/buildStore';
import { buildSteps } from '../../data/buildSteps';
import { instructionConfigs } from '../../data/instructionConfigs';

import buildingBackground from '../../assets/images/Building.Background.png';
import instructionPlaceholder from '../../assets/images/instruction-placeholder.svg';
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
import { brickColorPalettes } from '../../store/buildStore';

function InstructionStep() {
  const { stepId } = useParams();
  const navigate = useNavigate();
  const { markStepCompleted, selectedBrickColor } = useBuildStore();

  const currentStepIndex = parseInt(stepId || '0');
  const step = buildSteps[currentStepIndex];
  const config = instructionConfigs[currentStepIndex] || instructionConfigs[2];

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
      navigate('/build/completed');
    } else {
      const nextStep = buildSteps[nextIndex];
      if (nextStep.type === 'build') {
        if (nextIndex === 1) {
          navigate(`/build/step/${nextIndex}`);
        } else {
          navigate(`/build/instruction/${nextIndex}`);
        }
      }
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex < 0) {
      navigate('/build');
    } else {
      const prevStep = buildSteps[prevIndex];
      if (prevStep.type === 'build') {
        if (prevIndex === 1) {
          navigate(`/build/step/${prevIndex}`);
        } else {
          navigate(`/build/instruction/${prevIndex}`);
        }
      }
    }
  };

  const handleAudioToggle = () => {
    console.log('Audio toggle clicked');
  };

  const generateKeyframes = () => {
    return config.bricks.map((_, index) => `
      @keyframes fallBrick${index + 1} {
        0% { opacity: 0; transform: translateY(-300px); }
        100% { opacity: 1; transform: translateY(0); }
      }
    `).join('\n');
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
      case 'single':
        return <img src={singleBrickAsset} alt="LEGO brick" className="block w-full h-full max-w-none" />;
      default:
        return <img src={singleBrickAsset} alt="LEGO brick" className="block w-full h-full max-w-none" />;
    }
  };

  const renderStaticBrick = (brickConfig: typeof config.staticBricks[0], index: number) => {
    const containerStyle: React.CSSProperties = {
      position: 'absolute',
      left: `calc(${parseFloat(brickConfig.left) / 930 * 100}%)`,
      top: `calc(${parseFloat(brickConfig.top) / 712 * 100}%)`,
      width: `calc(${parseFloat(brickConfig.width) / 930 * 100}%)`,
      height: `calc(${parseFloat(brickConfig.height) / 712 * 100}%)`,
      zIndex: brickConfig.zIndex,
    };

    return (
      <div key={`static-brick-${index}`} style={containerStyle}>
        {renderBrickComponent(brickConfig.type)}
      </div>
    );
  };

  return (
    <div className="w-full h-screen bg-[#fefff8] flex justify-center items-center p-6 relative">
      {/* Main content container - centered and fills available space */}
      <div className="relative w-full max-w-[930px] flex flex-col gap-[18px] items-center justify-center" style={{ height: 'calc(100vh - 48px)' }}>
        {/* Main instruction background image - maintains aspect ratio */}
        <div className="relative w-full max-w-[930px] aspect-[930/712]">
          <img src={buildingBackground} alt="Building background" className="absolute inset-0 w-full h-full object-cover rounded-lg" />

          {/* Step number badge - centered at top */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[10%] w-[60px] h-[60px] border border-black flex items-center justify-center">
            <p className="font-epilogue font-semibold text-2xl text-black text-center leading-none">
              {config.stepNumber}
            </p>
          </div>

          {/* Audio button - top right */}
          <button
            onClick={handleAudioToggle}
            className="absolute right-4 top-4 w-[38px] h-[38px] border-none bg-transparent cursor-pointer p-0 hover:scale-110 transition-transform"
          >
            <img src={audioIcon} alt="Audio toggle" className="block w-full h-full max-w-none" />
          </button>

          {/* LEGO Bricks and Placeholders - scaled relative to container */}
          <div className="absolute inset-0 hidden lg:block">
            {/* Placeholder outlines */}
            {config.placeholders.map((placeholder, index) => (
              <div
                key={`placeholder-${index}`}
                className="absolute animate-pulse"
                style={{
                  left: `calc(${parseFloat(placeholder.left) / 930 * 100}%)`,
                  top: `calc(${parseFloat(placeholder.top) / 712 * 100}%)`,
                  width: `calc(${parseFloat(placeholder.width) / 930 * 100}%)`,
                  height: `calc(${parseFloat(placeholder.height) / 712 * 100}%)`,
                }}
              >
                <img src={instructionPlaceholder} alt="" className="block w-full h-full max-w-none" />
              </div>
            ))}

            {/* Static bricks from previous steps */}
            {config.staticBricks?.map((staticBrick, index) => renderStaticBrick(staticBrick, index))}

            {/* Animated bricks for current step */}
            {[...config.bricks]
              .sort((a, b) => a.zIndex - b.zIndex)
              .map((brick, index) => {
                const animationName = `fallBrick${index + 1}`;
                return (
                  <div
                    key={brick.id}
                    className="absolute opacity-0"
                    style={{
                      left: `calc(${parseFloat(brick.left) / 930 * 100}%)`,
                      top: `calc(${parseFloat(brick.finalTop) / 712 * 100}%)`,
                      width: `calc(${parseFloat(brick.width) / 930 * 100}%)`,
                      height: `calc(${parseFloat(brick.height) / 712 * 100}%)`,
                      animationName: animationName,
                      animationDuration: '1.2s',
                      animationTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                      animationFillMode: 'forwards',
                      animationDelay: brick.animationDelay,
                      zIndex: brick.zIndex,
                    }}
                  >
                    {renderBrickComponent(brick.type)}
                  </div>
                );
              })}
          </div>
        </div>

        {/* Bottom controls container */}
        <div className="flex items-center justify-between w-full gap-4">
          {/* Back button */}
          <button
            onClick={handleBack}
            className="flex items-center justify-center border border-[#939393] rounded-[80px] px-6 py-4 sm:px-10 sm:py-8 bg-transparent cursor-pointer transition-transform hover:scale-105 shrink-0"
          >
            <div className="rotate-180 w-[20px] sm:w-[27px] h-[12px] sm:h-[15px]">
              <img src={arrowBack} alt="Back" className="block w-full h-full max-w-none" />
            </div>
          </button>

          {/* Next button */}
          <button
            onClick={handleNext}
            className="flex-1 max-w-[399px] h-[52px] sm:h-[68px] bg-black text-[#fefff8] rounded-[100px] px-6 sm:px-[30px] py-3 font-petrona font-medium italic text-lg sm:text-2xl border-none cursor-pointer flex items-center justify-center transition-transform hover:scale-[1.02] overflow-hidden"
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
    </div>
  );
}

export default InstructionStep;
