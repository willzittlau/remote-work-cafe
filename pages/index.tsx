import Image from "next/image";
import map from "../public/map.svg";
import { Layout } from "@vercel/examples-ui";
import { useLoadScript, GoogleMap, Autocomplete } from "@react-google-maps/api";
import { useMemo, useState } from "react";
import CurrentlocationDot from "../components/CurrentLocationDot";

export const getServerSideProps = ({ query }) => ({
  props: query,
});

export default function Index({ latitude, longitude }) {
  const libraries = useMemo(() => ["places"], []);
  const [mapCenter, setMapCenter] = useState({
    lat: +latitude,
    lng: +longitude,
  });

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
    }),
    []
  );

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
          onLoad={() => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition((position) => {
                const pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                };
                setMapCenter(pos);
              });
            }
          }}
        >
          <CurrentlocationDot position={mapCenter} />
          <Autocomplete>
            <input
              type="text"
              placeholder="Search for a place"
              style={{
                background: "#fff",
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `240px`,
                height: `32px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
                position: "absolute",
                left: "0%",
                marginLeft: "0px",
              }}
            />
          </Autocomplete>
        </GoogleMap>
      </main>
    </div>
  );
}

Index.Layout = Layout;
