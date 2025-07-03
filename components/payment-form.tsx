"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, MessageCircle, Loader2 } from "lucide-react"
import Image from "next/image"
import { CardSlideshow } from "./card-slideshow"

type PaymentState = "form" | "processing" | "success"

export function PaymentForm() {
  const [paymentState, setPaymentState] = useState<PaymentState>("form")
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const formatPhoneNumber = (phone: string) => {
    // Remove any spaces, dashes, or plus signs
    const cleaned = phone.replace(/[\s\-+]/g, "")

    // Handle different formats
    if (cleaned.startsWith("254")) {
      // Convert 254XXXXXXXXX to 07XXXXXXXX
      return "0" + cleaned.substring(3)
    } else if (cleaned.startsWith("01")) {
      // Convert 01XXXXXXXX to 07XXXXXXXX (Safaricom old format)
      return "07" + cleaned.substring(2)
    } else if (cleaned.startsWith("07") || cleaned.startsWith("01")) {
      return cleaned
    }

    return cleaned
  }

  const handleMpesaPayment = async () => {
    if (!formData.phoneNumber) {
      alert("Please enter your M-Pesa phone number")
      return
    }

    const formattedPhone = formatPhoneNumber(formData.phoneNumber)

    setPaymentState("processing")

    try {
      const response = await fetch("https://av-backend-qp7e.onrender.com/api/stk/stk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: formattedPhone,
          amount: 100,
        }),
      })

      if (response.ok) {
        setPaymentState("success")
      } else {
        throw new Error("Payment failed")
      }
    } catch (error) {
      console.error("Payment error:", error)
      alert("Payment failed. Please try again.")
      setPaymentState("form")
    }
  }

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(
      "Hi, I've completed my payment for the Aviator Predictor. Here's my payment proof.",
    )
    window.open(`https://wa.me/13053897291?text=${message}`, "_blank")
  }

  if (paymentState === "success") {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">
            Your STK push has been sent successfully. Please complete the payment on your phone.
          </p>
          <div className="space-y-3">
            <Button onClick={handleWhatsAppContact} className="w-full bg-green-600 hover:bg-green-700">
              <MessageCircle className="w-4 h-4 mr-2" />
              Send Payment Proof via WhatsApp
            </Button>
            <Button onClick={() => setPaymentState("form")} variant="outline" className="w-full">
              Back to Payment Form
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-gray-900">Aviator Predictor Access</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Apple Pay Button */}
        <Button className="w-full h-12 bg-black hover:bg-gray-800 text-white rounded-lg flex items-center justify-center px-4">
          <div className="w-full flex justify-center">
            <Image
              src="/images/applepay.png"
              alt="Apple Pay"
              width={120}
              height={40}
              className="object-contain max-w-full h-8"
            />
          </div>
        </Button>

        <div className="text-center text-gray-500 text-sm">or</div>

        {/* M-Pesa Global Section */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900">M-Pesa Global</h3>

          <div className="space-y-3">
            <div>
              <Label htmlFor="fullName" className="text-gray-700">
                Full Name
              </Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="amount" className="text-gray-700">
                Amount (USD)
              </Label>
              <Input id="amount" value="$100.00" disabled className="mt-1 bg-gray-50" />
            </div>

            <div>
              <Label htmlFor="phoneNumber" className="text-gray-700">
                M-Pesa Phone Number
              </Label>
              <Input
                id="phoneNumber"
                placeholder="+254XXXXXXXXX or 07XXXXXXXX"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter your M-Pesa phone number (format: +254XXXXXXXXX, 254XXXXXXXXX, or 07XXXXXXXX)
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Card Payment Section */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900">Card Payment</h3>
          <p className="text-sm text-gray-600">Card Information</p>

          <div className="space-y-3">
            <div className="relative">
              <Input
                placeholder="1234 1234 1234 1234"
                value="1234 1234 1234 1234"
                disabled
                className="pr-20 bg-gray-50"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <CardSlideshow />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="expiry" className="text-gray-700">
                  Expiry Date
                </Label>
                <Input id="expiry" placeholder="MM/YY" value="12/28" disabled className="mt-1 bg-gray-50" />
              </div>
              <div>
                <Label htmlFor="cvc" className="text-gray-700">
                  CVC
                </Label>
                <Input id="cvc" placeholder="CVC" value="123" disabled className="mt-1 bg-gray-50" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-black text-white p-3 rounded-lg text-center">
          <p className="text-sm font-medium">Aviator Predictor App</p>
          <p className="text-xs opacity-80">Pay with Stripe (credit cards, bank transfers, etc.)</p>
        </div>

        <Button
          onClick={handleMpesaPayment}
          disabled={paymentState === "processing"}
          className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg font-semibold disabled:opacity-50"
        >
          {paymentState === "processing" ? (
            <div className="flex items-center justify-center">
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Processing Payment...
            </div>
          ) : (
            "Pay $100.00"
          )}
        </Button>

        <div className="text-center text-xs text-gray-500">
          Powered by <span className="font-semibold">stripe</span>
        </div>
      </CardContent>
    </Card>
  )
}
