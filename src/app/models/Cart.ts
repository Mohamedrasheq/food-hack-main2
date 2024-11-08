import mongoose from 'mongoose'

const CartItemSchema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  price: Number,
  image: String,
  category: String,
  quantity: Number,
  totalPrice: Number
})

const CartSchema = new mongoose.Schema({
  userId: String,
  items: [CartItemSchema],
  total: Number,
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.Cart || mongoose.model('Cart', CartSchema) 