'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Eye, EyeOff, ArrowLeft } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function AuthForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const mode = searchParams.get('mode') || 'login'

  const [isLogin, setIsLogin] = useState(mode === 'login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    setIsLogin(mode === 'login')
  }, [mode])

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) {
          // Handle specific error cases
          if (error.message.includes('Email not confirmed')) {
            setError('Please check your email and click the confirmation link, or try signing up again.')
          } else {
            setError(error.message)
          }
          return
        }
        if (data.user) {
          setMessage('Successfully signed in! Redirecting...')
          setTimeout(() => {
            router.push('/dashboard')
          }, 1000)
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: undefined // Disable email confirmation
          }
        })
        if (error) {
          setError(error.message)
          return
        }
        if (data.user) {
          // Automatically sign in the user after successful signup
          setMessage('Account created! Signing you in...')
          
          // Try to sign in immediately
          const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
          })
          
          if (signInError) {
            setError('Account created, but please sign in manually.')
            setTimeout(() => {
              setIsLogin(true)
            }, 2000)
          } else {
            setMessage('Successfully signed in! Redirecting...')
            setTimeout(() => {
              router.push('/dashboard')
            }, 1000)
          }
        }
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred')
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

        <div className="bg-white/90 backdrop-blur-xl border-4 border-orange-200 rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 via-red-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-white font-bold text-2xl">🍽️</span>
            </div>
            <h2 className="text-4xl font-black bg-gradient-to-r from-orange-500 via-red-500 to-green-500 bg-clip-text text-transparent mb-2 uppercase tracking-wide">
              {isLogin ? '🍽️ Welcome back!' : '🚀 Join Smart Pantry'}
            </h2>
            <p className="text-gray-700 font-medium text-lg">
              {isLogin ? 'Sign in to your account' : 'Create your free account'}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-gray-800 text-sm font-bold mb-2 uppercase tracking-wide">
                📧 Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-4 rounded-lg bg-white/80 border-2 border-orange-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-orange-500 transition-all duration-200"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-gray-800 text-sm font-bold mb-2 uppercase tracking-wide">
                🔒 Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="w-full px-4 py-4 rounded-lg bg-white/80 border-2 border-orange-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-orange-500 transition-all duration-200 pr-12"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
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
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-xl p-4"
              >
                <p className="text-red-600 text-sm font-medium">❌ {error}</p>
              </motion.div>
            )}

            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4"
              >
                <p className="text-green-600 text-sm font-medium">✅ {message}</p>
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 via-red-500 to-green-500 text-white font-bold py-4 rounded-xl hover:from-orange-600 hover:via-red-600 hover:to-green-600 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide text-lg shadow-lg hover:shadow-orange-500/30"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {isLogin ? '🍽️ Signing in...' : '🚀 Creating account...'}
                </>
              ) : (
                isLogin ? '🍽️ Sign In' : '🚀 Create Account'
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-700 text-sm font-medium">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-orange-600 hover:text-orange-700 hover:underline font-bold"
              >
                {isLogin ? '🚀 Sign up' : '🍽️ Sign in'}
              </button>
            </p>
          </div>

        </div>
      </motion.div>
    </div>
  )
}