import { useLoadScript, GoogleMap } from "@react-google-maps/api";
import { useMemo } from "react";

export const getServerSideProps = ({ query }) => ({
  props: query,
});

export default function Map({ latitude, longitude }) {
  const libraries = useMemo(() => ["places"], []);
  const mapCenter = useMemo(
    () => ({ lat: +latitude, lng: +longitude }),
    []
  );

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
    return <p>Loading...</p>;
  }

  return (
    <div>
      <GoogleMap
        options={mapOptions}
        zoom={14}
        center={mapCenter}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={{
          width: "100vw",
          height: "100vh",
        }}
        onLoad={() => console.log("Map Loaded...")}
      />
    </div>
  );
}
