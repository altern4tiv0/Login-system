import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { UserProvider, useUser } from './context/UserContext'; // Contexto del usuario
import Loader from './common/Loader';
import DefaultLayout from './layout/DefaultLayout';
import SignIn from './components/Main/Login'; // Ruta hacia tu componente de login
import Profile from './pages/Profile';
import Settings from './pages/Settings';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user } = useUser();
    return user ? <>{children}</> : <Navigate to="/login" />;
  };

  return (
    <UserProvider>
      {loading ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DefaultLayout />
              </ProtectedRoute>
            }
          >
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      )}
    </UserProvider>
  );
}

export default App;
