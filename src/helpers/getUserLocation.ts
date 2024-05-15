export const getUserLocation = (): Promise<[number, number]> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        resolve([coords.longitude, coords.latitude]);
      },
      (error) => {
        alert(`Geolocation error: ${error.message}`);
        reject();
      }
    );
  });
};
