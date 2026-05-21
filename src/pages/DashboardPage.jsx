import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BellRing, Camera, LayoutDashboard, LocateFixed, ShieldAlert, Siren, TrafficCone } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import AlertModal from '../components/AlertModal'
import Card from '../components/Card'
import Navbar from '../components/Navbar'

const alertsSeed = [
  { id: 1, text: 'Guardian Notified' },
  { id: 2, text: 'Police Alert Sent' },
  { id: 3, text: 'Nearby Patrol Engaged' },
]

function DashboardPage() {
  const navigate = useNavigate()
  const [streetLightOn, setStreetLightOn] = useState(true)
  const [detections, setDetections] = useState(0)
  const [sosOpen, setSosOpen] = useState(false)
  const [sendingSos, setSendingSos] = useState(false)
  const [alerts, setAlerts] = useState(alertsSeed)
  const alertIdRef = useRef(10)

  useEffect(() => {
    const statusTimer = setInterval(() => {
      setStreetLightOn((prev) => !prev)
    }, 5000)
    return () => clearInterval(statusTimer)
  }, [])

  useEffect(() => {
    const movementTimer = setInterval(() => {
      setDetections((prev) => prev + Math.ceil(Math.random() * 2))
    }, 2600)
    return () => clearInterval(movementTimer)
  }, [])

  useEffect(() => {
    const alertTimer = setInterval(() => {
      const updates = [
        'Control Room Monitoring Active',
        'Route Heatmap Updated',
        'Emergency Network Standby',
      ]
      const nextText = updates[Math.floor(Math.random() * updates.length)]
      alertIdRef.current += 1
      setAlerts((prev) => [{ id: alertIdRef.current, text: nextText }, ...prev].slice(0, 5))
    }, 8000)
    return () => clearInterval(alertTimer)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('wss-auth')
    navigate('/login')
  }
const triggerSos = () => {

  setSosOpen(true)
  setSendingSos(true)

  setTimeout(() => {

    setSendingSos(false)

    alertIdRef.current += 1

    setAlerts((prev) => [
      {
        id: alertIdRef.current,
        text: 'Emergency SOS Activated'
      },
      ...prev
    ].slice(0, 5))

    window.location.href = "tel:+917979753935"

  }, 1000)
}

  const lightClasses = useMemo(
    () =>
      streetLightOn
        ? 'bg-emerald-500 shadow-[0_0_14px_rgba(16,185,129,0.7)]'
        : 'bg-red-500 shadow-[0_0_14px_rgba(239,68,68,0.7)]',
    [streetLightOn],
  )

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen overflow-hidden bg-background p-4 md:p-6"
    >
      <div className="pointer-events-none absolute -left-28 top-6 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-1/3 h-64 w-64 rounded-full bg-pale-gray/30 blur-3xl" />

      <div className="relative mx-auto grid max-w-[1500px] gap-6 lg:grid-cols-[260px_1fr] xl:gap-8">
        <aside className="hidden rounded-[2rem] border border-pale-gray bg-surface p-6 shadow-md shadow-primary/5 lg:block">
          <p className="mb-1 text-lg font-bold text-primary">SafeGuardHer</p>
          <p className="mb-5 text-xs text-mid-gray">Women Safety App · Dashboard</p>
          <nav className="space-y-2">
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-2xl bg-accent/25 px-3 py-2.5 text-sm font-semibold text-primary ring-1 ring-pale-gray"
            >
              <LayoutDashboard size={16} className="text-primary" />
              Dashboard
            </button>
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-2xl px-3 py-2.5 text-sm text-mid-gray transition hover:bg-off-white"
            >
              <ShieldAlert size={16} />
              Alerts
            </button>
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-2xl px-3 py-2.5 text-sm text-mid-gray transition hover:bg-off-white"
            >
              <Camera size={16} />
              AI Camera
            </button>
          </nav>
          <div className="mt-6 rounded-2xl border border-pale-gray bg-primary p-4 text-center text-white shadow-sm">
            <p className="text-sm font-semibold">Need help?</p>
            <p className="mt-1 text-xs text-light-gray">24/7 safety line active</p>
          </div>
        </aside>

        <section className="space-y-6">
          <Navbar onLogout={handleLogout} variant="safeguard" />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 xl:gap-6">
            <motion.div
              whileHover={{ y: -2 }}
              className="flex h-36 flex-col justify-between rounded-[2rem] border border-pale-gray bg-surface p-5 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-mid-gray">Monitored streets</p>
              <p className="text-3xl font-bold tabular-nums text-primary">53</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -2 }}
              className="flex h-36 flex-col justify-between rounded-[2rem] border border-pale-gray bg-surface p-5 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-mid-gray">Active cameras</p>
              <p className="text-3xl font-bold tabular-nums text-primary">24</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -2 }}
              className="flex h-36 flex-col justify-between rounded-[2rem] border border-pale-gray bg-surface p-5 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-mid-gray">Resolved alerts</p>
              <p className="text-3xl font-bold tabular-nums text-emerald-700">+46</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -2 }}
              className="flex h-36 flex-col justify-between rounded-[2rem] border border-pale-gray bg-surface p-5 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-mid-gray">SOS this week</p>
              <p className="text-3xl font-bold tabular-nums text-primary">12</p>
            </motion.div>
          </div>

          <div className="grid auto-rows-[minmax(0,1fr)] gap-5 md:grid-cols-2 xl:grid-cols-12 xl:items-stretch">
            <Card accent="emerald" title="Street Light Status" subtitle="Live urban infra signal" className="xl:col-span-4">
              <div className="flex min-h-[10rem] flex-1 flex-col justify-center gap-4 rounded-2xl bg-off-white px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                <p className="text-sm text-mid-gray">
                  State:{' '}
                  <span className="font-semibold text-primary">{streetLightOn ? 'Active' : 'Offline'}</span>
                </p>
                <span className={`h-5 w-5 shrink-0 rounded-full ${lightClasses}`} />
              </div>
            </Card>

            <Card accent="sky" title="AI Camera Module" subtitle="Detecting Humans & Vehicles" className="md:col-span-2 xl:col-span-8">
              <div className="grid min-h-0 flex-1 gap-4 md:grid-cols-[2fr_1fr] md:min-h-[13rem]">
                <div className="relative min-h-[13rem] flex-1 overflow-hidden rounded-2xl border border-pale-gray bg-off-white">
                  <div className="absolute inset-0 bg-[linear-gradient(transparent_95%,rgba(26,26,26,0.06))] bg-[size:100%_8px]" />
                  <motion.div
                    initial={{ x: '-120%' }}
                    animate={{ x: '120%' }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.8, ease: 'linear' }}
                    className="absolute top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-accent/35 to-transparent"
                  />
                  <div className="relative z-10 flex h-full items-center justify-center text-sm font-medium text-mid-gray">
                    <Camera size={16} className="mr-2 text-primary" />
                    Camera feed secured
                  </div>
                </div>
                <div className="flex min-h-[13rem] flex-1 flex-col justify-center rounded-2xl border border-pale-gray bg-off-white p-5">
                  <p className="text-xs uppercase tracking-wider text-light-gray">Movement detection</p>
                  <p className="mt-1 text-3xl font-bold text-primary">{detections}</p>
                  <p className="mt-1 text-sm text-mid-gray">events in this session</p>
                </div>
              </div>
            </Card>

            <Card accent="rose" title="Emergency SOS" subtitle="Tap instantly in critical conditions" className="xl:col-span-4">
              <motion.button
                onClick={triggerSos}
                whileTap={{ scale: 0.92 }}
                className="relative mt-1 flex min-h-[14rem] flex-1 items-center justify-center rounded-full bg-off-white"
              >
                <motion.span
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.12, 0.5] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.6 }}
                  className="absolute h-44 w-44 rounded-full border-2 border-pale-gray"
                />
                <span className="relative flex items-center gap-2 rounded-full bg-primary px-9 py-5 text-base font-semibold text-white shadow-lg shadow-primary/25 ring-4 ring-pale-gray">
                  <Siren size={18} />
                  SEND SOS
                </span>
              </motion.button>
            </Card>

            <Card accent="sky" title="Live Tracking" subtitle="Guardian route visibility" className="xl:col-span-4">
              <div className="relative min-h-[14rem] flex-1 overflow-hidden rounded-2xl border border-pale-gray bg-surface">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(212,212,212,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(212,212,212,0.5)_1px,transparent_1px)] bg-[size:24px_24px]" />
                <motion.div
                  animate={{ x: [0, 90, 140, 210], y: [0, 40, 18, 82] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 6, ease: 'easeInOut' }}
                  className="absolute left-3 top-3 h-3 w-3 rounded-full bg-accent shadow-[0_0_14px_rgba(232,216,74,0.9)]"
                />
                <div className="absolute bottom-2 right-2 rounded-xl bg-primary px-2.5 py-1 text-xs font-medium text-white shadow-md">
                  <LocateFixed size={12} className="mr-1 inline text-accent" />
                  Sector-14, monitored
                </div>
              </div>
            </Card>

            <Card accent="violet" title="Alert System" subtitle="Latest emergency communications" className="xl:col-span-4">
              <AnimatePresence mode="popLayout">
                <div className="flex max-h-[min(22rem,55vh)] flex-col gap-2 overflow-y-auto pr-1">
                  {alerts.map((alert, i) => {
                    const palettes = [
                      'border-pale-gray bg-off-white text-primary',
                      'border-pale-gray bg-surface text-primary',
                      'border-pale-gray bg-off-white text-primary',
                      'border-pale-gray bg-surface text-primary',
                    ]
                    return (
                      <motion.div
                        key={alert.id}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -16 }}
                        className={`flex min-h-[3rem] shrink-0 items-center gap-3 rounded-2xl border px-3.5 py-2.5 text-sm shadow-sm ${palettes[i % palettes.length]}`}
                      >
                        <BellRing size={14} className="shrink-0 text-primary" />
                        <span className="min-w-0 flex-1 truncate leading-snug text-mid-gray">{alert.text}</span>
                      </motion.div>
                    )
                  })}
                </div>
              </AnimatePresence>
            </Card>

            <Card accent="amber" title="Traffic Intelligence" subtitle="Nearby road movement pulse" className="md:col-span-2 xl:col-span-12">
              <div className="flex min-h-[7.5rem] flex-1 items-center justify-between rounded-2xl border border-pale-gray bg-off-white px-6 py-5">
                <div>
                  <p className="text-sm text-mid-gray">Vehicle density</p>
                  <p className="text-xl font-semibold text-primary">Moderate</p>
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: 'linear' }}
                  className="rounded-2xl border border-pale-gray bg-surface p-3 shadow-sm"
                >
                  <TrafficCone className="text-mid-gray" />
                </motion.div>
              </div>
            </Card>
          </div>
        </section>
      </div>

      <AlertModal open={sosOpen} loading={sendingSos} onClose={() => setSosOpen(false)} />
    </motion.main>
  )
}

export default DashboardPage
