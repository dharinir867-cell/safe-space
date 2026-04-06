import { signOut } from 'firebase/auth';
import { Link, Outlet } from 'react-router-dom';
import { auth } from '../services/firebase';

function Layout({ user }) {
  const handleSignOut = async () => {
    await signOut(auth);
  };

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-slate-900 text-white shadow-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <Link className="text-xl font-bold tracking-tight" to="/">
            SafeSpace
          </Link>

          {user && (
            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Sign out
            </button>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
