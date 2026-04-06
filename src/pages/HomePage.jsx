import EmergencyButton from '../components/EmergencyButton';
import GoogleMapCard from '../components/GoogleMapCard';

function HomePage({ selectedProfile }) {
  return (
    <>
      <div className="space-y-6 pb-20">
        <section className="rounded-3xl bg-slate-900 px-6 py-8 text-white shadow-sm">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-300">
            SafeSpace
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Home
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200">
            View your selected profile and nearby safety map area from one simple
            screen.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
              Selected Profile
            </p>
            <div className="mt-4 rounded-2xl bg-emerald-50 px-4 py-4 ring-1 ring-emerald-100">
              <p className="text-sm text-slate-600">Current user type</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">
                {selectedProfile || 'Not selected'}
              </p>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                  Map
                </p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">
                  Nearby Safe Places
                </h2>
              </div>
            </div>

            <div className="mt-5">
              <GoogleMapCard />
            </div>
          </div>
        </section>
      </div>

      <EmergencyButton />
    </>
  );
}

export default HomePage;
