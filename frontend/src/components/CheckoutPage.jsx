import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function CheckoutPage() {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handlePayment = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('/api/admin/create-payment-intent', {
                amount: 1000,  // Amount in the smallest currency unit (e.g., cents for USD)
                currency: 'usd',
            });
            setClientSecret(response.data.clientSecret);

            const paymentResult = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (paymentResult.error) {
                setError(paymentResult.error.message);
            } else if (paymentResult.paymentIntent.status === 'succeeded') {
                alert('Payment successful!');
            }
        } catch (error) {
            console.error('Payment error:', error);
            setError('Failed to process payment.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Checkout</h1>

            <form onSubmit={handlePayment} className="max-w-md mx-auto">
                <CardElement className="border p-4 mb-4" />
                {error && <p className="text-red-500">{error}</p>}
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                    disabled={!stripe || loading}
                >
                    {loading ? 'Processing...' : 'Pay Now'}
                </button>
            </form>
        </div>
    );
}

export default function CheckoutPageWrapper() {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutPage />
        </Elements>
    );
}