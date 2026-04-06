import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { auth } from './services/firebase';
import AuthPage from './pages/AuthPage';
import ProfileSelectionPage from './pages/ProfileSelectionPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const [selectedProfile, setSelectedProfile] = useState('');
  const [user, setUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsCheckingAuth(false);
    });

    return unsubscribe;
  }, []);

  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 text-sm text-slate-600">
        Checking authentication...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Routes>
        <Route element={<Layout user={user} />}>
          <Route
            path="/"
            element={user ? <Navigate to="/profile" replace /> : <AuthPage />}
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isAllowed={Boolean(user)}>
                <ProfileSelectionPage
                  selectedProfile={selectedProfile}
                  setSelectedProfile={setSelectedProfile}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute isAllowed={Boolean(user)} redirectPath="/">
                <HomePage selectedProfile={selectedProfile} />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
