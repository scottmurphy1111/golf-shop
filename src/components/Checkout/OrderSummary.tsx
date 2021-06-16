import React from 'react';

const OrderSummary = () => {
  const handlePayNow = () => {
    console.log('pay now');
  };

  return (
    <div>
      <h3>Order Summary</h3>
      <button onClick={handlePayNow}>Pay Now</button>
    </div>
  );
};

export default OrderSummary;
