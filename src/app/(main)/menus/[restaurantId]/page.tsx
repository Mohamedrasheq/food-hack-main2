'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { Plus, Minus, Store } from 'lucide-react'

// Sample menu items data (you can replace this with your actual data source)
const menuItems = [
  // Starters
  { id: 1, name: "Spring Rolls", description: "Crispy vegetable rolls", price: 5.99, image: "/menu/spring-rolls.jpg", category: "Starters" },
  { id: 2, name: "Garlic Bread", description: "Toasted bread with garlic butter", price: 4.99, image: "/menu/garlic-bread.jpg", category: "Starters" },
  { id: 3, name: "Bruschetta", description: "Toasted bread with tomatoes and herbs", price: 6.99, image: "/menu/bruschetta.jpg", category: "Starters" },
  { id: 4, name: "Calamari", description: "Crispy fried squid rings", price: 8.99, image: "/menu/calamari.jpg", category: "Starters" },
  { id: 5, name: "Chicken Wings", description: "Spicy buffalo wings", price: 7.99, image: "/menu/wings.jpg", category: "Starters" },
  
  // Main Course
  { id: 6, name: "Grilled Salmon", description: "Fresh salmon with herbs", price: 24.99, image: "/menu/salmon.jpg", category: "Main Course" },
  { id: 7, name: "Beef Steak", description: "Premium cut with sauce", price: 29.99, image: "/menu/steak.jpg", category: "Main Course" },
  { id: 8, name: "Chicken Alfredo", description: "Creamy pasta with grilled chicken", price: 18.99, image: "/menu/alfredo.jpg", category: "Main Course" },
  { id: 9, name: "Vegetable Curry", description: "Mixed vegetables in curry sauce", price: 16.99, image: "/menu/curry.jpg", category: "Main Course" },
  { id: 10, name: "Lamb Chops", description: "Grilled lamb with mint sauce", price: 27.99, image: "/menu/lamb.jpg", category: "Main Course" },
  
  // Desserts
  { id: 11, name: "Chocolate Cake", description: "Rich chocolate layer cake", price: 6.99, image: "/menu/chocolate-cake.jpg", category: "Desserts" },
  { id: 12, name: "Ice Cream", description: "Assorted flavors", price: 4.99, image: "/menu/ice-cream.jpg", category: "Desserts" },
  { id: 13, name: "Tiramisu", description: "Classic Italian coffee dessert", price: 7.99, image: "/menu/tiramisu.jpg", category: "Desserts" },
  { id: 14, name: "Apple Pie", description: "Warm apple pie with vanilla ice cream", price: 6.99, image: "/menu/apple-pie.jpg", category: "Desserts" },
  { id: 15, name: "Cheesecake", description: "New York style cheesecake", price: 7.99, image: "/menu/cheesecake.jpg", category: "Desserts" },
  
  // Beverages
  { id: 16, name: "Fresh Juice", description: "Seasonal fruit juice", price: 3.99, image: "/menu/juice.jpg", category: "Beverages" },
  { id: 17, name: "Coffee", description: "Premium roasted coffee", price: 2.99, image: "/menu/coffee.jpg", category: "Beverages" },
  { id: 18, name: "Smoothie", description: "Mixed fruit smoothie", price: 4.99, image: "/menu/smoothie.jpg", category: "Beverages" },
  { id: 19, name: "Iced Tea", description: "House-made fresh iced tea", price: 2.99, image: "/menu/iced-tea.jpg", category: "Beverages" },
  { id: 20, name: "Lemonade", description: "Fresh squeezed lemonade", price: 3.49, image: "/menu/lemonade.jpg", category: "Beverages" }
]

interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
}

interface ItemCount {
  [key: number]: number
}

interface CartItem extends MenuItem {
  quantity: number
  totalPrice: number
}

interface Cart {
  items: CartItem[]
  total: number
}

