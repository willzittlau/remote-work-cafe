import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") return handleGet(req, res);

  async function handleGet(req: NextApiRequest, res: NextApiResponse) {
    const { location, radius, type } = req.query;
    const KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
    const ENDPOINT =
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
    const requestUrl = `${ENDPOINT}?location=${location}&radius=${radius}&type=${type}&key=${KEY}`;

    try {
      const response = await fetch(requestUrl);
      const data = await response.json();
      const cafes = data.results.map((result) => ({
        name: result.name,
        address: result.vicinity,
        id: result.place_id,
        icon: result.icon,
        location: {
          latitude: result.geometry.location.lat,
          longitude: result.geometry.location.lng,
        },
      }));

      res.status(200).json(cafes);
    } catch (error) {
      console.error("Error fetching cafes:", error);
      res.status(500).json({ message: "Error fetching cafes" });
    }
  }
}
