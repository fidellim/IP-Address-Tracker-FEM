import { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, Popup, Marker } from "react-leaflet";
import * as L from "leaflet";
import bg_img from "./images/pattern-bg.png";
import right_arrow from "./images/icon-arrow.svg";
import icon_location from "./images/icon-location.svg";

// needed to be added to update map component
const MapContainerChild = ({ center, zoom }) => {
	const map = useMap();
	// console.log("map center:", map.getCenter());
	map.setView(center, zoom);
	return null;
};

let icon = L.icon({
	iconUrl: icon_location,
});

const example = {
	ip: "",
	location: {
		country: "",
		region: "",
		city: "",
		lat: 0,
		lng: 0,
		postalCode: "",
		timezone: "",
	},
	isp: "",
};

const App = () => {
	const [ipAddress, setIpAddress] = useState("");
	const [currIpAddress, setCurrIpAddress] = useState("192.212.174.101");
	const [isError, setIsError] = useState(false);
	const [data, setData] = useState(example);

	useEffect(() => {
		const fetchIp = async () => {
			const res = await fetch(
				`https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_API_KEY}&ipAddress=${currIpAddress}`
			);

			if (!res.ok) {
				const message = `An error has occured: ${res.status}`;
				setIsError(true);
				throw new Error(message);
			}

			const data = await res.json();
			setData(data);
			setIsError(false);
		};
		fetchIp();
	}, [currIpAddress]);

	const handlePosition = (e) => {
		e.preventDefault();
		if (currIpAddress !== ipAddress) setCurrIpAddress(ipAddress);
	};

	const handleIpAddress = (e) => {
		e.preventDefault();
		setIpAddress(e.target.value);
	};

	return (
		<div className="App">
			<main>
				<div className="infoContainer">
					<h1>IP Address Tracker</h1>
					<div className="errorContainer">
						<div className={`wrongInput ${!isError && "hide"}`}>
							IP Address is wrong. Please try again.
						</div>
						<div className="searchContainer">
							<form>
								<input
									type="text"
									name="ip address search"
									id=""
									value={ipAddress}
									onChange={handleIpAddress}
									placeholder="Search for any IP address or domain IP"
								/>
								<button onClick={handlePosition}>
									<img src={right_arrow} alt="" />
								</button>
							</form>
						</div>
					</div>
					<div className="locationInfoContainer">
						<div>
							<h2>IP Address</h2>
							<p>{data.ip}</p>
						</div>
						<div>
							<h2>Location</h2>
							<p>
								{data.location.city}, {data.location.region}{" "}
								{data.location.postalCode}
							</p>
						</div>
						<div>
							<h2>Timezone</h2>
							<p>UTC {data.location.timezone}</p>
						</div>
						<div>
							<h2>ISP</h2>
							<p>{data.isp}</p>
						</div>
					</div>
				</div>
				<img className="bg_img" src={bg_img} alt="" />
				<MapContainer
					style={{ height: "65vh" }}
					center={[data.location.lat, data.location.lng]}
					zoom={13}
					zoomControl={false}
					scrollWheelZoom={false}
				>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					<Marker
						position={[data.location.lat, data.location.lng]}
						icon={icon}
						style={{ marginRight: "-20px" }}
					>
						<Popup>
							{data.location.city}, {data.location.region}{" "}
							{data.location.postalCode}
						</Popup>
					</Marker>

					<MapContainerChild
						center={[data.location.lat, data.location.lng]}
						zoom="13"
					/>
				</MapContainer>
			</main>
		</div>
	);
};

export default App;
