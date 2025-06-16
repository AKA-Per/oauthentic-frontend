import { Link } from 'react-router-dom';

export default function Error404() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-50 text-gray-800 p-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6 text-center">Oops! I think you have lost your way. Let's get you to Home.</p>
      <Link
        to="/"
        className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 hover:text-gray-900 transition"
      >
        Go Home
      </Link>
    </div>
  );
}
