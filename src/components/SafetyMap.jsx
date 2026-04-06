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

function SafetyMap() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationError, setLocationError] = useState('');

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

  return (
    <div className="space-y-3">
      <div className="h-[320px] overflow-hidden rounded-3xl ring-1 ring-slate-200 sm:h-[380px]">
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

          {dummyLocations.map((location) => (
            <Marker
              key={location.id}
              position={[location.position.lat, location.position.lng]}
              icon={createSafetyIcon(location.safetyScore)}
            >
              <Popup>
                <div className="min-w-[180px] space-y-2">
                  <p className="text-base font-semibold text-slate-900">
                    {location.name}
                  </p>
                  <p className="text-sm text-slate-700">
                    Safety Score: {location.safetyScore}
                  </p>
                  <p className="text-sm text-slate-600">{location.description}</p>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Why this is safe
                    </p>
                    <p className="text-sm text-slate-600">{location.whySafe}</p>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
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
    </div>
  );
}

export default SafetyMap;
