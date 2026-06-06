function ProfilePage() {
  return (
    <div className="min-h-screen bg-off-white p-8">
      <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-lg">

        <h1 className="mb-8 text-3xl font-bold">
          Profile Settings
        </h1>

        <div className="mb-8 flex justify-center">
          <div className="flex h-32 w-32 items-center justify-center rounded-full border text-5xl">
            👤
          </div>
        </div>

        <div className="space-y-4">

          <div>
            <label className="block font-semibold">
              Full Name
            </label>

            <input
              type="text"
              defaultValue="Piyush Anand"
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="block font-semibold">
              Email
            </label>

            <input
              type="email"
              defaultValue="piyush@gmail.com"
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="block font-semibold">
              Phone Number
            </label>

            <input
              type="text"
              defaultValue="+91 9876543210"
              className="w-full rounded-xl border p-3"
            />
          </div>

        </div>

      </div>
    </div>
  )
}

export default ProfilePage