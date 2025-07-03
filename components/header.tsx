"use client"

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-center">
          <img
            src="/img1.png"
            alt="Aviator Predictor Header"
            className="object-contain"
            style={{ width: '720px', height: '300px', maxWidth: '1000px', margin: '-112px auto;' }}
          />
        </div>
      </div>
    </header>
  )
}
