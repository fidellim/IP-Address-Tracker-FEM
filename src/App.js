import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "./App.css";
import bg_img from "./images/pattern-bg.png";

function App() {
	return (
		<div className="App">
			<div className="infoContainer">
				IP Address Tracker Search for any IP address or domain IP Address
				Location Timezone * UTC add offset value dynamically using the API ISP
			</div>
			<img className="bg_img" src={bg_img} alt="" />
			<MapContainer
				style={{ height: "70vh" }}
				center={[51.505, -0.09]}
				zoom={13}
				scrollWheelZoom={false}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={[51.505, -0.09]}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker>
			</MapContainer>
		</div>
	);
}

export default App;
