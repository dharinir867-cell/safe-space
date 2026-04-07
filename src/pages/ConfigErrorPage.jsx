import { firebaseConfigError } from '../services/firebase';

function ConfigErrorPage() {
  return (
    <section className="mx-auto max-w-2xl">
      <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm sm:p-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-700">
          Configuration Required
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
          Firebase environment variables are missing
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-700">
          SafeSpace could not start authentication because the Firebase config
          was not found at runtime.
        </p>

        <div className="mt-5 rounded-2xl bg-white px-4 py-4 text-sm text-slate-700 ring-1 ring-amber-100">
          <p className="font-semibold text-slate-900">Current issue</p>
          <p className="mt-2">{firebaseConfigError}</p>
        </div>

        <div className="mt-5 rounded-2xl bg-white px-4 py-4 text-sm text-slate-700 ring-1 ring-amber-100">
          <p className="font-semibold text-slate-900">Add these in Vercel</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>VITE_FIREBASE_API_KEY</li>
            <li>VITE_FIREBASE_AUTH_DOMAIN</li>
            <li>VITE_FIREBASE_PROJECT_ID</li>
            <li>VITE_FIREBASE_STORAGE_BUCKET</li>
            <li>VITE_FIREBASE_MESSAGING_SENDER_ID</li>
            <li>VITE_FIREBASE_APP_ID</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default ConfigErrorPage;
