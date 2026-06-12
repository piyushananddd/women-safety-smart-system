import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import {
  BellRing,
  Camera,
  LayoutDashboard,
  LocateFixed,
  ShieldAlert,
  Siren,
  TrafficCone,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AlertModal from "../components/AlertModal";
import Card from "../components/Card";
import Navbar from "../components/Navbar";

const alertsSeed = [
  { id: 1, text: "Guardian Notified" },
  { id: 2, text: "Police Alert Sent" },
  { id: 3, text: "Nearby Patrol Engaged" },
];

function DashboardPage() {
  const navigate = useNavigate();
  const [streetLightOn, setStreetLightOn] = useState(true);
  // const [detections, setDetections] = useState(0);
  // const [routeGenerated, setRouteGenerated] = useState(false);
  const [sosOpen, setSosOpen] = useState(false);
  const [sendingSos, setSendingSos] = useState(false);
  const [alerts, setAlerts] = useState(alertsSeed);
  const alertIdRef = useRef(10);
  const [humanCount, setHumanCount] = useState(0);
  const [vehicleCount, setVehicleCount] = useState(0);
  const [resolvedAlerts, setResolvedAlerts] = useState(0);
  const [sosCount, setSosCount] = useState(0);
  const [startPoint, setStartPoint] = useState("");
  const [destination, setDestination] = useState("");
  const [routeGenerated, setRouteGenerated] = useState(false);
  const allowedStartLocations = ["Tyagipur", "Civil Lines"];
  const allowedDestinations = ["Roorkee", "Haridwar"];
  const [sensorData, setSensorData] = useState({
    status: "Waiting for ESP32...",
    VehicleCount: 0,
    humanCount: 0,
    threatLevel: "None",
  });
  const isValidRoute =
    allowedStartLocations.includes(startPoint) &&
    allowedDestinations.includes(destination);
  useEffect(() => {
    const fetchData = () => {
      // fetch("http://localhost:3000/api/dashboard")
      fetch("https://raksha-kavach-backend.onrender.com/api/dashboard")
        .then((res) => res.json())
        .then((data) => {
          setSensorData({
            status: data.status,
            vehicleCount: data.vehicleCount || 0,
            humanCount: data.humanCount || 0,
            sosCount: data.sosCount || 0,
            threatLevel:
              data.status === "Waiting for ESP32..."
                ? "None"
                : data.status.includes("Unsafe")
                  ? "High"
                  : "Low",
          });

          setStreetLightOn(
            isValidRoute && data.status !== "Waiting for ESP32...",
          );
        });
    };

    fetchData(); // Run immediately

    const interval = setInterval(fetchData, 3000);

    return () => clearInterval(interval);
  }, []);
  // useEffect(() => {
  //   const saved = localStorage.getItem("dashboardData");

  //   if (saved) {
  //     const data = JSON.parse(saved);

  //     setHumanCount(() => data.humanCount || 0);
  //     setVehicleCount(() => data.vehicleCount || 0);
  //     setResolvedAlerts(() => data.resolvedAlerts || 0);
  //     setSosCount(() => data.sosCount || 0);
  //   }
  // }, []);

  // useEffect(() => {
  //   const statusTimer = setInterval(() => {
  //     setStreetLightOn((prev) => !prev);
  //   }, 5000);
  //   return () => clearInterval(statusTimer);
  // }, []);

  useEffect(() => {
    const alertTimer = setInterval(() => {
      const updates = [
        "Control Room Monitoring Active",
        "Route Heatmap Updated",
        "Emergency Network Standby",
      ];
      const nextText = updates[Math.floor(Math.random() * updates.length)];
      alertIdRef.current += 1;
      setAlerts((prev) =>
        [{ id: alertIdRef.current, text: nextText }, ...prev].slice(0, 5),
      );
    }, 8000);
    return () => clearInterval(alertTimer);
  }, []);

  // const handleLogout = () => {
  //   localStorage.removeItem("wss-auth");
  //   navigate("/login");
  // };
  const handleSearch = () => {
    if (!startPoint || !destination) {
      alert("Please select both locations");
      return;
    }
    if (!isValidRoute) {
      alert(
        "Only Tyagipur/Civil Lines to Roorkee/Haridwar routes are available.",
      );
      return;
    }

    if (routeGenerated) return;

    setHumanCount(0);
    setVehicleCount(1);
    setResolvedAlerts(0);
    // setSosCount( sensorData.sosCount);

    setRouteGenerated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("wss-auth");
    localStorage.removeItem("dashboardData");
    navigate("/login");
  };
  // const triggerSos = () => {

  //   setSosOpen(true)
  //   setSendingSos(true)

  //   setTimeout(() => {

  //     setSendingSos(false)

  //     alertIdRef.current += 1

  //     setAlerts((prev) => [
  //       {
  //         id: alertIdRef.current,
  //         text: 'Emergency SOS Activated'
  //       },
  //       ...prev
  //     ].slice(0, 5))

  //     window.location.href = "tel:+917979753935"

  //   }, 1000)
  // }

  const triggerSos = async () => {
    setSosOpen(true);
    setSendingSos(true);

    if (!navigator.geolocation) {
      alert("Geolocation is not supported");
      setSendingSos(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        try {
          const response = await fetch(
            "https://women-safety-backend-z8h9.onrender.com/sos",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                latitude,
                longitude,
              }),
            },
          );

          const data = await response.json();

          console.log(data);
          // await fetch("http://localhost:3000/api/toggle-sos", {
          await fetch("https://raksha-kavach-backend.onrender.com/api/toggle-sos", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              action: "ON",
            }),
          });
          setSosCount((prev) => prev + 1);

          // PHONE CALL
          window.location.href = "tel:+917979753935";

          setSendingSos(false);

          alertIdRef.current += 1;

          setAlerts((prev) =>
            [
              {
                id: alertIdRef.current,
                text: "Emergency SOS Activated",
              },
              ...prev,
            ].slice(0, 5),
          );
        } catch (error) {
          console.log(error);
          setSendingSos(false);
        }
      },

      (error) => {
        console.log(error);
        alert("Location permission denied");
        setSendingSos(false);
      },
    );
  };

  const lightClasses = useMemo(
    () =>
      sensorData.status === "Waiting for ESP32..."
        ? "bg-red-500 shadow-[0_0_14px_rgba(239,68,68,0.7)]"
        : "bg-emerald-500 shadow-[0_0_14px_rgba(16,185,129,0.7)]",
    [sensorData.status],
  );
  const routeRecommendation = !routeGenerated
    ? "SELECT ROUTE TO GET RECOMMENDATION"
    : sensorData.humanCount >= 5 && sensorData.vehicleCount >= 5
      ? "SAFE PATH SUGGESTED ✅"
      : sensorData.humanCount >= 2 && sensorData.vehicleCount >= 2
        ? "MODERATELY SAFE ⚠️"
        : "AVOID ROUTE ❌";

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
        <aside className="hidden h-fit rounded-[2rem] border border-pale-gray bg-surface p-6 shadow-md shadow-primary/5 lg:block">
          <p className="mb-1 text-lg font-bold text-primary">SafeGuardHer</p>
          <p className="mb-5 text-xs text-mid-gray">
            Women Safety App · Dashboard
          </p>
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
              onClick={() => navigate("/alerts")}
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
            <button
              type="button"
              onClick={() => navigate("/pathfinder")}
              className="flex w-full items-center gap-2 rounded-2xl px-3 py-2.5 text-sm text-mid-gray transition hover:bg-off-white"
            >
              🛡️ Pathfinder.AI
            </button>
          </nav>
          <div
            onClick={() => navigate("/support")}
            className="mt-6 cursor-pointer rounded-2xl bg-primary p-4 text-center text-white shadow-sm transition hover:scale-[1.02]"
          >
            <p className="text-sm font-semibold">Need help?</p>
            <p className="mt-1 text-xs text-light-gray">
              24/7 safety line active
            </p>
          </div>
        </aside>

        <section className="space-y-6">
          <Navbar onLogout={handleLogout} variant="safeguard" />
          <div className="rounded-[2rem] border border-pale-gray bg-surface p-6 shadow-md">
            <h2 className="text-2xl font-bold text-primary">Pathfinder AI</h2>

            <p className="mt-1 text-sm text-mid-gray">
              Find the safest route before travelling
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <select
                value={startPoint}
                onChange={(e) => {
                  setStartPoint(e.target.value);
                  setRouteGenerated(false);
                }}
                className="rounded-xl border border-pale-gray px-4 py-3 outline-none"
              >
                <option value="">Select Current Location</option>
                <option value="Tyagipur">Tyagipur</option>
                <option value="Civil Lines">Civil Lines</option>
              </select>

              <select
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                  setRouteGenerated(false);
                }}
                className="rounded-xl border border-pale-gray px-4 py-3 outline-none"
              >
                <option value="">Select Destination</option>
                <option value="Roorkee">Roorkee</option>
                <option value="Haridwar">Haridwar</option>
              </select>

              <button
                onClick={handleSearch}
                className="mt-4 w-full rounded-xl bg-primary py-3 font-semibold text-white"
              >
                GET SAFEST ROUTE
              </button>
            </div>
            <div className="bg-white rounded-3xl p-6 shadow">
              <h3 className="text-xl font-bold mb-4">Live Sensor Data</h3>
              <p>
                <strong>Street Light Status:</strong>{" "}
                {routeGenerated && isValidRoute ? sensorData.status : "Offline"}
              </p>

              <p>
                <strong>Vehicle Count:</strong>
                {routeGenerated && isValidRoute ? sensorData.vehicleCount : 0}
              </p>

              <p>
                <strong>Threat Level:</strong>{" "}
                {routeGenerated && isValidRoute
                  ? sensorData.threatLevel
                  : "None"}
              </p>
            <div
  className={`rounded-2xl px-6 py-5 text-center font-bold text-xl shadow-lg transition-all duration-300 ${
    !routeGenerated
      ? "bg-slate-700 text-white"
      : routeRecommendation.includes("SAFE PATH")
        ? "bg-green-600 text-white"
        : routeRecommendation.includes("MODERATELY")
          ? "bg-yellow-500 text-black"
          : "bg-red-600 text-white"
  }`}
