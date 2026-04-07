import { useNavigate } from 'react-router-dom';

const PROFILE_OPTIONS = [
  {
    id: 'women',
    label: 'Women',
    description: 'Find places suited to women-focused safety needs.',
    accent: 'from-pink-200 via-rose-100 to-sky-100',
    avatar: (
      <div className="relative flex h-14 w-14 items-center justify-center">
        <span className="absolute h-14 w-14 rounded-full bg-pink-200" />
        <span className="absolute bottom-0 h-8 w-10 rounded-t-full rounded-b-[1.25rem] bg-rose-400" />
        <span className="absolute top-2 h-7 w-7 rounded-full bg-amber-50" />
        <span className="absolute top-1 h-8 w-8 rounded-full border-[5px] border-pink-500" />
      </div>
    ),
  },
  {
    id: 'trans',
    label: 'Transgender',
    description: 'Prioritize spaces that feel respectful and inclusive.',
    accent: 'from-sky-200 via-pink-100 to-indigo-100',
    avatar: (
      <div className="relative flex h-14 w-14 items-center justify-center">
        <span className="absolute h-14 w-14 rounded-full bg-sky-200" />
        <span className="absolute bottom-0 h-8 w-10 rounded-t-full rounded-b-[1.25rem] bg-indigo-400" />
        <span className="absolute top-2 h-7 w-7 rounded-full bg-amber-50" />
        <span className="absolute top-1 h-8 w-8 rounded-full border-[5px] border-pink-300" />
      </div>
    ),
  },
  {
    id: 'elderly',
    label: 'Elderly',
    description: 'Highlight places that are accessible and dependable.',
    accent: 'from-violet-100 via-sky-50 to-white',
    avatar: (
      <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-violet-100 text-base font-semibold text-violet-600">
        EL
      </div>
    ),
  },
  {
    id: 'child',
    label: 'Child',
    description: 'Focus on places that feel family-friendly and secure.',
    accent: 'from-yellow-100 via-pink-50 to-sky-100',
    avatar: (
      <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-yellow-100 text-base font-semibold text-yellow-600">
        CH
      </div>
    ),
  },
];

function ProfileSelectionPage({ selectedProfile, setSelectedProfile }) {
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!selectedProfile) {
      return;
    }

    navigate('/home');
  };

  return (
    <section className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem]">
      <div className="pointer-events-none absolute -left-12 top-10 h-40 w-40 rounded-full bg-sky-200/50 blur-3xl" />
      <div className="pointer-events-none absolute right-8 top-0 h-28 w-28 rounded-full bg-pink-200/50 blur-3xl" />
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="animate-fade-in-up relative overflow-hidden rounded-[2rem] border border-sky-200/80 bg-[linear-gradient(160deg,#2563eb_0%,#3b82f6_30%,#7dd3fc_70%,#eff6ff_100%)] px-6 py-8 text-white shadow-[0_24px_80px_rgba(37,99,235,0.2)] sm:px-8 sm:py-10">
          <div className="pointer-events-none absolute left-8 top-8 h-24 w-24 rounded-full bg-white/12 blur-2xl" />
          <div className="pointer-events-none absolute right-10 top-24 h-14 w-14 rounded-full bg-pink-200/30 blur-xl" />
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-50">
            Personalize Your Safety
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">
            Pick the profile that fits you best.
          </h1>
          <p className="mt-4 max-w-md text-sm leading-7 text-sky-50/90">
            The app will show more relevant places and support details based on the
            selected profile, from breastfeeding-friendly restrooms to trans-friendly
            access and elder assistance.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="rounded-3xl border border-white/20 bg-white/12 px-4 py-4 backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.18em] text-sky-100">
                Search
              </p>
              <p className="mt-2 text-lg font-semibold">Hospitals, hotels, restrooms</p>
            </div>
            <div className="rounded-3xl border border-white/20 bg-white/12 px-4 py-4 backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.18em] text-sky-100">
                Support
              </p>
              <p className="mt-2 text-lg font-semibold">Profile-based safety cues</p>
            </div>
          </div>
        </div>

        <div className="animate-fade-in-up-delayed rounded-[2rem] border border-sky-100/80 bg-white/92 p-6 shadow-[0_18px_50px_rgba(37,99,235,0.08)] backdrop-blur-xl sm:p-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-600">
          Safety Setup
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
          Choose your safety profile
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Select the profile that best matches the person using SafeSpace.
        </p>

        <div className="mt-6 grid gap-3">
          {PROFILE_OPTIONS.map((profile) => {
            const isSelected = selectedProfile === profile.label;

            return (
              <button
                key={profile.id}
                type="button"
                onClick={() => setSelectedProfile(profile.label)}
                className={`group rounded-[1.5rem] border px-4 py-4 text-left transition ${
                  isSelected
                    ? 'border-sky-400 bg-sky-50 shadow-[0_12px_32px_rgba(59,130,246,0.14)]'
                    : 'border-slate-200 bg-white hover:-translate-y-0.5 hover:border-sky-200 hover:bg-sky-50/40'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-gradient-to-br ${profile.accent} ring-1 ring-white/80 transition group-hover:scale-[1.03]`}
                  >
                    {profile.avatar}
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="block text-base font-semibold text-slate-900">
                      {profile.label}
                    </span>
                    <span className="mt-1 block text-sm leading-6 text-slate-600">
                      {profile.description}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleContinue}
          disabled={!selectedProfile}
          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-sky-600 via-blue-500 to-pink-400 px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_35px_rgba(59,130,246,0.24)] transition hover:scale-[1.01] hover:from-sky-500 hover:to-pink-300 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Continue
        </button>
        </div>
      </div>
    </section>
  );
}

export default ProfileSelectionPage;
