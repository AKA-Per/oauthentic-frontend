import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';

interface FormData {
  name: string;
  callback: string;
  domain: string;
  authFlow: 'oauth' | 'oidc' | 'sso';
  scopes: string[];
}

const schema = yup.object().shape({
  name: yup.string().required('App name is required'),
  callback: yup.string().url('Must be a valid URL').required('Callback URL is required'),
  domain: yup.string().required('Domain is required'),
  authFlow: yup.string().oneOf(['oauth', 'oidc', 'sso']).required('Auth flow is required'),
  scopes: yup.array().of(yup.string()).min(1, 'At least one scope is required'),
});

const availableScopes = [
  'profile',
  'email',
  'phone',
  'address',
  'openid',
  'offline_access',
  'api',
  'read',
  'write',
  'delete',
];

export default function AppForm() {
  const [selectedScopes, setSelectedScopes] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      scopes: [],
      authFlow: 'oauth',
    },
  });

  const toggleScope = (scope: string) => {
    const newScopes = selectedScopes.includes(scope)
      ? selectedScopes.filter((s) => s !== scope)
      : [...selectedScopes, scope];
    setSelectedScopes(newScopes);
    setValue('scopes', newScopes);
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      // TODO: Implement API call to create app
      console.log('App data:', data);
    } catch (error) {
      console.error('App creation error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          App Name
        </label>
        <input
          type="text"
          id="name"
          {...register('name')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="callback" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Callback URL
        </label>
        <input
          type="url"
          id="callback"
          {...register('callback')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
        />
        {errors.callback && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.callback.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="domain" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Domain
        </label>
        <input
          type="text"
          id="domain"
          {...register('domain')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
        />
        {errors.domain && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.domain.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="authFlow" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Auth Flow
        </label>
        <select
          id="authFlow"
          {...register('authFlow')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
        >
          <option value="oauth">OAuth 2.0</option>
          <option value="oidc">OpenID Connect</option>
          <option value="sso">Single Sign-On</option>
        </select>
        {errors.authFlow && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.authFlow.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Scopes</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {availableScopes.map((scope) => (
            <button
              key={scope}
              type="button"
              onClick={() => toggleScope(scope)}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                selectedScopes.includes(scope)
                  ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
              }`}
            >
              {scope}
            </button>
          ))}
        </div>
        {errors.scopes && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.scopes.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {isSubmitting ? 'Creating...' : 'Create App'}
      </button>
    </form>
  );
} 