import { Phone, Shield, MessageCircle, MapPin } from "lucide-react";

function SupportPage() {
  return (
    <main className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-3xl">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary sm:text-4xl">
            Safety Support Center
          </h1>

          <p className="mt-2 text-mid-gray">
            24/7 assistance for women safety and emergency response.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">

          <div className="rounded-3xl bg-surface p-6 shadow-md">
            <Phone className="mb-4 text-pink-500" size={32} />

           <h2 className="text-2xl font-bold sm:text-3xl">
              Emergency Helpline
            </h2>

            <p className="mt-3 text-mid-gray">
              National Women Helpline: 1091
            </p>

            <p className="text-mid-gray">
              Emergency Response: 112
            </p>
          </div>

          <div className="rounded-3xl bg-surface p-6 shadow-md">
            <Shield className="mb-4 text-blue-500" size={32} />

            <h2 className="text-xl font-bold">
              Safety Monitoring
            </h2>

            <p className="mt-3 text-mid-gray">
              Your routes are actively monitored by SafeGuardHer AI.
            </p>
          </div>

          <div className="rounded-3xl bg-surface p-6 shadow-md">
            <MessageCircle className="mb-4 text-green-500" size={32} />

            <h2 className="text-xl font-bold">
              Live Chat Support
            </h2>

            <p className="mt-3 text-mid-gray">
              Chat assistance available 24/7 for safety concerns.
            </p>
          </div>

          <div className="rounded-3xl bg-surface p-6 shadow-md">
            <MapPin className="mb-4 text-red-500" size={32} />

            <h2 className="text-xl font-bold">
              Nearby Assistance
            </h2>

            <p className="mt-3 text-mid-gray">
              Find nearby police stations and emergency safe zones.
            </p>
          </div>

        </div>

        <div className="mt-10 rounded-3xl bg-gradient-to-r from-pink-500 to-rose-500 p-8 text-center text-white shadow-xl">
          <h2 className="text-3xl font-bold">
            You Are Never Alone
          </h2>

          <p className="mt-4 text-lg text-pink-100">
            SafeGuardHer is built to protect, support, and empower women everywhere.
          </p>
        </div>

      </div>
    </main>
  );
}

export default SupportPage;