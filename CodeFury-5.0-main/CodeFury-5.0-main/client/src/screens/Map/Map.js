import { useLoadScript } from "@react-google-maps/api";
import Map from "../../components/map.tsx"
import './mapStyle.css'

export default function Home() {
  <h1>Hello</h1>
  const { isLoaded } = useLoadScript({
    googleMapsApiKey:"AIzaSyDaHooiF52AOcEt3BavK50La-kq8uKdmgU",
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return(
    <Map />

  );
}
