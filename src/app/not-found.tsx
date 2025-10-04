import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-50 to-green-100 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-6xl font-black text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page not found</p>
        <Link 
          href="/" 
          className="bg-gradient-to-r from-orange-500 via-red-500 to-green-500 text-white px-8 py-3 rounded-xl hover:from-orange-600 hover:via-red-600 hover:to-green-600 transition-all duration-300 font-bold"
        >
          🏠 Back to Home
        </Link>
      </div>
    </div>
  )
}
