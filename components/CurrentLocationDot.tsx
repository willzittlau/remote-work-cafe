import { Circle, Marker } from "@react-google-maps/api";

export default function CurrentlocationDot({ position }) {
  return (
    <>
      <Marker
        zIndex={100}
        position={position}
        clickable={false}
        icon={{
          path: "M 0,0a6,6 0 1,0 12,0a6,6 0 1,0 -12, 0",
          fillColor: "#4285F4",
          fillOpacity: 0.9,
          scale: 2,
          strokeColor: "#fff",
          strokeWeight: 4,
        }}
      />
    </>
  );
}
