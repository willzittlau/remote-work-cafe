import Image from "next/image";
import map from "../public/map.svg";
import { Layout } from "@vercel/examples-ui";
import { useLoadScript, GoogleMap } from "@react-google-maps/api";
import { useMemo } from "react";

export const getServerSideProps = ({ query }) => ({
  props: query,
});

export default function Index({ latitude, longitude }) {
  const libraries = useMemo(() => ["places"], []);
  const mapCenter = useMemo(() => ({ lat: +latitude, lng: +longitude }), []);

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
          onLoad={() => console.log(`Map Loaded. Found coordinates - ${latitude}, ${longitude}`)}
        />
      </main>
    </div>
  );
}

Index.Layout = Layout;
