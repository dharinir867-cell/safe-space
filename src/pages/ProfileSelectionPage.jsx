import { useNavigate } from 'react-router-dom';

const PROFILE_OPTIONS = [
  {
    id: 'women',
    label: 'Women',
    description: 'Find places suited to women-focused safety needs.',
  },
  {
    id: 'trans',
    label: 'Trans',
    description: 'Prioritize spaces that feel respectful and inclusive.',
  },
  {
    id: 'elderly',
    label: 'Elderly',
    description: 'Highlight places that are accessible and dependable.',
  },
  {
    id: 'child',
    label: 'Child',
    description: 'Focus on places that feel family-friendly and secure.',
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
    <section className="mx-auto max-w-md">
      <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">
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
                className={`rounded-2xl border px-4 py-4 text-left transition ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-50 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span className="block text-base font-semibold text-slate-900">
                  {profile.label}
                </span>
                <span className="mt-1 block text-sm text-slate-600">
                  {profile.description}
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleContinue}
          disabled={!selectedProfile}
          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Continue
        </button>
      </div>
    </section>
  );
}

export default ProfileSelectionPage;
