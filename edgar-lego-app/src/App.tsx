import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BuildFlow from './pages/build/BuildFlow';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/build" replace />} />
        <Route path="/build/*" element={<BuildFlow />} />
      </Routes>
    </Router>
  );
}

export default App;
