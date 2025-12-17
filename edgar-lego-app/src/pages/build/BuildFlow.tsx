import { Routes, Route } from 'react-router-dom';
import { useBuildStore } from '../../store/buildStore';
import WelcomeScreen from './WelcomeScreen';
import BuildStep from './BuildStep';
import QuestionStep from './QuestionStep';
import VideoStep from './VideoStep';
import CompletionStep from './CompletionStep';
import MusicToggle from '../../components/common/MusicToggle';

function BuildFlow() {
  return (
    <div className="min-h-screen bg-white relative">
      {/* Music Toggle - Always visible */}
      <div className="fixed top-4 right-4 z-50">
        <MusicToggle />
      </div>

      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="step/:stepId" element={<BuildStep />} />
        <Route path="question/:questionId" element={<QuestionStep />} />
        <Route path="video/:videoId" element={<VideoStep />} />
        <Route path="complete" element={<CompletionStep />} />
      </Routes>
    </div>
  );
}

export default BuildFlow;
