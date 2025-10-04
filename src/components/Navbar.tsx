'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { Package, User, LogOut } from 'lucide-react'
import Link from 'next/link'

interface NavbarProps {
  variant?: 'homepage' | 'app' | 'dashboard'
}

export default function Navbar({ variant = 'homepage' }: NavbarProps) {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUser()
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    } catch (error) {
      console.error('Error checking user:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const navbarClasses = "fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-orange-100/95 via-yellow-50/95 to-green-100/95 backdrop-blur-md border-b-2 border-orange-200 py-4"

  const logoClasses = "text-2xl font-black bg-gradient-to-r from-orange-500 via-red-500 to-green-500 bg-clip-text text-transparent"

  const iconClasses = "w-7 h-7 text-orange-500"

  if (loading) {
    return (
      <nav className={navbarClasses}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Package className={iconClasses} />
              <h1 className={logoClasses}>Smart Pantry</h1>
            </Link>
          </div>
          <div className="w-32 h-8 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </nav>
    )
  }

  return (
    <nav className={navbarClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <Package className={iconClasses} />
            <h1 className={logoClasses}>Smart Pantry</h1>
          </Link>
        </div>
        
        <div className="flex items-center space-x-6">
          {user ? (
            <div className="flex items-center space-x-4">
              <Link 
                href="/dashboard" 
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 hover:scale-105 shadow-lg hover:shadow-orange-500/30"
              >
                <User className="w-4 h-4" />
                Dashboard
              </Link>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 hover:scale-105 shadow-lg hover:shadow-red-500/30"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-6">
              <Link 
                href="/sign-in" 
                className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
              >
                🍽️ Sign In
              </Link>
              <Link 
                href="/auth?mode=signup" 
                className="px-8 py-4 bg-gradient-to-r from-orange-500 via-red-500 to-green-500 text-white rounded-xl hover:from-orange-600 hover:via-red-600 hover:to-green-600 hover:scale-105 transition-all duration-300 font-bold text-lg uppercase tracking-wide shadow-lg hover:shadow-orange-500/30"
              >
                🚀 Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
