"use client"

export function Footer() {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-lg shadow text-white text-sm font-semibold flex items-center gap-1">
              <span>Powered by</span>
              <span className="uppercase tracking-wider">stripe</span>
              <span className="mx-2 text-white/60">|</span>
              <span className="underline cursor-pointer">Terms</span>
              <span className="mx-1 text-white/60">·</span>
              <span className="underline cursor-pointer">Privacy</span>
            </div>
          </div>
          <div className="text-xs text-gray-400 mt-2">
            © {new Date().getFullYear()} Aviator Predictor App. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}