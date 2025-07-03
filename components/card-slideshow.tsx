"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

const cardImages = [
  "/images/visa.png",
  "/images/mastercard.png",
  "/images/paypal.png",
  "/images/applepay.png",
  "/images/shopify.png",
  "/images/westernunion.png",
  "/images/ebay.png",
]

export function CardSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cardImages.length)
    }, 1500) // Change every 1.5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex space-x-1 transition-all duration-300">
      <Image src="/images/visa.png" alt="Visa" width={24} height={16} className="opacity-80" />
      <Image src="/images/mastercard.png" alt="MasterCard" width={24} height={16} className="opacity-80" />
      <div className="relative w-6 h-4 overflow-hidden">
        <Image
          src={cardImages[currentIndex] || "/placeholder.svg"}
          alt="Payment Method"
          width={24}
          height={16}
          className="absolute inset-0 transition-opacity duration-500"
          key={currentIndex}
        />
      </div>
    </div>
  )
}
