export async function convertEyeBankAddresses(eyeBanks) {
  const geocoder = new window.google.maps.Geocoder();

  const geocode = (address) =>
    new Promise((resolve, reject) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK") {
          resolve({
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          });
        } else {
          reject("Failed: " + status);
        }
      });
    });

  const converted = [];

  for (const bank of eyeBanks) {
    try {
      console.log(`📍 Converting: ${bank.name}`);
      const location = await geocode(bank.location);
      converted.push({
        ...bank,
        lat: location.lat,
        lng: location.lng,
      });
    } catch (err) {
      console.error(`❌ Error with ${bank.name}:`, err);
    }
  }

  return converted;
}
