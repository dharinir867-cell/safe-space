import { useEffect, useMemo, useState } from 'react';
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { dummyLocations } from '../utils/dummyLocations';

const DEFAULT_CENTER = [28.6139, 77.209];

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function getSafetyColor(score) {
  if (score >= 75) {
    return '#16a34a';
  }

  if (score >= 45) {
    return '#eab308';
  }

  return '#dc2626';
}

function createSafetyIcon(score) {
  return L.divIcon({
    className: 'custom-safety-marker',
    html: `<span style="display:block;width:18px;height:18px;border-radius:9999px;background:${getSafetyColor(
      score,
    )};border:3px solid white;box-shadow:0 2px 6px rgba(15,23,42,0.25);"></span>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    popupAnchor: [0, -10],
  });
}

function RecenterMap({ center }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);

  return null;
}

function SafetyMap({ selectedProfile, selectedCategory, searchQuery }) {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationError, setLocationError] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported in this browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation([position.coords.latitude, position.coords.longitude]);
      },
      () => {
        setLocationError('Location access was denied. Showing the default map view.');
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

  const nearbyLocations = useMemo(
    () =>
      dummyLocations.map((location) => ({
        ...location,
        position: [
          mapCenter[0] + location.offset.lat,
          mapCenter[1] + location.offset.lng,
        ],
      })),
    [mapCenter],
  );

  const filteredLocations = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return nearbyLocations.filter((location) => {
      const matchesCategory = selectedCategory
        ? location.categories.includes(selectedCategory)
        : true;

      const matchesQuery = normalizedQuery
        ? location.name.toLowerCase().includes(normalizedQuery) ||
          location.categories.some((category) =>
            category.toLowerCase().includes(normalizedQuery),
          ) ||
          location.supportTags.some((tag) =>
            tag.toLowerCase().includes(normalizedQuery),
          )
        : true;

      return matchesCategory && matchesQuery;
    });
  }, [nearbyLocations, searchQuery, selectedCategory]);

  const hasSearchSelection = Boolean(selectedCategory || searchQuery.trim());

  useEffect(() => {
    if (!selectedLocation) {
      return;
    }

    const updatedSelection = filteredLocations.find(
      (location) => location.id === selectedLocation.id,
    );

    setSelectedLocation(updatedSelection || null);
  }, [filteredLocations, selectedLocation]);

  if (!hasSearchSelection) {
    return (
      <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-gradient-to-br from-slate-50 to-cyan-50 px-6 py-12 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Search First
        </p>
        <h3 className="mt-3 text-2xl font-semibold text-slate-900">
          Search for hospitals, restrooms, hotels, and more
        </h3>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">
          Once you search for a place type, the map will open with nearby safety
          results and support details tailored to the selected profile.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative h-[340px] overflow-hidden rounded-[1.75rem] ring-1 ring-slate-200 sm:h-[420px]">
        <div className="pointer-events-none absolute inset-x-6 top-4 z-[400] flex items-center justify-between rounded-full border border-white/80 bg-white/90 px-4 py-2 text-xs font-medium text-slate-700 shadow-lg backdrop-blur">
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            Location-aware safety map
          </span>
          <span className="hidden sm:inline">OpenStreetMap live view</span>
        </div>

        <MapContainer
          center={mapCenter}
          zoom={currentLocation ? 15 : 13}
          scrollWheelZoom
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <RecenterMap center={mapCenter} />

          {currentLocation && (
            <Marker position={currentLocation}>
              <Popup>
                <div className="space-y-1">
                  <p className="font-semibold">Your location</p>
                  <p className="text-sm text-slate-600">
                    This marker shows your current position.
                  </p>
                </div>
              </Popup>
            </Marker>
          )}

          {filteredLocations.map((location) => (
            <Marker
              key={location.id}
              position={location.position}
              icon={createSafetyIcon(location.safetyScore)}
              eventHandlers={{
                click: () => {
                  setSelectedLocation(location);
                },
              }}
            >
              <Popup>
                <div className="min-w-[180px] space-y-2">
                  <p className="text-base font-semibold text-slate-900">
                    {location.name}
                  </p>
                  <p className="text-sm text-slate-700">
                    Safety Score: {location.safetyScore}
                  </p>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                    {location.categories.join(' . ')}
                  </p>
                  <p className="text-sm text-slate-600">{location.description}</p>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Support available
                    </p>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {location.supportTags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {selectedProfile
                        ? `${selectedProfile} support`
                        : 'Why this is safe'}
                    </p>
                    {selectedProfile ? (
                      <div className="mt-1 flex flex-wrap gap-2">
                        {(location.profileSupport[selectedProfile] || []).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-emerald-50 px-2 py-1 text-xs text-emerald-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-600">{location.whySafe}</p>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="animate-fade-in-up rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
        <p>
          {currentLocation
            ? `${filteredLocations.length} nearby result${filteredLocations.length === 1 ? '' : 's'} found around your location.`
            : 'Waiting for your location. The map is centered on the default view for now.'}
        </p>
        {locationError && <p className="mt-1 text-amber-700">{locationError}</p>}
        {!filteredLocations.length && (
          <p className="mt-1 text-amber-700">
            No nearby results matched this search. Try a different place type.
          </p>
        )}
      </div>

      {selectedLocation && (
        <div className="animate-fade-in-up rounded-[1.5rem] border border-slate-200 bg-gradient-to-br from-white via-white to-slate-50 px-5 py-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Review
              </p>
              <h3 className="mt-2 text-xl font-semibold text-slate-900">
                {selectedLocation.name}
              </h3>
            </div>

            <span className="rounded-full bg-slate-900 px-3 py-1 text-sm font-medium text-white shadow-sm">
              Score: {selectedLocation.safetyScore}
            </span>
          </div>

          <div className="mt-4 grid gap-4 text-sm leading-6 text-slate-600 md:grid-cols-2">
            <div>
              <p className="font-semibold text-slate-900">Description</p>
              <p className="mt-1">{selectedLocation.description}</p>
            </div>

            <div>
              <p className="font-semibold text-slate-900">
                {selectedProfile
                  ? `${selectedProfile} support available`
                  : 'Why this is safe'}
              </p>
              {selectedProfile ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {(selectedLocation.profileSupport[selectedProfile] || []).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-1">{selectedLocation.whySafe}</p>
              )}
            </div>

            <div>
              <p className="font-semibold text-slate-900">Why this is safe</p>
              <p className="mt-1">{selectedLocation.whySafe}</p>
            </div>

            <div>
              <p className="font-semibold text-slate-900">General support</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedLocation.supportTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-[1.5rem] border border-slate-200 bg-white px-4 py-4 ring-1 ring-slate-100">
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
    </div>
  );
}

export default SafetyMap;
