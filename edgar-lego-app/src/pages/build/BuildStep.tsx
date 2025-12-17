import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useBuildStore } from '../../store/buildStore';
import { buildSteps } from '../../data/buildSteps';

function BuildStep() {
  const { stepId } = useParams();
  const navigate = useNavigate();
  const { markStepCompleted } = useBuildStore();

  const currentStepIndex = parseInt(stepId || '0');
  const step = buildSteps[currentStepIndex];

  if (!step || step.type !== 'build') {
    return <div>Step not found</div>;
  }

  const content = step.content as any; // Will be properly typed once we have real data

  const handleNext = () => {
    markStepCompleted(step.id);
    const nextIndex = currentStepIndex + 1;

    if (nextIndex >= buildSteps.length) {
      navigate('/build/complete');
    } else {
      const nextStep = buildSteps[nextIndex];
      if (nextStep.type === 'question') {
        navigate(`/build/question/${nextIndex}`);
      } else if (nextStep.type === 'video') {
        navigate(`/build/video/${nextIndex}`);
      } else {
        navigate(`/build/step/${nextIndex}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-lego-blue flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        {/* Step number */}
        <div className="text-center mb-8">
          <p className="text-white/80 text-lg font-petrona italic">
            Building Step {currentStepIndex + 1}
          </p>
        </div>

        {/* Instruction text */}
        {content.instruction && (
          <div className="text-center mb-12">
            <h2 className="text-white text-3xl font-epilogue font-semibold">
              {content.instruction}
            </h2>
          </div>
        )}

        {/* Animation area - placeholder for LEGO bricks */}
        <div className="bg-white/10 rounded-2xl p-12 mb-8 min-h-[400px] flex items-center justify-center">
          {content.image ? (
            <img src={content.image} alt="Building step" className="max-w-full max-h-96" />
          ) : (
            <div className="text-center">
              <div className="text-6xl mb-4">🧱</div>
              <p className="text-white text-xl">
                LEGO brick animation will appear here
              </p>
              <p className="text-white/60 text-sm mt-2">
                (Waiting for Figma assets)
              </p>
            </div>
          )}
        </div>

        {/* Next button */}
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="bg-white text-lego-blue px-12 py-4 rounded-full
                       font-petrona italic text-xl hover:bg-gray-100 transition-colors"
          >
            Continue
          </motion.button>
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {buildSteps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index <= currentStepIndex ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BuildStep;
