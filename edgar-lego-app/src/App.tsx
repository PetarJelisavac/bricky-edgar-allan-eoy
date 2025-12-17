import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import OrderFlow from './pages/order/OrderFlow';
import BuildFlow from './pages/build/BuildFlow';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order/*" element={<OrderFlow />} />
        <Route path="/build/*" element={<BuildFlow />} />
      </Routes>
    </Router>
  );
}

export default App;
