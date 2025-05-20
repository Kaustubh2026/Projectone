/**
 * Payment.js
 * 
 * Payment component for NatureKids that handles payment processing
 * for activity bookings.
 * 
 * Key Features:
 * - Payment form with card details
 * - Basic validation
 * - Payment confirmation
 * - Error handling
 * 
 * Dependencies:
 * - React Hooks (useState)
 * - Styled Components
 * - React Icons
 * 
 * @author NatureKids Team
 * @version 1.0.0
 */

import React, { useState } from 'react';
import styled from 'styled-components';
import { FaCreditCard, FaLock } from 'react-icons/fa';

const PaymentContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 0 auto;
`;

const PaymentHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  h2 {
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #7f8c8d;
    font-size: 0.9rem;
  }
`;

const PaymentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const CardDetails = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 1rem;
`;

const SubmitButton = styled.button`
  background: #3498db;
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background 0.3s;
  
  &:hover {
    background: #2980b9;
  }
  
  &:disabled {
    background: #bdc3c7;
    cursor: not-allowed;
  }
`;

const SecurePayment = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-top: 1rem;
`;

const Payment = ({ amount, onPaymentComplete }) => {
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsProcessing(true);

    // Basic validation
    if (!paymentDetails.cardNumber || !paymentDetails.cardName || 
        !paymentDetails.expiryMonth || !paymentDetails.expiryYear || 
        !paymentDetails.cvv) {
      setError('Please fill in all fields');
      setIsProcessing(false);
      return;
    }

    // Simulate payment processing
    try {
      // In a real application, this would be an API call to a payment processor
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful payment
      onPaymentComplete({
        success: true,
        transactionId: 'TXN' + Date.now(),
        amount: amount
      });
    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <PaymentContainer>
      <PaymentHeader>
        <h2>Complete Your Payment</h2>
        <p>Total Amount: ₹{amount}</p>
      </PaymentHeader>

      <PaymentForm onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Card Number</Label>
          <Input
            type="text"
            name="cardNumber"
            placeholder="1234 5678 9012 3456"
            value={paymentDetails.cardNumber}
            onChange={handleInputChange}
            maxLength="19"
          />
        </FormGroup>

        <FormGroup>
          <Label>Cardholder Name</Label>
          <Input
            type="text"
            name="cardName"
            placeholder="John Doe"
            value={paymentDetails.cardName}
            onChange={handleInputChange}
          />
        </FormGroup>

        <CardDetails>
          <FormGroup>
            <Label>Expiry Month</Label>
            <Input
              type="text"
              name="expiryMonth"
              placeholder="MM"
              value={paymentDetails.expiryMonth}
              onChange={handleInputChange}
              maxLength="2"
            />
          </FormGroup>

          <FormGroup>
            <Label>Expiry Year</Label>
            <Input
              type="text"
              name="expiryYear"
              placeholder="YY"
              value={paymentDetails.expiryYear}
              onChange={handleInputChange}
              maxLength="2"
            />
          </FormGroup>

          <FormGroup>
            <Label>CVV</Label>
            <Input
              type="text"
              name="cvv"
              placeholder="123"
              value={paymentDetails.cvv}
              onChange={handleInputChange}
              maxLength="3"
            />
          </FormGroup>
        </CardDetails>

        {error && <p style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p>}

        <SubmitButton type="submit" disabled={isProcessing}>
          <FaCreditCard />
          {isProcessing ? 'Processing...' : 'Pay Now'}
        </SubmitButton>

        <SecurePayment>
          <FaLock />
          Secure Payment
        </SecurePayment>
      </PaymentForm>
    </PaymentContainer>
  );
};

export default Payment; 