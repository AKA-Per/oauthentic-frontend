import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

interface AppSecret {
  id: string;
  name: string;
  value: string;
  createdAt: string;
  lastUsed: string | null;
}

interface App {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
  secrets: AppSecret[];
}

export default function AppDetails() {
  const { id } = useParams<{ id: string }>();
  const [app, setApp] = useState<App | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSecret, setShowSecret] = useState<string | null>(null);

  // TODO: Implement API call to fetch app details
  useEffect(() => {
    const fetchAppDetails = async () => {
      try {
        const response = await fetch(`/api/apps/${id}`);
        const data = await response.json();
        setApp(data);
      } catch (error) {
        console.error('Error fetching app details:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAppDetails();
  }, [id]);

  const handleCreateSecret = async () => {
    // TODO: Implement API call to create new secret
    console.log('Creating new secret for app:', id);
  };

  const handleDeleteSecret = async (secretId: string) => {
    // TODO: Implement API call to delete secret
    console.log('Deleting secret:', secretId);
  };

  if (isLoading) {
    return (
      <div className="p-4 text-center text-gray-500 dark:text-gray-400">Loading...</div>
    );
  }

  if (!app) {
    return (
      <div className="p-4 text-center text-gray-500 dark:text-gray-400">App not found</div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{app.name}</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{app.description}</p>
        </div>
        <div className="mt-4 sm:mt-0 space-x-3">
          <Link
            to={`/apps/${id}/edit`}
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Edit App
          </Link>
          <button
            onClick={handleCreateSecret}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Secret
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">App Secrets</h3>
          <div className="mt-4">
            {app.secrets.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">No secrets found</p>
            ) : (
              <div className="space-y-4">
                {app.secrets.map((secret) => (
                  <div
                    key={secret.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                        {secret.name}
                      </h4>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Created: {new Date(secret.createdAt).toLocaleDateString()}
                      </p>
                      {secret.lastUsed && (
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          Last used: {new Date(secret.lastUsed).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <input
                          type={showSecret === secret.id ? 'text' : 'password'}
                          value={secret.value}
                          readOnly
                          className="block w-64 px-3 py-2 text-sm border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-600 dark:text-white"
                        />
                        <button
                          type="button"
                          onClick={() => setShowSecret(showSecret === secret.id ? null : secret.id)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                        >
                          {showSecret === secret.id ? 'Hide' : 'Show'}
                        </button>
                      </div>
                      <button
                        onClick={() => handleDeleteSecret(secret.id)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">App Information</h3>
          <dl className="mt-4 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</dt>
              <dd className="mt-1">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    app.status === 'active'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}
                >
                  {app.status}
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Created</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                {new Date(app.createdAt).toLocaleDateString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Updated</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                {new Date(app.updatedAt).toLocaleDateString()}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
} 