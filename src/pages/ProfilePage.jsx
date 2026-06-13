import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("profileData");

    return saved
      ? JSON.parse(saved)
      : {
          fullName: "Piyush Anand",
          gender: "Prefer not to say",
          phone: "+91 9876543210",
          email: "piyush@gmail.com",
          address: "",
          guardianName: "",
          relation: "",
          guardianContact: "",
          alternateMobile: "",
          guardianAddress: "",
        };
  });

  const handleSave = () => {
    localStorage.setItem("profileData", JSON.stringify(profile));

    alert("Profile Saved Successfully");
    navigate("/dashboard");
  };
  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-200 p-4 md:p-8 flex items-center justify-center font-sans">
      {/* Main Container Card */}
      <div className="relative w-full max-w-4xl rounded-2xl bg-[#161b22] border border-[#21262d] p-6 md:p-8 shadow-2xl overflow-hidden">
        {/* Decorative Top Gradient Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"></div>

        {/* Header Section with Close Button */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-wide text-white uppercase">
              Profile Settings
            </h1>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">
              SafeGuardHer, Admin Program
            </p>
          </div>
          {/* Close/Cross Button */}
          <button
            onClick={() => navigate("/dashboard")}
            className="text-gray-400 hover:text-white transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Profile Image Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-[#0d1117] border-2 border-dashed border-[#30363d] text-gray-500 text-4xl shadow-inner">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-14 w-14 opacity-40"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <div className="w-full max-w-md mt-4">
            <label className="block text-center text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
              Profile Image URL
            </label>
            <input
              type="text"
              placeholder="https://example.com/photo.jpg"
              className="w-full text-center text-sm rounded-lg bg-[#0d1117] border border-[#30363d] p-2.5 text-blue-400 placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
        </div>

        {/* Form Fields Section */}
        <div className="space-y-8">
          {/* Section 1: Personal Information */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#f43f5e] mb-4 border-b border-[#21262d] pb-1">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profile.fullName}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      fullName: e.target.value,
                    })
                  }
                  className="w-full text-sm rounded-lg bg-[#0d1117] border border-[#30363d] p-3 text-white focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                  Gender
                </label>
                <select
                  value={profile.gender}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      gender: e.target.value,
                    })
                  }
                  className="w-full text-sm rounded-lg bg-[#0d1117] border border-[#30363d] p-3 text-white focus:outline-none focus:border-purple-500 appearance-none"
                >
                  <option>Prefer not to say</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      phone: e.target.value,
                    })
                  }
                  className="w-full text-sm rounded-lg bg-[#0d1117] border border-[#30363d] p-3 text-white focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      email: e.target.value,
                    })
                  }
                  className="w-full text-sm rounded-lg bg-[#0d1117] border border-[#30363d] p-3 text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                Address
              </label>
              <textarea
                rows="2"
                value={profile.address}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    address: e.target.value,
                  })
                }
                className="w-full text-sm rounded-lg bg-[#0d1117] border border-[#30363d] p-3 text-white focus:outline-none focus:border-purple-500 resize-none"
              />
            </div>
          </div>

          {/* Section 2: Guardian Details */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#f43f5e] mb-4 border-b border-[#21262d] pb-1">
              Guardian Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                  Guardian Name
                </label>
                <input
                  type="text"
                  value={profile.guardianName}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      guardianName: e.target.value,
                    })
                  }
                  className="w-full text-sm rounded-lg bg-[#0d1117] border border-[#30363d] p-3 text-white focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                  Relation
                </label>
                <input
  type="text"
  value={profile.relation}
  placeholder="Father/Mother/Relative"
  onChange={(e) =>
    setProfile({
      ...profile,
      relation: e.target.value,
    })
  }
  className="w-full text-sm rounded-lg bg-[#0d1117] border border-[#30363d] p-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500"
/>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                  Guardian Contact
                </label>
               <input
  type="text"
  value={profile.guardianContact}
  onChange={(e) =>
    setProfile({
      ...profile,
      guardianContact: e.target.value,
    })
  }
  className="w-full text-sm rounded-lg bg-[#0d1117] border border-[#30363d] p-3 text-white focus:outline-none focus:border-purple-500"
/>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                  Alternate Guardian Mobile
                </label>
                <input
  type="text"
  value={profile.alternateMobile}
  onChange={(e) =>
    setProfile({
      ...profile,
      alternateMobile: e.target.value,
    })
  }
  className="w-full text-sm rounded-lg bg-[#0d1117] border border-[#30363d] p-3 text-white focus:outline-none focus:border-purple-500"
/>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                Guardian Address
              </label>
              <textarea
  rows="2"
  value={profile.guardianAddress}
  onChange={(e) =>
    setProfile({
      ...profile,
      guardianAddress: e.target.value,
    })
  }
  className="w-full text-sm rounded-lg bg-[#0d1117] border border-[#30363d] p-3 text-white focus:outline-none focus:border-purple-500 resize-none"
/>
            </div>
          </div>
        </div>

        {/* Bottom Action Buttons */}
        <div className="flex items-center justify-end space-x-4 mt-8 pt-4 border-t border-[#21262d]">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-2.5 rounded-lg border border-[#30363d] text-sm font-medium text-gray-400 hover:bg-[#21262d] hover:text-white transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 px-6 py-2.5 rounded-lg bg-transparent border border-[#21262d] hover:border-gray-500 text-sm font-medium text-white transition-all duration-200 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
              />
            </svg>
            <span>SAVE CHANGES</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
