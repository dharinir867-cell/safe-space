import { signOut } from 'firebase/auth';
import { Link, Outlet } from 'react-router-dom';
import { auth } from '../services/firebase';

function Layout({ user }) {
  const handleSignOut = async () => {
    await signOut(auth);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="sticky top-0 z-40 border-b border-white/60 bg-white/75 shadow-[0_12px_32px_rgba(15,23,42,0.06)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-sm font-bold tracking-[0.2em] text-white"
              to="/"
            >
              SS
            </Link>
            <div>
              <Link className="text-xl font-bold tracking-tight text-slate-950" to="/">
                SafeSpace
              </Link>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                Safety-first local discovery
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user && (
              <span className="hidden rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100 sm:inline-flex">
                Authenticated session
              </span>
            )}

            {user && (
              <button
                type="button"
                onClick={handleSignOut}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Sign out
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
