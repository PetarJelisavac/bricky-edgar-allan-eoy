import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useBuildStore } from '../../store/buildStore';
import { useOrderStore } from '../../store/orderStore';
import { buildSteps } from '../../data/buildSteps';
import { getQuestionForUser } from '../../utils/questionGenerator';

function QuestionStep() {
  const { questionId } = useParams();
  const navigate = useNavigate();
  const { saveAnswer } = useBuildStore();
  const { userData } = useOrderStore();
  const [answer, setAnswer] = useState('');

  const currentIndex = parseInt(questionId || '0');
  const step = buildSteps[currentIndex];

  // Get personalized question based on user's industry/position
  const question = getQuestionForUser(
    userData.industry || 'other',
    userData.position || 'other',
    currentIndex
  );

  const handleSubmit = () => {
    if (!answer.trim()) return;

    saveAnswer(step.id, answer);

    const nextIndex = currentIndex + 1;
    if (nextIndex >= buildSteps.length) {
      navigate('/build/complete');
    } else {
      const nextStep = buildSteps[nextIndex];
      if (nextStep.type === 'video') {
        navigate(`/build/video/${nextIndex}`);
      } else {
        navigate(`/build/step/${nextIndex}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full bg-white rounded-3xl p-12 shadow-2xl"
      >
        <div className="text-center space-y-8">
          <div className="text-6xl">💭</div>

          <h2 className="font-epilogue font-semibold text-4xl text-black">
            {question.question}
          </h2>

          {question.type === 'multiple-choice' && question.options ? (
            <div className="space-y-4">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setAnswer(option)}
                  className={`w-full px-6 py-4 rounded-xl border-2 transition-all
                    ${
                      answer === option
                        ? 'border-lego-blue bg-lego-blue/10'
                        : 'border-gray-300 hover:border-lego-blue'
                    }`}
                >
                  {option}
                </button>
              ))}
            </div>
          ) : (
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here..."
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg
                         focus:border-lego-blue focus:outline-none transition-colors
                         min-h-[150px]"
            />
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            disabled={!answer.trim()}
            className="bg-lego-blue text-white px-12 py-4 rounded-full
                       font-petrona italic text-xl hover:bg-blue-600 transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default QuestionStep;
