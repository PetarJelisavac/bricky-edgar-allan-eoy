import { useParams, useNavigate } from 'react-router-dom';
import { useBuildStore } from '../../store/buildStore';
import { buildSteps } from '../../data/buildSteps';
import { instructionConfigs } from '../../data/instructionConfigs';

import instructionBg from '../../assets/images/instruction-bg.png';
import instructionOverlay1 from '../../assets/images/instruction-overlay-1.svg';
import instructionOverlay2 from '../../assets/images/instruction-overlay-2.svg';
import instructionPlaceholder from '../../assets/images/instruction-placeholder.svg';
import audioIcon from '../../assets/images/audio-icon.svg';
import arrowBack from '../../assets/images/arrow-back.svg';

import brickSingle from '../../assets/images/brick-baddy-blue.svg';
import Brick4x1 from '../../components/bricks/Brick4x1';
import Brick4x2 from '../../components/bricks/Brick4x2';

function InstructionStep() {
  const { stepId } = useParams();
  const navigate = useNavigate();
  const { markStepCompleted } = useBuildStore();

  const currentStepIndex = parseInt(stepId || '0');
  const step = buildSteps[currentStepIndex];
  const config = instructionConfigs[currentStepIndex] || instructionConfigs[2];

  if (!step || step.type !== 'build') {
    return <div className="min-h-screen flex items-center justify-center">Step not found</div>;
  }

  const handleNext = () => {
    markStepCompleted(step.id);
    const nextIndex = currentStepIndex + 1;
    if (nextIndex >= buildSteps.length) {
      navigate('/build');
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
        0% { opacity: 0; transform: translateY(-300px) scale(0.8); }
        60% { opacity: 1; }
        80% { transform: translateY(5px) scale(1.02); }
        100% { opacity: 1; transform: translateY(0) scale(1); }
      }
    `).join('\n');
  };

  return (
    <div className="w-full h-screen bg-[#fefff8] flex justify-center items-stretch p-6 relative">
      {/* Main content container - centered and fills available space */}
      <div className="relative w-full max-w-[930px] flex flex-col gap-[18px]">
        {/* Main instruction background image - grows to fill space */}
        <div className="relative w-full flex-1 min-h-0">
          <img src={instructionBg} alt="Instruction background" className="block w-full h-full max-w-none object-cover" />
          
          {/* Overlay 1 - Top left diagonal */}
          <div className="absolute left-0 -top-px w-1/2 max-w-[474px] h-auto aspect-[474/274] hidden sm:block">
            <img src={instructionOverlay1} alt="" className="block w-full h-full max-w-none" />
          </div>

          {/* Overlay 2 - Bottom right diagonal */}
          <div className="absolute right-0 bottom-[10%] w-1/4 max-w-[230px] h-auto aspect-[230/132] hidden md:flex items-center justify-center">
            <div className="rotate-180 w-full h-full">
              <img src={instructionOverlay2} alt="" className="block w-full h-full max-w-none" />
            </div>
          </div>

          {/* Step number badge - centered at top */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[10%] h-[60px] px-4 border border-black flex items-center justify-center bg-[#fefff8]/80">
            <p className="font-epilogue font-semibold text-2xl text-black text-center">
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

          {/* Placeholder outlines */}
          {config.placeholders.map((placeholder, index) => (
            <div
              key={`placeholder-${index}`}
              className="absolute animate-pulse hidden lg:block"
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

          {/* LEGO Bricks - scaled relative to container */}
          <div className="hidden lg:block">
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
                      animation: `${animationName} 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`,
                      animationDelay: brick.animationDelay,
                      zIndex: brick.zIndex,
                    }}
                  >
                    {brick.type === '4x1' ? <Brick4x1 /> : brick.type === '4x2' ? <Brick4x2 /> : 
                      <img src={brickSingle} alt="LEGO brick" className="block w-full h-full max-w-none" />
                    }
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
