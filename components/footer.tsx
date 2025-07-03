"use client"

export function Footer() {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center space-y-2">
          <div className="text-sm text-gray-500">
            Powered by <span className="font-semibold text-gray-900">stripe</span> | Terms Privacy
          </div>
          <div className="text-xs text-gray-400">
            © {new Date().getFullYear()} Aviator Predictor App. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
