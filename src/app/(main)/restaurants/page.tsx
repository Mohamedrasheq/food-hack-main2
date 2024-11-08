'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const restaurants = [
  { id: 1, name: "Gourmet Delight", cuisine: "French", rating: 4.8, image: "/r1.jpg" },
  { id: 2, name: "Sushi Haven", cuisine: "Japanese", rating: 4.6, image: "/r2.jpeg" },
  { id: 3, name: "Spice Bazaar", cuisine: "Indian", rating: 4.5, image: "/r3.jpeg" },
  { id: 4, name: "Pasta Paradise", cuisine: "Italian", rating: 4.7, image: "/r4.jpg" },
  { id: 5, name: "Taco Fiesta", cuisine: "Mexican", rating: 4.4, image: "/r5.jpeg" },
  { id: 6, name: "Dragon Wok", cuisine: "Chinese", rating: 4.6, image: "/r6.jpg" },
  { id: 7, name: "Mediterranean Oasis", cuisine: "Greek", rating: 4.7, image: "/r7.jpg" },
  { id: 8, name: "Seoul Kitchen", cuisine: "Korean", rating: 4.5, image: "/r8.jpg" },
  { id: 9, name: "Veggie Paradise", cuisine: "Vegetarian", rating: 4.3, image: "/r9.jpeg" },
  { id: 10, name: "BBQ Junction", cuisine: "American", rating: 4.8, image: "/r1.jpg" }
]

export default function RestaurantsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-4xl font-bold text-center text-gray-800 mb-12"
        >
          Restaurants
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative max-w-md mx-auto mb-8"
        >
          <input
            type="text"
            placeholder="Search restaurants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-indigo pl-4 pr-10"
          />
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </motion.div>

        <motion.ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant, index) => (
            <Link href={`/menus/${restaurant.id}`} key={restaurant.id}>
              <motion.li
                className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="p-6">
                  <div className="h-48 relative mb-4 rounded-t-lg overflow-hidden">
                    <Image
                      src={restaurant.image}
                      alt={restaurant.name}
                      fill
                      style={{ objectFit: "cover" }}
                      className="transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <h2 className="text-2xl font-semibold mb-2">{restaurant.name}</h2>
                  <p className="text-gray-600 mb-2">{restaurant.cuisine} Cuisine</p>
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span>{restaurant.rating}</span>
                  </div>
                </div>
              </motion.li>
            </Link>
          ))}
        </motion.ul>
      </div>
    </div>
  )
}