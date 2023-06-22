export default function getPlaces(
  location: string,
  radius: number = 1000,
  type: string = "cafe"
): Promise<any[]> {
  const API_URL = `/api/location?location=${location}&radius=${radius}&type=${type}`;

  return fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
      return error;
    });
}
