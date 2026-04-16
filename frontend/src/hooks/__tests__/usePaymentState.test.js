import { renderHook, act } from '@testing-library/react';
import usePaymentState from '../usePaymentState';

// Mock the usePayment hook
jest.mock('../usePayment', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    paymentData: null,
    loading: false,
    error: null,
    initiatePayment: jest.fn(),
    verifyPayment: jest.fn()
  }))
}));

describe('usePaymentState', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with correct default values', () => {
    const { result } = renderHook(() => usePaymentState());
    
    expect(result.current.paymentData).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should initiate payment', async () => {
    const mockInitiatePayment = jest.fn().mockResolvedValue({ orderId: 'order_123' });
    require('../usePayment').default.mockImplementation(() => ({
      paymentData: null,
      loading: false,
      error: null,
      initiatePayment: mockInitiatePayment,
      verifyPayment: jest.fn()
    }));

    const { result } = renderHook(() => usePaymentState());
    
    const orderDetails = { amount: 100, currency: 'INR' };
    
    await act(async () => {
      await result.current.handleInitiatePayment(orderDetails);
    });

    expect(mockInitiatePayment).toHaveBeenCalledWith(orderDetails);
  });

  it('should verify payment', async () => {
    const mockVerifyPayment = jest.fn().mockResolvedValue({ success: true });
    require('../usePayment').default.mockImplementation(() => ({
      paymentData: { orderId: 'order_123' },
      loading: false,
      error: null,
      initiatePayment: jest.fn(),
      verifyPayment: mockVerifyPayment
    }));

    const { result } = renderHook(() => usePaymentState());
    
    const paymentResponse = { razorpay_order_id: 'order_123', razorpay_payment_id: 'pay_123' };
    
    await act(async () => {
      await result.current.handleVerifyPayment(paymentResponse);
    });

    expect(mockVerifyPayment).toHaveBeenCalledWith(paymentResponse);
  });
});