import Image from "next/image";
import map from "../public/map.svg";
import { Layout } from "@vercel/examples-ui";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";
import CurrentlocationDot from "../components/CurrentLocationDot";
import SearchBar from "../components/SearchBar";
import LocationButton from "../components/LocationButton";

export const getServerSideProps = ({ query }) => ({
  props: query,
});

export default function Index({ latitude, longitude }) {
  const libraries = useMemo(() => ["places"], []);
  const [places, setPlaces] = useState([]);
  const [mapCenter, setMapCenter] = useState({
    lat: +latitude,
    lng: +longitude,
  });
  const [userCoordinates, setUserCoordinates] = useState({
    lat: +latitude,
    lng: +longitude,
  });

  useEffect(() => {
    const location = `${mapCenter.lat},${mapCenter.lng}`;
    const radius = 1000;
    const type = "cafe";
    const API_URL = `/api/location?location=${location}&radius=${radius}&type=${type}`;

    fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPlaces(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [mapCenter]);

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
    }),
    []
  );

  const markers = places.map((place) => {
    const position = {
      lat: +place.location.latitude,
      lng: +place.location.longitude,
    };
    console.log(position);
    return <Marker position={position} key={place.id} label={place.name}/>;
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    libraries: libraries as any,
  });

  if (!isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="fixed inset-0 overflow-hidden opacity-75 bg-[#f8fafb]">
          <Image alt="World Map" src={map} fill={true} quality={100} />
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold">Remote Cafe</h1>
        <p className="mt-4 text-lg sm:text-xl text-gray-700">Loading ...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <main>
        <GoogleMap
          options={mapOptions}
          zoom={14}
          center={mapCenter}
          mapTypeId={google.maps.MapTypeId.ROADMAP}
          mapContainerStyle={{
            width: "100vw",
            height: "100vh",
          }}
          onCenterChanged={() => {}}
        >
          <CurrentlocationDot position={userCoordinates} />
          <SearchBar />
          <LocationButton
            setMapCenter={setMapCenter}
            setUserCoordinates={setUserCoordinates}
          />
          {markers}
        </GoogleMap>
      </main>
    </div>
  );
}

Index.Layout = Layout;
