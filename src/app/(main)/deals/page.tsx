'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useSpring, animated } from '@react-spring/web'
import { ArrowRight, Clock, Tag } from 'lucide-react'

// Add this interface before the Deal component
interface Deal {
  id: number;
  title: string;
  description: string;
  details: string;
}

const deals = [
  { id: 1, title: "BOGO Pizza!", description: "Buy 1 pizza, get 1 free!", details: "Double the pizza, double the fun. Order any large pizza, and your second one is on us!" },
  { id: 2, title: "Family Feast for $29.99", description: "2 Large Pizzas + 4 Sides + 4 Drinks", details: "Feed the whole crew! Perfect for family nights." },
  { id: 3, title: "20% Off Your First Order", description: "Save 20% on your first meal!", details: "New to us? Use code WELCOME20 and treat yourself to something delicious." },
  { id: 4, title: "Combo Meal: $12.99", description: "Main + Side + Drink", details: "A full meal for less! Sandwich, fries, and a drink." },
  { id: 5, title: "$5 Lunch Deals", description: "Sandwiches, wraps, and salads.", details: "Grab a quick, tasty lunch from 11 AM to 2 PM." },
  { id: 6, title: "Free Delivery on Orders $25+", description: "No delivery fee!", details: "Spend $25 and we'll deliver it free. Enjoy!" },
  { id: 7, title: "Date Night Deal: $19.99", description: "2 Entrees + 1 App + 1 Dessert", details: "Perfect for two. Dinner & dessert for just $19.99." },
  { id: 8, title: "Happy Hour: 50% Off", description: "50% off select items!", details: "4 PM – 6 PM, snacks & drinks on sale. Cheers!" },
  { id: 9, title: "Loyalty Points = Free Food", description: "Earn points with every order.", details: "The more you order, the more you save!" },
  { id: 10, title: "Midweek 15% Off", description: "15% off Monday-Thursday.", details: "Craving something tasty? Save 15% during the week." },
  { id: 11, title: "Free Dessert with Large Meal", description: "Free dessert on large orders!", details: "Order big, get sweet. Dessert's on us!" },
  { id: 12, title: "Meal Plan Discount", description: "Save 10% on weekly/monthly plans.", details: "Get healthy meals delivered and save big." },
  { id: 13, title: "Diet-Friendly 15% Off", description: "15% off vegan, keto, or gluten-free meals.", details: "Healthy eating just got cheaper!" },
  { id: 14, title: "10% Off for Students", description: "Show your student ID for 10% off.", details: "Studying hard? We've got your cravings covered." },
  { id: 15, title: "Flash Deal Fridays", description: "Mystery deal every Friday.", details: "Get ready for a surprise offer every week!" },
]

const Deal = ({ deal, index }: { deal: Deal; index: number }) => {
  const [isHovered, setIsHovered] = useState(false)

  const springProps = useSpring({
    scale: isHovered ? 1.05 : 1,
    boxShadow: isHovered ? '0 10px 20px rgba(0,0,0,0.2)' : '0 5px 10px rgba(0,0,0,0.1)',
  })

  return (
    <animated.div
      style={springProps}
      className="bg-white rounded-lg overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="p-6"
      >
        <h3 className="text-xl font-bold mb-2 text-gray-800">{deal.title}</h3>
        <p className="text-gray-600 mb-4">{deal.description}</p>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Clock size={16} className="mr-2" />
          <span>Limited time offer</span>
        </div>
        <p className="text-gray-700 mb-4">{deal.details}</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors flex items-center">
          Claim Deal
          <ArrowRight size={16} className="ml-2" />
        </button>
      </motion.div>
    </animated.div>
  )
}

const Deals = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredDeals = deals.filter(deal =>
    deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deal.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Hot Deals & Offers</h1>
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search deals..."
            className="w-full p-4 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredDeals.map((deal, index) => (
            <Deal key={deal.id} deal={deal} index={index} />
          ))}
        </motion.div>
        {filteredDeals.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-600 mt-8"
          >
            No deals found. Try a different search term.
          </motion.p>
        )}
      </motion.div>
    </div>
  )
}

export default Deals