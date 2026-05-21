import { motion } from 'framer-motion'
import { AlertTriangle, CheckCircle2 } from 'lucide-react'
import NeonButton from './NeonButton'

function AlertModal({ open, loading, onClose }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-primary/40 px-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="w-full max-w-md rounded-[2rem] border border-pale-gray bg-surface p-6 shadow-xl shadow-primary/10"
      >
        <div className="mb-1 h-1.5 rounded-full bg-accent" aria-hidden />
        <div className="mb-4 mt-4 flex items-center gap-3">
          {loading ? (
            <AlertTriangle className="animate-pulse text-[#b45309]" />
          ) : (
            <CheckCircle2 className="text-emerald-600" />
          )}
          <h3 className="text-lg font-semibold text-primary">
            {loading ? 'Sending emergency SOS...' : 'SOS sent successfully'}
          </h3>
        </div>
        <p className="text-sm text-mid-gray">
          {loading
            ? 'Notifying guardian and nearest control room in real-time.'
            : 'Guardian and police alerts are active. Continue monitoring from dashboard.'}
        </p>
        <NeonButton onClick={onClose} className="mt-6 w-full !rounded-2xl">
          Close
        </NeonButton>
      </motion.div>
    </div>
  )
}

export default AlertModal
