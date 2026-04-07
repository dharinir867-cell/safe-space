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
      <div className="animate-fade-in-up overflow-hidden rounded-[2rem] border border-slate-200/80 bg-slate-950 px-6 py-8 text-white shadow-[0_24px_80px_rgba(15,23,42,0.2)] sm:px-8 sm:py-10">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.16),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.16),_transparent_28%)]" />
        <span className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
          Secure Access
        </span>
        <h1 className="mt-5 max-w-lg text-4xl font-semibold tracking-tight sm:text-5xl">
          Feel confident before you even step outside.
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
          SafeSpace helps users discover nearby hospitals, restrooms, hotels, and
          other places with profile-aware safety signals and support details.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <div className="glass-card rounded-3xl px-4 py-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
              Live location
            </p>
            <p className="mt-2 text-lg font-semibold">Nearby search</p>
          </div>
          <div className="glass-card rounded-3xl px-4 py-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
              Profile-aware
            </p>
            <p className="mt-2 text-lg font-semibold">Support insights</p>
          </div>
        </div>
      </div>

      <div className="animate-fade-in-up-delayed rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">
          Welcome
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
          {isLogin ? 'Login to SafeSpace' : 'Create your account'}
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Use your email and password to access the app.
        </p>

        <div className="mt-6 inline-flex rounded-full bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              isLogin ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600'
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              !isLogin ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600'
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
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
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
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50"
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
            className="inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
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
