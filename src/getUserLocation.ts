export interface UserLocation {
  lat: number | null;
  lon: number | null;
  source: 'geolocation' | 'ipapi';
}

export async function getUserLocation(): Promise<UserLocation> {
  const geoResult = await tryGeolocation();

  if (geoResult) {
    return {
      lat: geoResult.lat,
      lon: geoResult.lon,
      source: 'geolocation',
    };
  }

  const ipInfo = await tryIpApi();

  return {
    lat: ipInfo?.lat ?? null,
    lon: ipInfo?.lon ?? null,
    source: 'ipapi',
  };
}

function tryGeolocation(): Promise<{ lat: number; lon: number } | null> {
  return new Promise(resolve => {
    if (!navigator.geolocation) {
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      pos => {
        resolve({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      () => resolve(null),
      { enableHighAccuracy: true, timeout: 5000 }
    );
  });
}

async function tryIpApi(): Promise<{lat: number; lon: number } | null> {
  try {
    const response = await fetch('https://ipapi.co/json/');
    if (!response.ok) return null;

    const data = await response.json();

    return {
      lat: data.latitude,
      lon: data.longitude,
    };
  } catch {
    return null;
  }
}
