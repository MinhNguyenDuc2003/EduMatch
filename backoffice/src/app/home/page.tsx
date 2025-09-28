export default function AdminHome() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 text-xl font-bold border-b">Admin Panel</div>
        <nav className="p-4 space-y-2">
          <a href="/admin" className="block p-2 rounded hover:bg-gray-200">Dashboard</a>
          <a href="/admin/users" className="block p-2 rounded hover:bg-gray-200">Users</a>
          <a href="/admin/settings" className="block p-2 rounded hover:bg-gray-200">Settings</a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Admin Home</h1>
          <button className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700">
            Logout
          </button>
        </header>

        <section className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-lg font-bold">Users</h2>
            <p className="text-gray-600">123 active users</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-lg font-bold">Courses</h2>
            <p className="text-gray-600">45 published</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-lg font-bold">Revenue</h2>
            <p className="text-gray-600">$12,345 this month</p>
          </div>
        </section>
      </main>
    </div>
  );
}
