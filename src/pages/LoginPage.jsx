import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import NeonButton from '../components/NeonButton'

function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const isValidEmail = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()),
    [form.email],
  )

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const nextErrors = {}

    if (!isValidEmail) nextErrors.email = 'Enter a valid email address'
    if (form.password.length < 6) nextErrors.password = 'Password must be at least 6 characters'

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setLoading(true)
    setTimeout(() => {
      localStorage.setItem('wss-auth', 'true')
      setLoading(false)
      navigate('/dashboard')
    }, 1200)
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4"
    >
      <div className="pointer-events-none absolute -left-24 -top-28 h-72 w-72 rounded-full bg-accent/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-pale-gray/40 blur-3xl" />

      <motion.form
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55 }}
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md rounded-3xl border border-pale-gray bg-surface p-7 shadow-lg shadow-primary/5 md:p-8"
      >
        <p className="text-sm font-medium text-mid-gray">Welcome back</p>
        <h1 className="mt-1 text-2xl font-bold text-primary">Women Safety Smart System</h1>
        <p className="mt-1 text-sm text-light-gray">Sign in to monitor alerts, cameras, and SOS.</p>

        <div className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm text-mid-gray">Email</span>
            <div className="flex items-center gap-2 rounded-xl border border-pale-gray bg-off-white px-3">
              <Mail size={16} className="text-light-gray" />
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="name@example.com"
                className="h-11 w-full bg-transparent text-sm text-primary outline-none placeholder:text-light-gray"
              />
            </div>
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
          </label>

          <label className="block">
            <span className="mb-2 block text-sm text-mid-gray">Password</span>
            <div className="flex items-center gap-2 rounded-xl border border-pale-gray bg-off-white px-3">
              <Lock size={16} className="text-light-gray" />
              <input
                type={showPass ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => handleChange('password', e.target.value)}
                placeholder="Enter secure password"
                className="h-11 w-full bg-transparent text-sm text-primary outline-none placeholder:text-light-gray"
              />
              <button type="button" onClick={() => setShowPass((prev) => !prev)} className="text-light-gray" aria-label="Toggle password">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
          </label>
        </div>

        <NeonButton type="submit" disabled={loading} className="mt-6 w-full disabled:opacity-70">
          {loading ? 'Authenticating...' : 'Secure Login'}
        </NeonButton>
      </motion.form>
    </motion.main>
  )
}

export default LoginPage
