import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Register</h2>
        <div className="flex flex-col gap-4">
          <Link to="/register/user" className="w-full py-2 px-4 rounded-md bg-indigo-600 text-white text-center font-medium hover:bg-indigo-700">Register as User</Link>
          <Link to="/register/client" className="w-full py-2 px-4 rounded-md bg-green-600 text-white text-center font-medium hover:bg-green-700">Register as Client</Link>
        </div>
      </div>
    </div>
  );
}