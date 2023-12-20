import Image from "next/image";
import map from "../public/map.svg";
import { Layout } from "@vercel/examples-ui";
import {
  useLoadScript,
  GoogleMap,
  Marker,
  OverlayView,
  InfoWindow,
} from "@react-google-maps/api";
import { useMemo, useState } from "react";
import CurrentlocationDot from "../components/CurrentLocationDot";
import SearchBar from "../components/SearchBar";
import LocationButton from "../components/LocationButton";
import getPlaces from "../helpers/getPlaces";

export const getServerSideProps = ({ query }) => ({
  props: query,
});

export default function Index({ latitude, longitude }) {
  const libraries = useMemo(() => ["places"], []);
  const [mapref, setMapRef] = useState(null);
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const [mapCenter, setMapCenter] = useState({
    lat: +latitude,
    lng: +longitude,
  });
  const [userCoordinates, setUserCoordinates] = useState({
    lat: +latitude,
    lng: +longitude,
  });

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      zoomControl: true,
      minZoom: 11,
    }),
    []
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    libraries: libraries as any,
  });

  const onMapClick = (event) => {
    setSelectedPlace(null);
  };

  const handleMarkerClick = (business) => {
    setSelectedPlace(business);
  };

  const handleInfoWindowClose = () => {
    setSelectedPlace(null);
  };

  const handleCenterChanged = () => {
    if (mapref) {
      const newCenter = mapref.getCenter();
      const location = `${newCenter.lat()},${newCenter.lng()}`;
      getPlaces(location)
        .then((data) => {
          setPlaces(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleOnLoad = (map) => {
    setMapRef(map);
    const location = `${mapCenter.lat},${mapCenter.lng}`;
    getPlaces(location)
      .then((data) => {
        setPlaces(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getPixelPositionOffset = (width, height) => ({
    x: -(width / 2),
    y: -height,
  });

  const markers = places.map((place) => {
    const position = {
      lat: +place.location.latitude,
      lng: +place.location.longitude,
    };
    return (
      <Marker
        position={position}
        key={place.id}
        onClick={() => handleMarkerClick(place)}
      >
        <OverlayView
          key={place.id}
          position={position}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          getPixelPositionOffset={getPixelPositionOffset}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "200px",
                textAlign: "center",
                fontWeight: 900,
                fontSize: "0.75rem",
                backgroundColor: "transparent",
                padding: "4px",
                borderRadius: "4px",
                margin: "-53px 0 0 0",
                color: "black",
                textShadow:
                  "white 1px 1px 0, white -1px -1px 0, white -1px 1px 0, white 1px -1px 0",
              }}
            >
              {place.name}
            </div>
          </div>
        </OverlayView>
      </Marker>
    );
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
          onLoad={handleOnLoad}
          onClick={onMapClick}
          onCenterChanged={() => {
            handleCenterChanged();
          }}
        >
          <CurrentlocationDot position={userCoordinates} />
          <SearchBar setMapCenter={setMapCenter} />
          <LocationButton
            setMapCenter={setMapCenter}
            setUserCoordinates={setUserCoordinates}
          />
          {markers}
          {selectedPlace && (
            <InfoWindow
              position={{
                lat: +selectedPlace.location.latitude,
                lng: +selectedPlace.location.longitude,
              }}
              onCloseClick={handleInfoWindowClose}
            >
              <div
                className="bg-white text-black"
                style={{ maxWidth: "200px", padding: "10px" }}
              >
                <h2>
                  <b>Name:</b> {selectedPlace.name}
                </h2>
                <p>
                  <b>Address:</b> {selectedPlace.address}
                </p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </main>
    </div>
  );
}

Index.Layout = Layout;