const MenuSection = ({ title, items, onAddToCart }: { title: string, items: MenuItem[], onAddToCart: (item: MenuItem, quantity: number) => void }) => {
  const [itemCounts, setItemCounts] = useState<ItemCount>({})

  const incrementCount = (itemId: number) => {
    setItemCounts(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }))
  }

  const decrementCount = (itemId: number) => {
    setItemCounts(prev => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0)
    }))
  }

  const handleAddToCart = (item: MenuItem, quantity: number) => {
    if (quantity > 0) {
      onAddToCart(item, quantity)
      // Reset count after adding to cart
      setItemCounts(prev => ({
        ...prev,
        [item.id]: 0
      }))
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative h-48">
              <Image
                src={item.image}
                alt={item.name}
                fill
                style={{ objectFit: "cover" }}
                className="transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                <span className="text-primary-indigo font-bold">${item.price}</span>
              </div>
              <p className="text-gray-600 text-sm">{item.description}</p>
              
              {/* Count Controls */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => decrementCount(item.id)}
                    className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <Minus size={20} className="text-gray-600" />
                  </button>
                  
                  <span className="font-semibold text-lg min-w-[20px] text-center">
                    {itemCounts[item.id] || 0}
                  </span>
                  
                  <button
                    onClick={() => incrementCount(item.id)}
                    className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <Plus size={20} className="text-gray-600" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(item, itemCounts[item.id] || 0)}
                  className="bg-primary-indigo text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-indigo/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!itemCounts[item.id]}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default function MenuPage() {
  const params = useParams()
  const restaurantId = params.restaurantId as string
  const categories = Array.from(new Set(menuItems.map(item => item.category)))
  
  // Add cart state
  const [cart, setCart] = useState<Cart>({ items: [], total: 0 })
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Add cart management functions
  const addToCart = (item: MenuItem, quantity: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.items.find(cartItem => cartItem.id === item.id)
      
      if (existingItem) {
        // Update existing item
        const updatedItems = prevCart.items.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity, totalPrice: (cartItem.quantity + quantity) * cartItem.price }
            : cartItem
        )
        return {
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + item.totalPrice, 0)
        }
      } else {
        // Add new item
        const newItem: CartItem = {
          ...item,
          quantity,
          totalPrice: quantity * item.price
        }
        return {
          items: [...prevCart.items, newItem],
          total: prevCart.total + newItem.totalPrice
        }
      }
    })
  }

  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Update store button to show cart count and toggle cart view */}
      <div className="fixed top-4 right-4 z-50">
        <button 
          onClick={() => setIsCartOpen(true)}
          className="bg-primary-indigo text-white p-3 rounded-full shadow-lg hover:bg-primary-indigo/90 transition-all hover:scale-105 relative"
        >
          <Store size={24} />
          {cart.items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cart.items.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </button>
      </div>

      {/* Add cart modal */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full p-6 overflow-y-auto flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Your Cart</h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            
            {cart.items.length === 0 ? (
              <p className="text-gray-500">Your cart is empty</p>
            ) : (
              <>
                <div className="flex-grow">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-4 border-b">
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">${item.totalPrice.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-auto pt-6 border-t">
                  <div className="text-xl font-bold mb-4">
                    Total: ${cart.total.toFixed(2)}
                  </div>
                  <button 
                    onClick={() => {
                      setIsLoading(true)
                      try {
                        // Store cart in localStorage
                        localStorage.setItem('cart', JSON.stringify({
                          items: cart.items,
                          total: cart.total
                        }))
                        
                        setCart({ items: [], total: 0 })
                        setIsCartOpen(false)
                        router.push('/success-payment')
                      } catch (error) {
                        console.error('Error saving to localStorage:', error)
                        alert('Failed to save cart. Please try again.')
                      } finally {
                        setIsLoading(false)
                      }
                    }}
                    disabled={isLoading}
                    className="w-full bg-primary-indigo text-white py-3 rounded-md font-medium hover:bg-primary-indigo/90 transition-colors disabled:opacity-50"
                  >
                    {isLoading ? 'Processing...' : 'Pay Now'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Pass addToCart function to MenuSection */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-4xl font-bold text-center text-gray-800 mb-12"
        >
          Our Menu
        </motion.h1>

        {categories.map((category) => (
          <MenuSection
            key={category}
            title={category}
            items={menuItems.filter(item => item.category === category)}
            onAddToCart={addToCart}
          />
        ))}
      </div>
    </div>
  )
} 