import { Routes, Route } from 'react-router-dom';
import WelcomeScreen from './WelcomeScreen';
import BuildStep from './BuildStep';
import InstructionStep from './InstructionStep';
import CompletedScreen from './CompletedScreen';
import Gallery from './Gallery';

function BuildFlow() {
  return (
    <Routes>
      <Route path="/" element={<WelcomeScreen />} />
      <Route path="step/:stepId" element={<BuildStep />} />
      <Route path="instruction/:stepId" element={<InstructionStep />} />
      <Route path="completed" element={<CompletedScreen />} />
      <Route path="gallery" element={<Gallery />} />
    </Routes>
  );
}

export default BuildFlow;
