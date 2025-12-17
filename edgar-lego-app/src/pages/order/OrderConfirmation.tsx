import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrderStore } from '../../store/orderStore';

function OrderConfirmation() {
  const navigate = useNavigate();
  const { userData, submitOrder, resetOrder } = useOrderStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await submitOrder();
      setIsSuccess(true);
      setTimeout(() => {
        resetOrder();
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('There was an error submitting your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-6">
          <div className="text-8xl">🎉</div>
          <h1 className="font-epilogue font-semibold text-4xl text-black">
            Order Submitted!
          </h1>
          <p className="text-gray-600 text-lg">
            We'll send your LEGO Edgar set soon. Check your email for confirmation.
          </p>
          <p className="text-gray-500">Redirecting to home...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <h1 className="font-epilogue font-semibold text-4xl text-black">
            Review Your Order
          </h1>
          <p className="mt-4 text-gray-600">
            Please confirm your information before submitting
          </p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Name</h3>
              <p className="text-lg font-medium">{userData.name}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
              <p className="text-lg font-medium">{userData.email}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Company</h3>
              <p className="text-lg font-medium">{userData.company}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Position</h3>
              <p className="text-lg font-medium capitalize">{userData.position}</p>
            </div>
            {userData.phone && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Phone</h3>
                <p className="text-lg font-medium">{userData.phone}</p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-1">
              Delivery Address
            </h3>
            <p className="text-lg font-medium whitespace-pre-line">
              {userData.address}
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => navigate('/order/step-3')}
            disabled={isSubmitting}
            className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-full
                       font-petrona italic text-lg hover:bg-gray-50 transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Edit
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 bg-lego-blue text-white px-6 py-3 rounded-full
                       font-petrona italic text-lg hover:bg-blue-600 transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Order'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;
