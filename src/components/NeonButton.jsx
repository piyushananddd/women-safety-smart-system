import { motion } from 'framer-motion'

function NeonButton({ children, className = '', ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 320, damping: 18 }}
      className={`rounded-xl bg-accent px-4 py-2.5 font-semibold text-primary shadow-md shadow-primary/10 transition hover:brightness-95 ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export default NeonButton
