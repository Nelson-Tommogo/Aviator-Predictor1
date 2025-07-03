"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { allReviews } from "@/data/reviews"

export function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % allReviews.length)
    }, 2500) // Auto-play every 2.5 seconds

    return () => clearInterval(interval)
  }, [])

  const visibleReviews = [
    allReviews[currentIndex],
    allReviews[(currentIndex + 1) % allReviews.length],
    allReviews[(currentIndex + 2) % allReviews.length],
  ]

  return (
    <div className="space-y-6 w-full">
      <div className="text-center">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Reviews</h2>
      </div>

      <div className="space-y-4 w-full">
        {visibleReviews.map((review, index) => (
          <Card
            key={`${review.id}-${currentIndex}`}
            className={`transition-all duration-700 w-full ${
              index === 0 ? "scale-105 shadow-lg border-green-200 bg-green-50" : "scale-100 shadow-md"
            }`}
          >
            <CardContent className="p-4 md:p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm md:text-base">{review.name}</h3>
                  <p className="text-xs md:text-sm text-gray-500">{review.location}</p>
                </div>
                <div className="flex">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>

              <p className="text-gray-700 mb-4 text-sm md:text-base">{review.text}</p>

              <div className="flex justify-between items-center">
                <div className="bg-green-100 text-green-800 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold">
                  Won {review.amount}
                </div>
                <div className="text-xs text-gray-400">Verified Winner</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center space-x-1">
        {Array.from({ length: Math.min(10, allReviews.length) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex % 10 ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-4 md:p-6 text-center">
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Join 50,000+ Winners!</h3>
          <p className="text-gray-700 mb-4 text-sm md:text-base">
            Our users have collectively won over <span className="font-bold text-green-600">$15.8 Million</span> using
            our predictor algorithm.
          </p>
          <div className="grid grid-cols-3 gap-2 md:gap-4 text-center">
            <div>
              <div className="text-lg md:text-2xl font-bold text-blue-600">99.9%</div>
              <div className="text-xs md:text-sm text-gray-600">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-lg md:text-2xl font-bold text-green-600">50,000+</div>
              <div className="text-xs md:text-sm text-gray-600">Happy Users</div>
            </div>
            <div>
              <div className="text-lg md:text-2xl font-bold text-purple-600">$15.8M+</div>
              <div className="text-xs md:text-sm text-gray-600">Total Winnings</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