>
  {routeRecommendation}
</div>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 xl:gap-6">
            <motion.div
              whileHover={{
                y: -4,
              }}
              transition={{ duration: 0.2 }}
              className="group relative flex h-36 flex-col justify-between overflow-hidden rounded-[2rem] border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-2xl"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Monitored streets
              </p>

              <p className="text-3xl font-bold tabular-nums text-gray-900">
                {humanCount}
              </p>

              <div className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 transition-all duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.28),rgba(255,223,120,0.18),transparent_72%)] blur-xl"></div>
            </motion.div>

            <motion.div
              whileHover={{
                y: -4,
              }}
              transition={{ duration: 0.2 }}
              className="group relative flex h-36 flex-col justify-between overflow-hidden rounded-[2rem] border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-2xl"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Active Camera
              </p>

              <p className="text-3xl font-bold tabular-nums text-gray-900">
                {vehicleCount}
              </p>

              <div className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 transition-all duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.28),rgba(255,223,120,0.18),transparent_72%)] blur-xl"></div>
            </motion.div>

            <motion.div
              whileHover={{
                y: -4,
              }}
              transition={{ duration: 0.2 }}
              className="group relative flex h-36 flex-col justify-between overflow-hidden rounded-[2rem] border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-2xl"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Resolved Alerts
              </p>

              <p className="text-3xl font-bold tabular-nums text-gray-900">
                {resolvedAlerts}
              </p>

              <div className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 transition-all duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.28),rgba(255,223,120,0.18),transparent_72%)] blur-xl"></div>
            </motion.div>

            <motion.div
              whileHover={{
                y: -4,
              }}
              transition={{ duration: 0.2 }}
              className="group relative flex h-36 flex-col justify-between overflow-hidden rounded-[2rem] border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-2xl"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                SOS This Week
              </p>

              <p className="text-3xl font-bold tabular-nums text-gray-900">
                {routeGenerated ? sensorData.sosCount : 0}
              </p>

              <div className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 transition-all duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.28),rgba(255,223,120,0.18),transparent_72%)] blur-xl"></div>
            </motion.div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-12">
            <Card
              accent="emerald"
              title="Street Light Status"
              subtitle="Live urban infra signal"
              className="xl:col-span-4"
            >
              <div className="flex min-h-[10rem] flex-1 flex-col justify-center gap-4 rounded-2xl bg-off-white px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                <p className="text-sm text-mid-gray">
                  State:{" "}
                  <span>
                    {sensorData.status === "Waiting for ESP32..."
                      ? "Offline"
                      : "Active"}
                  </span>
                </p>
                <span
                  className={`h-5 w-5 shrink-0 rounded-full ${lightClasses}`}
                />
              </div>
            </Card>

            <Card
              accent="sky"
              title="AI Camera Module"
              subtitle="Detecting Humans & Vehicles"
              className="md:col-span-2 xl:col-span-8"
            >
              <div className="grid min-h-0 flex-1 gap-4 md:grid-cols-[2fr_1fr] md:min-h-[13rem]">
                <div className="relative min-h-[13rem] flex-1 overflow-hidden rounded-2xl border border-pale-gray bg-off-white">
                  <div className="absolute inset-0 bg-[linear-gradient(transparent_95%,rgba(26,26,26,0.06))] bg-[size:100%_8px]" />
                  <motion.div
                    initial={{ x: "-120%" }}
                    animate={{ x: "120%" }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 1.8,
                      ease: "linear",
                    }}
                    className="absolute top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-accent/35 to-transparent"
                  />
                  <div className="h-[250px] overflow-hidden rounded-xl border">
                    <img
                      src="http://10.168.83.52:8080/video"
                      alt="Live Camera Feed"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex min-h-[13rem] flex-1 flex-col justify-center rounded-2xl border border-pale-gray bg-off-white p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-mid-gray">
                    HUMAN COUNT
                  </p>

                  <p className="text-5xl font-bold">
                    {routeGenerated ? sensorData.humanCount || 0 : "--"}
                  </p>
                  <p className="mt-1 text-sm text-mid-gray">
                    People in monitored zone
                  </p>
                </div>
              </div>
            </Card>

            <Card
              accent="rose"
              title="Emergency SOS"
              subtitle="Tap instantly in critical conditions"
              className="xl:col-span-4"
            >
              <motion.button
                onClick={triggerSos}
                whileTap={{ scale: 0.92 }}
                className="relative mt-1 flex min-h-[14rem] flex-1 items-center justify-center rounded-full bg-off-white"
              >
                <motion.span
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.12, 0.5] }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 1.6,
                  }}
                  className="absolute h-44 w-44 rounded-full border-2 border-pale-gray"
                />
                <span className="relative flex items-center gap-2 rounded-full bg-primary px-9 py-5 text-base font-semibold text-white shadow-lg shadow-primary/25 ring-4 ring-pale-gray">
                  <Siren size={18} />
                  SEND SOS
                </span>
              </motion.button>
            </Card>

            <Card
              accent="sky"
              title="Smart Safety Status"
              subtitle="Real-time safety monitoring"
              className="xl:col-span-4"
            >
              <div className="space-y-4 rounded-2xl border border-pale-gray bg-off-white p-5">
                <div className="flex justify-between">
                  <span>ESP32 Status</span>
                  <span className="font-semibold text-green-600">
                    {sensorData.status === "Waiting for ESP32..."
                      ? "Offline"
                      : "Connected"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Street Lights</span>
                  <span className="font-semibold">
                    {sensorData.status === "Waiting for ESP32..."
                      ? "Offline"
                      : "Active"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Vehicle Count</span>
                  <span className="font-semibold">
                    {sensorData.vehicleCount}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Threat Level</span>
                  <span className="font-semibold">
                    {sensorData.threatLevel}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Current Route</span>
                  <span className="font-semibold">
                    {startPoint && destination
                      ? `${startPoint} → ${destination}`
                      : "Not Selected"}
                  </span>
                </div>
              </div>
            </Card>

            <Card
              accent="violet"
              title="Emergency Contacts"
              subtitle="Instant emergency support"
              className="xl:col-span-4"
            >
              <div className="space-y-3">
                <a
                  href="tel:112"
                  className="block rounded-xl border p-4 hover:bg-off-white"
                >
                  🚔 Police Emergency - 112
                </a>

                <a
                  href="tel:1091"
                  className="block rounded-xl border p-4 hover:bg-off-white"
                >
                  👩 Women Helpline - 1091
                </a>

                <a
                  href="tel:108"
                  className="block rounded-xl border p-4 hover:bg-off-white"
                >
                  🚑 Ambulance - 108
                </a>

                <a
                  href="tel:+917979753935"
                  className="block rounded-xl border p-4 hover:bg-off-white"
                >
                  👨 Guardian Contact
                </a>
              </div>
            </Card>

            <Card
              accent="amber"
              title="Traffic Intelligence"
              subtitle="Nearby road movement pulse"
              className="md:col-span-2 xl:col-span-12"
            >
              <div className="flex flex-1 items-center justify-between rounded-2xl border border-pale-gray bg-off-white px-6 py-5">
                <div>
                  <p className="text-sm text-mid-gray">Vehicle density</p>
                  <p className="text-xl font-semibold text-primary">Moderate</p>
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 2,
                    ease: "linear",
                  }}
                  className="rounded-2xl border border-pale-gray bg-surface p-3 shadow-sm"
                >
                  <TrafficCone className="text-mid-gray" />
                </motion.div>
              </div>
            </Card>

            <div className="md:col-span-2 xl:col-span-12 self-start">
              <motion.a
                href="https://www.rapido.bike/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.01 }}
                className="mt-2 flex w-full items-center justify-between rounded-[2rem] bg-gradient-to-r from-pink-600 to-pink-500 p-6 text-white shadow-xl"
              >
                <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/20 text-4xl">
                    🚖
                  </div>

                  <div>
                    <h2 className="text-2xl sm:text-4xl font-bold">
                      Book Pink Cab
                    </h2>

                    <p className="mt-2 text-lg text-pink-100">
                      Verified women drivers for late-night travel via Rapido
                    </p>
                  </div>
                </div>

                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-4xl">
                  →
                </div>
              </motion.a>
            </div>
          </div>
        </section>

        <div className="fixed bottom-4 left-1/2 z-50 flex w-[90%] max-w-sm -translate-x-1/2 items-center justify-around rounded-3xl border border-pale-gray bg-white/70 backdrop-blur-md p-3 shadow-2xl lg:hidden">
          <button className="flex flex-col items-center text-primary">
            <LayoutDashboard size={22} />
            <span className="text-[10px]">Home</span>
          </button>
          <button
            onClick={() => navigate("/alerts")}
            className="flex flex-col items-center text-mid-gray"
          >
            <ShieldAlert size={22} />
            <span className="text-[10px]">Alerts</span>
          </button>
          <button
            onClick={() => navigate("/pathfinder")}
            className="flex flex-col items-center text-mid-gray"
          >
            🛡️
            <span className="text-[10px]">Pathfinder</span>
          </button>

          <button className="flex flex-col items-center text-mid-gray">
            <Camera size={22} />
            <span className="text-[10px]">Camera</span>
          </button>
        </div>
      </div>

      {/* WOMEN EMPOWERMENT SLIDER */}
      <div className="mt-10 rounded-[2rem] bg-[#050816] p-6 pb-52 shadow-2xl">
        <div className="mb-6 text-center">
          <h2 className="text-4xl font-bold tracking-wide text-white">
            NARI SHAKTI
          </h2>

          <p className="mt-2 text-sm uppercase tracking-[0.35em] text-violet-300">
            Empowering The Future
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          className="rounded-[2rem]"
        >
          {/* SLIDE 1 */}
          <SwiperSlide>
            <div className="relative overflow-hidden rounded-[2rem]">
              <img
                src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1400&auto=format&fit=crop"
                alt="Women Empowerment"
                className="h-[650px] w-full object-cover"
              />

              <div className="absolute inset-0 bg-black/50" />

              <div className="absolute inset-0 flex flex-col justify-end p-10 text-white">
                <span className="mb-4 text-6xl text-violet-400">❝</span>

                <h2 className="max-w-3xl text-5xl font-bold leading-tight">
                  Isolated we are strong, but together we are invincible.
                </h2>

                <p className="mt-6 text-lg uppercase tracking-[0.4em] text-cyan-300">
                  — TEAM NEXURA
                </p>
              </div>
            </div>
          </SwiperSlide>

          {/* SLIDE 2 */}
          <SwiperSlide>
            <div className="relative overflow-hidden rounded-[2rem]">
              <img
                src="https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=1400&auto=format&fit=crop"
                alt="Women Motivation"
                className="h-[650px] w-full object-cover"
              />

              <div className="absolute inset-0 bg-black/50" />

              <div className="absolute inset-0 flex flex-col justify-end p-10 text-white">
                <span className="mb-4 text-6xl text-violet-400">❝</span>

                <h2 className="max-w-3xl text-5xl font-bold leading-tight">
                  A strong woman stands up for herself. A stronger woman stands
                  up for everyone.
                </h2>

                <p className="mt-6 text-lg uppercase tracking-[0.4em] text-cyan-300">
                  — TEAM NEXURA
                </p>
              </div>
            </div>
          </SwiperSlide>

          {/* SLIDE 3 */}
          <SwiperSlide>
            <div className="relative overflow-hidden rounded-[2rem]">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1400&auto=format&fit=crop"
                alt="Women Leadership"
                className="h-[650px] w-full object-cover"
              />

              <div className="absolute inset-0 bg-black/50" />

              <div className="absolute inset-0 flex flex-col justify-end p-10 text-white">
                <span className="mb-4 text-6xl text-violet-400">❝</span>

                <h2 className="max-w-3xl text-5xl font-bold leading-tight">
                  Empowered women empower generations.
                </h2>

                <p className="mt-6 text-lg uppercase tracking-[0.4em] text-cyan-300">
                  — TEAM NEXURA
                </p>
              </div>
            </div>
          </SwiperSlide>

          {/* SLIDE 4 */}
          <SwiperSlide>
            <div className="relative overflow-hidden rounded-[2rem]">
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1400&auto=format&fit=crop"
                alt="Women Inspiration"
                className="h-[650px] w-full object-cover"
              />

              <div className="absolute inset-0 bg-black/50" />

              <div className="absolute inset-0 flex flex-col justify-end p-10 text-white">
                <span className="mb-4 text-6xl text-violet-400">❝</span>

                <h2 className="max-w-3xl text-5xl font-bold leading-tight">
                  There is no limit to what women can accomplish.
                </h2>

                <p className="mt-6 text-lg uppercase tracking-[0.4em] text-cyan-300">
                  — TEAM NEXURA
                </p>
              </div>
            </div>
          </SwiperSlide>

          {/* SLIDE 5 */}
          <SwiperSlide>
            <div className="relative overflow-hidden rounded-[2rem]">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1400&auto=format&fit=crop"
                alt="Women Success"
                className="h-[650px] w-full object-cover"
              />

              <div className="absolute inset-0 bg-black/50" />

              <div className="absolute inset-0 flex flex-col justify-end p-10 text-white">
                <span className="mb-4 text-6xl text-violet-400">❝</span>

                <h2 className="max-w-3xl text-5xl font-bold leading-tight">
                  She rises. She leads. She inspires the world.
                </h2>

                <p className="mt-6 text-lg uppercase tracking-[0.4em] text-cyan-300">
                  — TEAM NEXURA
                </p>
              </div>
            </div>
          </SwiperSlide>

          {/* SLIDE 6 */}
          <SwiperSlide>
            <div className="relative overflow-hidden rounded-[2rem]">
              <img
                src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1400&auto=format&fit=crop"
                alt="Women Future"
                className="h-[650px] w-full object-cover"
              />

              <div className="absolute inset-0 bg-black/50" />

              <div className="absolute inset-0 flex flex-col justify-end p-10 text-white">
                <span className="mb-4 text-6xl text-violet-400">❝</span>

                <h2 className="max-w-3xl text-5xl font-bold leading-tight">
                  Fearless minds create fearless futures.
                </h2>

                <p className="mt-6 text-lg uppercase tracking-[0.4em] text-cyan-300">
                  — TEAM NEXURA
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        <div className="mt-10 text-center">
          <p className="text-3xl italic text-gray-300">
            “Ab Andhera nahi, Sirf hifajat rahegi... TEAM NEXURA”
          </p>
        </div>
      </div>

      <AlertModal
        open={sosOpen}
        loading={sendingSos}
        onClose={() => setSosOpen(false)}
      />
    </motion.main>
  );
}

export default DashboardPage;
