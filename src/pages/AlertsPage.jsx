import { motion } from "framer-motion";

function AlertsPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-off-white p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md rounded-[2rem] border border-pale-gray bg-surface p-10 text-center shadow-xl"
      >
        <div className="text-6xl">🔔</div>

        <h1 className="mt-6 text-3xl font-bold text-primary">
          No Alerts Available
        </h1>

        <p className="mt-3 text-mid-gray">
          Right now there are no active alerts in your area.
        </p>
      </motion.div>
    </main>
  );
}

export default AlertsPage;