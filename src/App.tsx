import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Apps from './pages/Apps';
import AppDetails from './pages/AppDetails';
import AppForm from './components/apps/AppForm';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import ProtectedRoute from './components/auth/ProtectedRoute';
import OAuth from './components/auth/OAuth';
import { LoaderProvider } from './context/LoaderContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <LoaderProvider>
        <AuthProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path='/oauth' element={<OAuth />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <Routes>
                        <Route index element={<Navigate to="/dashboard" replace />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="users" element={<Users />} />
                        <Route path="apps" element={<Apps />} />
                        <Route path="apps/new" element={<AppForm />} />
                        <Route path="apps/:id" element={<AppDetails />} />
                        <Route path="apps/:id/edit" element={<AppForm />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="settings" element={<Settings />} />
                      </Routes>
                    </MainLayout>
                  </ProtectedRoute>
                }
              />
            </Routes>
        </AuthProvider>
        </LoaderProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
