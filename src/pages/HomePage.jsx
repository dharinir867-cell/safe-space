import EmergencyButton from '../components/EmergencyButton';
import SafetyMap from '../components/SafetyMap';
import { useMemo, useState } from 'react';
import { normalizeSearchCategory } from '../utils/searchCategories';

const SEARCH_OPTIONS = [
  { id: 'hospital', label: 'Hospitals' },
  { id: 'restroom', label: 'Restrooms' },
  { id: 'hotel', label: 'Hotels' },
];

function HomePage({ selectedProfile }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const profileSummary = useMemo(() => {
    switch (selectedProfile) {
      case 'Women':
        return 'Search for hospitals, restrooms, or hotels with maternity and breastfeeding support.';
      case 'Transgender':
        return 'Search for spaces with inclusive access, trans-friendly restrooms, and respectful support.';
      case 'Elderly':
        return 'Search for places with wheelchair assistance, lift access, and elder support.';
      case 'Child':
        return 'Search for family-friendly places with child support and baby care facilities.';
      default:
        return 'Choose a place type to search nearby safe spaces.';
    }
  }, [selectedProfile]);

  return (
    <>
      <div className="relative space-y-8 overflow-hidden pb-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[440px] bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_36%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.16),_transparent_32%),linear-gradient(180deg,_#f8fafc_0%,_#ecfeff_42%,_#f8fafc_100%)]" />

        <section className="animate-fade-in-up overflow-hidden rounded-[2rem] border border-slate-200/70 bg-slate-950 px-6 py-8 text-white shadow-[0_24px_80px_rgba(15,23,42,0.22)] sm:px-8 sm:py-10">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(52,211,153,0.16),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.16),_transparent_28%)]" />

          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
                SafeSpace Live View
              </p>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Explore safer places around you with a clearer, faster view.
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                Your live location, nearby safety markers, and quick place reviews
                now sit in one focused safety dashboard.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:min-w-[320px]">
              <div className="glass-card animate-float rounded-3xl px-4 py-4 text-white">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                  Mode
                </p>
                <p className="mt-2 text-lg font-semibold">Local Safety Scan</p>
              </div>
              <div className="glass-card animate-float-delayed rounded-3xl px-4 py-4 text-white">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                  Signals
                </p>
                <p className="mt-2 text-lg font-semibold">Safe, Medium, Risky</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
          <div className="space-y-6">
            <div className="animate-fade-in-up rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                Selected Profile
              </p>
              <div className="mt-4 rounded-[1.5rem] bg-gradient-to-br from-emerald-50 via-white to-cyan-50 px-5 py-5 ring-1 ring-emerald-100">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-lg">
                  S
                </div>
                <p className="mt-4 text-sm text-slate-600">Current user type</p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">
                  {selectedProfile || 'Not selected'}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {profileSummary}
                </p>
              </div>
            </div>

            <div className="animate-fade-in-up-delayed rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                Search Flow
              </p>
              <div className="mt-4 space-y-3">
                <div className="rounded-2xl bg-slate-50 px-4 py-4">
                  <p className="text-sm font-semibold text-slate-900">
                    1. Search a place type
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Start with hospitals, restrooms, hotels, or a typed search.
                  </p>
                </div>
                <div className="rounded-2xl bg-amber-50 px-4 py-4">
                  <p className="text-sm font-semibold text-slate-900">
                    2. See nearby results
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    The map opens with places around your live location.
                  </p>
                </div>
                <div className="rounded-2xl bg-rose-50 px-4 py-4">
                  <p className="text-sm font-semibold text-slate-900">
                    3. Review support details
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Check profile-specific support like breastfeeding rooms or elder help.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-fade-in-up-delayed rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                  Search + Map
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
                  Search nearby places before opening the map
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                  Users can search for hospitals, restrooms, hotels, and similar
                  places. Results then open around the current location with
                  profile-specific support.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live area
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-2 text-xs font-semibold text-sky-700 ring-1 ring-sky-100">
                  <span className="h-2.5 w-2.5 rounded-full bg-sky-500" />
                  Tap for details
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-4 rounded-[1.75rem] border border-slate-200 bg-slate-50/80 p-4">
              <div className="flex flex-col gap-3 md:flex-row">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search hospitals, restrooms, hotels..."
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={() =>
                    setSelectedCategory(normalizeSearchCategory(searchQuery))
                  }
                  className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                >
                  Search Nearby
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {SEARCH_OPTIONS.map((option) => {
                  const isActive = selectedCategory === option.id;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(option.id);
                        setSearchQuery(option.label);
                      }}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                        isActive
                          ? 'bg-slate-900 text-white'
                          : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6">
              <SafetyMap
                selectedProfile={selectedProfile}
                selectedCategory={selectedCategory}
                searchQuery={searchQuery}
              />
            </div>
          </div>
        </section>
      </div>

      <EmergencyButton />
    </>
  );
}

export default HomePage;
