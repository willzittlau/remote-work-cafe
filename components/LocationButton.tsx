export default function LocationButton({ setMapCenter }) {
  return (
    <button
      onClick={() => {
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
      style={{
        background: "#fff",
        boxSizing: `border-box`,
        border: `2px solid black`,
        width: `48px`,
        height: `48px`,
        padding: `0 12px`,
        borderRadius: `8px`,
        boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
        fontSize: `14px`,
        outline: `none`,
        textOverflow: `ellipses`,
        position: "absolute",
        left: "330px",
        marginLeft: "10px",
        marginTop: "10px",
        backgroundImage: 'url(current-location-icon.svg)',
        backgroundSize: "20px 20px",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
    </button>
  );
}
