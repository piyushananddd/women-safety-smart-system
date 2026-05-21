import { motion } from 'framer-motion'
import { Bell, LogOut, Search, Shield } from 'lucide-react'
import NeonButton from './NeonButton'

function Navbar({ onLogout, variant = 'light' }) {
  const isBrand = variant === 'safeguard'

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      className={
        isBrand
          ? 'mb-5 flex items-center justify-between rounded-[2rem] border border-pale-gray bg-surface px-4 py-3 shadow-md shadow-primary/5 md:px-6'
          : 'mb-5 flex items-center justify-between rounded-2xl border border-pale-gray bg-surface px-4 py-3 shadow-sm md:px-6'
      }
    >
      <div className="flex items-center gap-3">
        <div
          className={
            isBrand
              ? 'rounded-2xl bg-accent p-2.5 shadow-sm ring-1 ring-pale-gray'
              : 'rounded-xl bg-off-white p-2'
          }
        >
          <Shield className={isBrand ? 'text-primary' : 'text-mid-gray'} size={18} />
        </div>
        <div>
          <p className={isBrand ? 'text-sm font-medium text-mid-gray' : 'text-sm text-mid-gray'}>
            SafeGuardHer · Women Safety AI
          </p>
          <p className="text-base font-semibold text-primary">Smart System Dashboard</p>
        </div>
      </div>
      <div className="flex items-center gap-2 md:gap-3">
        <label
          className={
            isBrand
              ? 'hidden items-center gap-2 rounded-2xl border border-pale-gray bg-off-white px-3 py-2 lg:flex'
              : 'hidden items-center gap-2 rounded-xl border border-pale-gray bg-off-white px-3 py-2 lg:flex'
          }
        >
          <Search size={14} className="text-light-gray" />
          <input
            type="text"
            placeholder="Search..."
            className="w-36 bg-transparent text-sm text-primary outline-none md:w-40 placeholder:text-light-gray"
          />
        </label>
        <button
          type="button"
          className={
            isBrand
              ? 'rounded-xl border border-pale-gray bg-off-white p-2 text-mid-gray hover:bg-pale-gray/40'
              : 'rounded-lg border border-pale-gray p-2 text-mid-gray'
          }
        >
          <Bell size={16} />
        </button>
        <img
          src="https://i.pravatar.cc/80?img=32"
          alt="Profile"
          className={
            isBrand
              ? 'h-10 w-10 rounded-full border-2 border-pale-gray shadow-sm ring-2 ring-pale-gray/80'
              : 'h-10 w-10 rounded-full border border-pale-gray'
          }
        />
        <NeonButton
          onClick={onLogout}
          className={
            isBrand
              ? 'inline-flex items-center gap-2 !rounded-2xl !bg-primary !text-white !shadow-md hover:!bg-primary/90'
              : ''
          }
        >
          <LogOut size={16} />
          Logout
        </NeonButton>
      </div>
    </motion.header>
  )
}

export default Navbar
