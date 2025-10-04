import AuthForm from '@/components/AuthForm'
import { Suspense } from 'react'

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <AuthForm />
    </Suspense>
  )
}