import { Routes, Route, Navigate } from 'react-router-dom';
import OrderStep1 from './OrderStep1';
import OrderStep2 from './OrderStep2';
import OrderStep3 from './OrderStep3';
import OrderStep4 from './OrderStep4';
import OrderStep5 from './OrderStep5';
import OrderConfirmation from './OrderConfirmation';

function OrderFlow() {
  return (
    <div className="min-h-screen bg-white">
      <Routes>
        <Route path="/" element={<Navigate to="step-1" replace />} />
        <Route path="step-1" element={<OrderStep1 />} />
        <Route path="step-2" element={<OrderStep2 />} />
        <Route path="step-3" element={<OrderStep3 />} />
        <Route path="step-4" element={<OrderStep4 />} />
        <Route path="step-5" element={<OrderStep5 />} />
        <Route path="confirmation" element={<OrderConfirmation />} />
      </Routes>
    </div>
  );
}

export default OrderFlow;
