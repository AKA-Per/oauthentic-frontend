import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Welcome, {user?.name || user?.firstName}!</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-indigo-50 dark:bg-indigo-900 rounded-lg p-4">
            <h3 className="text-lg font-medium text-indigo-800 dark:text-indigo-200">Total Users</h3>
            <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-300">0</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900 rounded-lg p-4">
            <h3 className="text-lg font-medium text-green-800 dark:text-green-200">Active Apps</h3>
            <p className="text-3xl font-bold text-green-600 dark:text-green-300">0</p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900 rounded-lg p-4">
            <h3 className="text-lg font-medium text-purple-800 dark:text-purple-200">Total Requests</h3>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-300">0</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <p className="text-gray-500 dark:text-gray-400">No recent activity</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Create New App
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            Add New User
          </button>
        </div>
      </div>
    </div>
  );
} 