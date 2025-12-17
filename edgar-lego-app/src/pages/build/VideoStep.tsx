import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { buildSteps } from '../../data/buildSteps';

function VideoStep() {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [hasWatched, setHasWatched] = useState(false);

  const currentIndex = parseInt(videoId || '0');
  const step = buildSteps[currentIndex];

  if (!step || step.type !== 'video') {
    return <div>Video not found</div>;
  }

  const content = step.content as any;

  const handleContinue = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= buildSteps.length) {
      navigate('/build/complete');
    } else {
      const nextStep = buildSteps[nextIndex];
      if (nextStep.type === 'question') {
        navigate(`/build/question/${nextIndex}`);
      } else {
        navigate(`/build/step/${nextIndex}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full space-y-8">
        {content.title && (
          <div className="text-center">
            <h2 className="text-white text-3xl font-epilogue font-semibold">
              {content.title}
            </h2>
            {content.description && (
              <p className="text-white/70 mt-4">{content.description}</p>
            )}
          </div>
        )}

        {/* Video player */}
        <div className="bg-black rounded-2xl overflow-hidden aspect-video">
          {content.videoUrl ? (
            <video
              src={content.videoUrl}
              controls
              className="w-full h-full"
              onTimeUpdate={(e) => {
                const video = e.target as HTMLVideoElement;
                if (video.currentTime > 5) {
                  setHasWatched(true);
                }
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🎬</div>
                <p className="text-white text-xl">Video placeholder</p>
                <p className="text-white/60 text-sm mt-2">
                  (Waiting for video content)
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Continue button */}
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleContinue}
            disabled={!hasWatched && !!content.videoUrl}
            className="bg-white text-gray-900 px-12 py-4 rounded-full
                       font-petrona italic text-xl hover:bg-gray-100 transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {hasWatched || !content.videoUrl ? 'Continue' : 'Watch to continue'}
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default VideoStep;
