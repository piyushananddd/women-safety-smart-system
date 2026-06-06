import { motion } from "framer-motion";
import { useState } from "react";
import { Bell, LogOut, Search, Shield } from "lucide-react";
import NeonButton from "./NeonButton";
// import { useNavigate } from "react-router-dom";

function Navbar({ onLogout, variant = "light" }) {
  // const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const isBrand = variant === "safeguard";
  const [showProfile, setShowProfile] = useState(false);
  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      className={
        isBrand
          ? "mb-5 flex items-center justify-between rounded-[2rem] border border-pink-300 bg-[linear-gradient(120deg,#ff5fa2,#ffd6e7,#ff8dc7,#fff0f7,#ff5fa2)] bg-[length:300%_300%] animate-[gradientMove_6s_ease_infinite] px-4 py-3 shadow-[0_0_35px_rgba(255,105,180,0.45)] md:px-6"
          : "mb-5 flex items-center justify-between rounded-2xl border border-pale-gray bg-surface px-4 py-3 shadow-sm md:px-6"
      }
    >
      <div className="flex items-center gap-3">
        <div
          className={
            isBrand
              ? "rounded-2xl bg-accent p-2.5 shadow-sm ring-1 ring-pale-gray"
              : "rounded-xl bg-off-white p-2"
          }
        >
          <Shield
            className={isBrand ? "text-primary" : "text-mid-gray"}
            size={18}
          />
        </div>
        <div>
          <p
            className={
              isBrand
                ? "text-sm font-medium text-mid-gray"
                : "text-sm text-mid-gray"
            }
          >
            SafeGuardHer · Women Safety AI
          </p>
          <p className="text-base font-semibold text-primary">
            Smart System Dashboard
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 md:gap-3">
        <label
          className={
            isBrand
              ? "hidden items-center gap-2 rounded-2xl border border-pale-gray bg-off-white px-3 py-2 lg:flex"
              : "hidden items-center gap-2 rounded-xl border border-pale-gray bg-off-white px-3 py-2 lg:flex"
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
          onClick={() =>
            alert(
              "🔔 Safety Status\n\nNo emergency alerts detected.\nAll monitored zones are currently safe.",
            )
          }
          className={
            isBrand
              ? "rounded-xl border border-pale-gray bg-off-white p-2 text-mid-gray hover:bg-pale-gray/40"
              : "rounded-lg border border-pale-gray p-2 text-mid-gray"
          }
        >
          <Bell size={16} />
        </button>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-500 text-sm font-bold text-white shadow-md"
          >
            PA
          </button>

          <div
            className={`absolute right-0 top-12 w-52 rounded-2xl border border-pale-gray bg-white p-2 shadow-2xl z-50 ${
              showMenu ? "block" : "hidden"
            }`}
          >
            <button
              onClick={() => {
                setShowProfile(true);
                setShowMenu(false);
              }}
              className="w-full rounded-xl px-4 py-3 text-left text-sm hover:bg-off-white"
            >
              👤 Profile
            </button>

            <button className="w-full rounded-xl px-4 py-3 text-left text-sm hover:bg-off-white">
              ⚙️ Safety Settings
            </button>

            <button className="w-full rounded-xl px-4 py-3 text-left text-sm hover:bg-off-white">
              📞 Emergency Contacts
            </button>

            <button className="w-full rounded-xl px-4 py-3 text-left text-sm text-red-500 hover:bg-red-50">
              🚪 Logout
            </button>
          </div>
        </div>
        <NeonButton
          onClick={onLogout}
          className={
            isBrand
              ? "inline-flex items-center gap-2 !rounded-2xl !bg-primary !text-white !shadow-md hover:!bg-primary/90"
              : ""
          }
        >
          <LogOut size={16} />
          Logout
        </NeonButton>
      </div>
      {showProfile && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={() => setShowProfile(false)}
        >
          <div
            className="w-[700px] max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="mb-8 text-4xl font-bold">Profile Settings</h1>

            <div className="mb-8 flex justify-center">
              <div className="flex h-40 w-40 items-center justify-center rounded-full border">
                👤
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block font-semibold">Full Name</label>
                <input
                  className="w-full rounded-xl border p-4"
                  value="Piyush Anand"
                  readOnly
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold">Email</label>
                <input
                  className="w-full rounded-xl border p-4"
                  value="piyush@gmail.com"
                  readOnly
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold">Phone Number</label>
                <input
                  className="w-full rounded-xl border p-4"
                  value="+91 9876543210"
                  readOnly
                />
              </div>
            </div>

            <button
              onClick={() => setShowProfile(false)}
              className="mt-8 w-full rounded-xl bg-pink-500 py-4 text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </motion.header>
  );
}

export default Navbar;
