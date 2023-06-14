import { Autocomplete } from "@react-google-maps/api";

export default function SearchBar() {
  return (
    <Autocomplete>
      <input
        type="text"
        placeholder="Search for a place"
        style={{
          background: "#fff",
          boxSizing: `border-box`,
          border: `2px solid black`,
          width: `320px`,
          height: `48px`,
          padding: `0 12px`,
          borderRadius: `8px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
          position: "absolute",
          left: "0%",
          marginLeft: "10px",
          marginTop: "10px",
        }}
      />
    </Autocomplete>
  );
}
