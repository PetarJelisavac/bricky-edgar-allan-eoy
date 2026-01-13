import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BuildFlow from './pages/build/BuildFlow';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<BuildFlow />} />
      </Routes>
    </Router>
  );
}

export default App;
