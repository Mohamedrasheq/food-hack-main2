'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, CreditCard, Banknote } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface OrderItem {
  id: number
  name: string
  quantity: number
  totalPrice: number
}

interface OrderDetails {
  items: OrderItem[]
  total: number
}

export default function SuccessPayment() {
  const router = useRouter()
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showCancellation, setShowCancellation] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card')
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  })

  useEffect(() => {
    const cartData = localStorage.getItem('cart')
    if (cartData) {
      setOrderDetails(JSON.parse(cartData))
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowSuccess(true)
  }

  if (showCancellation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block text-red-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.div>
            
            <h1 className="text-2xl font-bold text-gray-800 mt-4">Order Cancelled</h1>
            <p className="text-gray-600 mt-2">
              {paymentMethod === 'card' 
                ? 'Your payment will be refunded to your card within 5-7 business days.'
                : 'Your order has been cancelled successfully.'}
            </p>
            
            <button
              onClick={() => router.push('/menus/1')}
              className="mt-8 w-full bg-primary-indigo text-white py-3 rounded-md font-medium hover:bg-primary-indigo/90 transition-colors"
            >
              Return to Menu
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block"
            >
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
            </motion.div>
            
            <h1 className="text-2xl font-bold text-gray-800 mt-4">Order Confirmed!</h1>
            <p className="text-gray-600 mt-2">
              {paymentMethod === 'card' 
                ? 'Payment successful! Thank you for your order.'
                : 'Your order will be delivered soon. Please keep cash ready for delivery.'}
            </p>

            {/* Bill Details Section */}
            <div className="mt-8 text-left border-t pt-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-3">
                {orderDetails?.items.map((item: OrderItem) => (
                  <div key={item.id} className="flex justify-between text-gray-600">
                    <span>{item.name} × {item.quantity}</span>
                    <span>${item.totalPrice.toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total Amount</span>
                    <span className="text-primary-indigo">${orderDetails?.total.toFixed(2)}</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    {paymentMethod === 'card' ? (
                      <div className="flex items-center justify-end">
                        <CreditCard size={16} className="mr-2" />
                        <span>Paid with Card ending in {cardDetails.number.slice(-4)}</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end">
                        <Banknote size={16} className="mr-2" />
                        <span>Cash on Delivery</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4 mt-8">
              <button
                onClick={() => router.push('/menus/1')}
                className="flex-1 bg-primary-indigo text-white py-3 rounded-md font-medium hover:bg-primary-indigo/90 transition-colors"
              >
                Return to Menu
              </button>
              <button
                onClick={() => setShowCancellation(true)}
                className="flex-1 bg-white text-red-500 border-2 border-red-500 py-3 rounded-md font-medium hover:bg-red-50 transition-colors"
              >
                Cancel Order
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
      >
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Payment Method</h1>
          <p className="text-gray-600 mt-2">Total: ${orderDetails?.total?.toFixed(2)}</p>
        </div>

        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setPaymentMethod('card')}
            className={`flex-1 p-4 rounded-lg border-2 transition-all ${
              paymentMethod === 'card'
                ? 'border-primary-indigo bg-primary-indigo/5'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <CreditCard className={`w-8 h-8 mx-auto ${
              paymentMethod === 'card' ? 'text-primary-indigo' : 'text-gray-400'
            }`} />
            <p className={`mt-2 font-medium ${
              paymentMethod === 'card' ? 'text-primary-indigo' : 'text-gray-500'
            }`}>Card Payment</p>
          </button>

          <button
            onClick={() => setPaymentMethod('cash')}
            className={`flex-1 p-4 rounded-lg border-2 transition-all ${
              paymentMethod === 'cash'
                ? 'border-primary-indigo bg-primary-indigo/5'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Banknote className={`w-8 h-8 mx-auto ${
              paymentMethod === 'cash' ? 'text-primary-indigo' : 'text-gray-400'
            }`} />
            <p className={`mt-2 font-medium ${
              paymentMethod === 'cash' ? 'text-primary-indigo' : 'text-gray-500'
            }`}>Cash on Delivery</p>
          </button>
        </div>

        {paymentMethod === 'card' ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className="w-full px-4 py-2 border rounded-md focus:ring-primary-indigo focus:border-primary-indigo"
                value={cardDetails.number}
                onChange={(e) => {
                  let value = e.target.value.replace(/\s/g, '')
                  if (value.length > 16) return
                  value = value.replace(/(\d{4})/g, '$1 ').trim()
                  setCardDetails({ ...cardDetails, number: value })
                }}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-2 border rounded-md focus:ring-primary-indigo focus:border-primary-indigo"
                value={cardDetails.name}
                onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  maxLength={5}
                  className="w-full px-4 py-2 border rounded-md focus:ring-primary-indigo focus:border-primary-indigo"
                  value={cardDetails.expiry}
                  onChange={(e) => {
                    let value = e.target.value.replace('/', '')
                    if (value.length > 4) return
                    if (value.length > 2) {
                      value = value.slice(0, 2) + '/' + value.slice(2)
                    }
                    setCardDetails({ ...cardDetails, expiry: value })
                  }}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                <input
                  type="text"
                  placeholder="123"
                  maxLength={3}
                  className="w-full px-4 py-2 border rounded-md focus:ring-primary-indigo focus:border-primary-indigo"
                  value={cardDetails.cvv}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '')
                    setCardDetails({ ...cardDetails, cvv: value })
                  }}
                  required
                />
              </div>
            </div>
          </form>
        ) : (
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-yellow-800 text-sm">
              Please keep ${orderDetails?.total?.toFixed(2)} ready for delivery. Our delivery partner will collect the cash upon delivery.
            </p>
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-primary-indigo text-white py-3 rounded-md font-medium hover:bg-primary-indigo/90 transition-colors mt-6"
        >
          {paymentMethod === 'card' ? `Pay $${orderDetails?.total?.toFixed(2)}` : 'Confirm Order'}
        </button>
      </motion.div>
    </div>
  )
} 