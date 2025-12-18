import { Routes, Route } from 'react-router-dom';
import WelcomeScreen from './WelcomeScreen';
import BuildStep from './BuildStep';
import InstructionStep from './InstructionStep';

function BuildFlow() {
  return (
    <div className="min-h-screen bg-white relative">
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="step/:stepId" element={<BuildStep />} />
        <Route path="instruction/:stepId" element={<InstructionStep />} />
      </Routes>
    </div>
  );
}

export default BuildFlow;
