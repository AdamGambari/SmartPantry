'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { motion } from 'framer-motion'
import { ArrowLeft, Mail, Eye, EyeOff, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
      } else if (data.user) {
        router.push('/dashboard')
      }
    } catch (err: any) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-50 to-green-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-orange-600 transition-colors font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to home
          </Link>
        </div>

        <div className="bg-white/90 backdrop-blur-xl border-4 border-orange-200 p-8 shadow-2xl rounded-3xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black bg-gradient-to-r from-orange-500 via-red-500 to-green-500 bg-clip-text text-transparent mb-2 uppercase tracking-wide">🍽️ Welcome Back</h1>
            <p className="text-gray-700 font-medium text-lg">Sign in to Smart Pantry</p>
          </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-800 text-sm font-bold mb-2 uppercase tracking-wide">
              📧 Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-500" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-4 bg-white/80 border-2 border-orange-300 text-gray-800 placeholder-gray-500 focus:border-orange-500 focus:outline-none font-medium rounded-lg"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-800 text-sm font-bold mb-2 uppercase tracking-wide">
              🔒 Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-4 bg-white/80 border-2 border-orange-300 text-gray-800 placeholder-gray-500 focus:border-orange-500 focus:outline-none font-medium pr-12 rounded-lg"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-orange-500 hover:text-orange-600 transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-xl p-4">
              <p className="text-red-600 text-sm font-medium text-center">❌ {error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 via-red-500 to-green-500 text-white px-8 py-4 rounded-xl hover:from-orange-600 hover:via-red-600 hover:to-green-600 hover:scale-105 transition-all duration-300 font-bold text-lg uppercase tracking-wide flex items-center justify-center gap-2 shadow-lg hover:shadow-orange-500/30"
          >
            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
            🍽️ Sign In
          </button>
        </form>

          <div className="mt-6 text-center">
            <p className="text-gray-700 text-sm font-medium">
              Don't have an account?{' '}
              <Link href="/auth?mode=signup" className="text-orange-600 hover:text-orange-700 hover:underline font-bold">
                🚀 Sign up
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
