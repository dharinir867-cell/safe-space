import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <section className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
        Page not found
      </h1>
      <p className="mt-3 text-base text-slate-600">
        The page you requested does not exist.
      </p>
      <Link
        className="mt-5 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
        to="/"
      >
        Back to home
      </Link>
    </section>
  );
}

export default NotFoundPage;
