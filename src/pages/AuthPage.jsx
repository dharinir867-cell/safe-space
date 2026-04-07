import { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../services/firebase';

function AuthPage() {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isLogin = mode === 'login';

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      setErrorMessage(error.message || 'Authentication failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="animate-fade-in-up relative overflow-hidden rounded-[2rem] border border-sky-200/80 bg-[linear-gradient(160deg,#1d4ed8_0%,#2563eb_28%,#60a5fa_62%,#dbeafe_100%)] px-6 py-8 text-white shadow-[0_24px_80px_rgba(37,99,235,0.22)] sm:px-8 sm:py-10">
        <div className="pointer-events-none absolute -left-12 top-8 h-36 w-36 rounded-full bg-white/14 blur-2xl" />
        <div className="pointer-events-none absolute right-6 top-16 h-24 w-24 rounded-full bg-pink-200/30 blur-2xl" />
        <div className="pointer-events-none absolute bottom-6 left-1/3 h-28 w-28 rounded-full bg-cyan-100/20 blur-2xl" />

        <div className="pointer-events-none absolute right-8 top-10 animate-float">
          <div className="h-16 w-16 rounded-[1.75rem] bg-white/12 backdrop-blur-md" />
        </div>
        <div className="pointer-events-none absolute right-24 bottom-10 animate-float-delayed">
          <div className="h-10 w-10 rounded-full bg-pink-200/30" />
        </div>

        <span className="inline-flex rounded-full border border-white/25 bg-white/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-sky-50">
          Welcome To SafeSpace
        </span>
        <h1 className="mt-5 max-w-lg text-4xl font-semibold tracking-tight sm:text-5xl">
          A softer, safer way to discover trusted places around you.
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-7 text-sky-50/90 sm:text-base">
          SafeSpace helps users discover nearby hospitals, restrooms, hotels, and
          other places with profile-aware safety signals and support details.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <div className="rounded-3xl border border-white/20 bg-white/12 px-4 py-4 backdrop-blur-md">
            <p className="text-xs uppercase tracking-[0.2em] text-sky-100">
              Live location
            </p>
            <p className="mt-2 text-lg font-semibold">Nearby search</p>
          </div>
          <div className="rounded-3xl border border-white/20 bg-white/12 px-4 py-4 backdrop-blur-md">
            <p className="text-xs uppercase tracking-[0.2em] text-sky-100">
              Profile-aware
            </p>
            <p className="mt-2 text-lg font-semibold">Support insights</p>
          </div>
        </div>
      </div>

      <div className="animate-fade-in-up-delayed rounded-[2rem] border border-sky-100/80 bg-white/92 p-6 shadow-[0_18px_50px_rgba(37,99,235,0.08)] backdrop-blur-xl sm:p-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-600">
          Welcome
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
          {isLogin ? 'Login to SafeSpace' : 'Create your account'}
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Use your email and password to access the app.
        </p>

        <div className="mt-6 inline-flex rounded-full bg-sky-50 p-1 ring-1 ring-sky-100">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              isLogin ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-600'
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              !isLogin ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-600'
            }`}
          >
            Sign up
          </button>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              className="mb-2 block text-sm font-medium text-slate-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-2xl border border-sky-100 bg-sky-50/40 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-50"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-medium text-slate-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-sky-100 bg-sky-50/40 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-50"
              placeholder="Enter your password"
              minLength="6"
              required
            />
          </div>

          {errorMessage && (
            <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700 ring-1 ring-rose-100">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-sky-600 via-blue-500 to-pink-400 px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_35px_rgba(59,130,246,0.24)] transition hover:scale-[1.01] hover:from-sky-500 hover:to-pink-300 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {isSubmitting
              ? 'Please wait...'
              : isLogin
                ? 'Login'
                : 'Create account'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default AuthPage;
