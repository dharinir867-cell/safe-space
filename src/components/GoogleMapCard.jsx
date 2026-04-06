import { useEffect, useMemo, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { dummyLocations } from '../utils/dummyLocations';

const DEFAULT_CENTER = {
  lat: 28.6139,
  lng: 77.209,
};

const MAP_CONTAINER_STYLE = {
  width: '100%',
  height: '100%',
};

function getMarkerColor(score) {
  if (score >= 75) {
    return '#16a34a';
  }

  if (score >= 45) {
    return '#eab308';
  }

  return '#dc2626';
}

function getMarkerIcon(score) {
  const fill = getMarkerColor(score);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
      <circle cx="18" cy="18" r="12" fill="${fill}" stroke="#ffffff" stroke-width="4" />
    </svg>
  `;

  return {
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
    scaledSize: new window.google.maps.Size(36, 36),
  };
}

function GoogleMapCard() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationError, setLocationError] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey || '',
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported in this browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        setLocationError('Location access was denied. Showing default map view.');
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      },
    );
  }, []);

  const mapCenter = useMemo(
    () => currentLocation || DEFAULT_CENTER,
    [currentLocation],
  );

  if (!apiKey) {
    return (
      <div className="flex min-h-[320px] items-center justify-center rounded-3xl border-2 border-dashed border-amber-300 bg-amber-50 p-6 text-center">
        <div>
          <p className="text-sm font-semibold text-amber-900">
            Google Maps API key missing
          </p>
          <p className="mt-2 text-sm text-amber-800">
            Add <code>VITE_GOOGLE_MAPS_API_KEY</code> to your <code>.env</code>{' '}
            file to load the map.
          </p>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex min-h-[320px] items-center justify-center rounded-3xl border border-rose-200 bg-rose-50 p-6 text-center text-sm text-rose-700">
        Unable to load Google Maps right now.
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex min-h-[320px] items-center justify-center rounded-3xl bg-slate-50 text-sm text-slate-500">
        Loading map...
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="h-[320px] overflow-hidden rounded-3xl ring-1 ring-slate-200">
        <GoogleMap
          center={mapCenter}
          mapContainerStyle={MAP_CONTAINER_STYLE}
          options={{
            disableDefaultUI: true,
            zoomControl: true,
          }}
          zoom={currentLocation ? 15 : 12}
        >
          {currentLocation && <Marker position={currentLocation} />}
          {dummyLocations.map((location) => (
            <Marker
              key={location.id}
              position={location.position}
              title={`${location.name} - Safety Score ${location.safetyScore}`}
              icon={getMarkerIcon(location.safetyScore)}
              onClick={() => setSelectedLocation(location)}
            />
          ))}
        </GoogleMap>
      </div>

      <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
        <p>
          {currentLocation
            ? 'Your current location is shown on the map.'
            : 'Waiting for your location. The map is centered on the default view for now.'}
        </p>
        {locationError && <p className="mt-1 text-amber-700">{locationError}</p>}
      </div>

      <div className="rounded-2xl bg-white px-4 py-4 ring-1 ring-slate-200">
        <p className="text-sm font-semibold text-slate-900">Safety markers</p>
        <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-600">
          <span className="inline-flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-green-600" />
            Safe
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-yellow-500" />
            Medium
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-600" />
            Unsafe
          </span>
        </div>
      </div>

      {selectedLocation && (
        <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                Place Details
              </p>
              <h3 className="mt-2 text-xl font-semibold text-slate-900">
                {selectedLocation.name}
              </h3>
            </div>

            <button
              type="button"
              onClick={() => setSelectedLocation(null)}
              className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-600 transition hover:bg-slate-50"
            >
              Close
            </button>
          </div>

          <div className="mt-4 inline-flex rounded-full bg-slate-900 px-3 py-1 text-sm font-medium text-white">
            Safety Score: {selectedLocation.safetyScore}
          </div>

          <div className="mt-5 space-y-4 text-sm leading-6 text-slate-600">
            <div>
              <p className="font-semibold text-slate-900">Description</p>
              <p className="mt-1">{selectedLocation.description}</p>
            </div>

            <div>
              <p className="font-semibold text-slate-900">Why this is safe</p>
              <p className="mt-1">{selectedLocation.whySafe}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GoogleMapCard;
