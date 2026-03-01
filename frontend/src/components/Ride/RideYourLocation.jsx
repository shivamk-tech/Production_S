import React, { useEffect, useRef, useState, useCallback } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import RideLocation from "./RideLocation";

const pickupIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149060.png", // Replace with your pickup icon path
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const dropoffIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // Replace with your dropoff icon path
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const RideYourLocation = () => {
  const mapRef = useRef(null);
  const routingControlRef = useRef(null);
  const pickupMarkerRef = useRef(null);
  const dropoffMarkerRef = useRef(null);

  const [pickup, setPickup] = useState(null);
  const [dropoff, setDropoff] = useState(null);
  const [fareInfo, setFareInfo] = useState(null);

  // 🔥 Handle Search Button
  const handleSearch = useCallback(() => {
    if (!mapRef.current || !pickup || !dropoff) return;

    if (!pickup.lat || !dropoff.lat) {
      alert("Please select a location from the suggestions");
      return;
    }

    if (routingControlRef.current) {
      mapRef.current.removeControl(routingControlRef.current);
    }

    if (pickupMarkerRef.current) {
      mapRef.current.removeLayer(pickupMarkerRef.current);
    }
    if (dropoffMarkerRef.current) {
      mapRef.current.removeLayer(dropoffMarkerRef.current);
    }

    routingControlRef.current = L.Routing.control({
      waypoints: [
        L.latLng(pickup.lat, pickup.lng),
        L.latLng(dropoff.lat, dropoff.lng),
      ],
      routeWhileDragging: false,
      show: false,
      addWaypoints: false,
      lineOptions: {
        styles: [{ color: "#000", opacity: 0.8, weight: 5 }],
      },
      createMarker: function (i, wp, nWps) {
        if (i === 0) {
          return L.marker(wp.latLng, { icon: pickupIcon });
        } else if (i === nWps - 1) {
          return L.marker(wp.latLng, { icon: dropoffIcon });
        }
        return null;
      },
    }).addTo(mapRef.current);

    // 🔥 Get Distance & Fare
    routingControlRef.current.on("routesfound", function (e) {
      const route = e.routes[0];
      const distanceInKm = route.summary.totalDistance / 1000;
      const durationInMin = route.summary.totalTime / 60;

      setFareInfo({
        distance: distanceInKm.toFixed(2),
        duration: durationInMin.toFixed(0),
        fares: {
          cab: (50 + distanceInKm * 15).toFixed(0),
          auto: (30 + distanceInKm * 10).toFixed(0),
          moto: (distanceInKm < 4 ? 30 : distanceInKm * 8).toFixed(0),
        }
      });
    });

    routingControlRef.current.on("routingerror", function (e) {
      console.error("Routing error:", e);
    });
  }, [pickup, dropoff]);

  // 🔥 Initialize Map Once
  useEffect(() => {
    if (mapRef.current) return;

    const map = L.map("map").setView([28.6139, 77.2090], 13);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "Uber.Creations",
    }).addTo(map);

    map.locate({ setView: true, maxZoom: 16 });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (pickup && mapRef.current) {
      mapRef.current.flyTo([pickup.lat, pickup.lng], 14);
      if (pickupMarkerRef.current) {
        mapRef.current.removeLayer(pickupMarkerRef.current);
      }
      pickupMarkerRef.current = L.marker([pickup.lat, pickup.lng], {
        icon: pickupIcon,
      }).addTo(mapRef.current);
    }
  }, [pickup]);

  useEffect(() => {
    if (dropoff && mapRef.current) {
      mapRef.current.flyTo([dropoff.lat, dropoff.lng], 14);
      if (dropoffMarkerRef.current) {
        mapRef.current.removeLayer(dropoffMarkerRef.current);
      }
      dropoffMarkerRef.current = L.marker([dropoff.lat, dropoff.lng], {
        icon: dropoffIcon,
      }).addTo(mapRef.current);
    }
  }, [dropoff]);

  useEffect(() => {
    if (pickup && dropoff) {
      handleSearch();
    }
  }, [pickup, dropoff, handleSearch]);

  return (
    <div className="flex gap-6 w-full">
      {/* Left Panel */}
      <RideLocation
        pickup={pickup}
        dropoff={dropoff}
        setPickup={setPickup}
        setDropoff={setDropoff}
        onSearch={handleSearch}
        fareInfo={fareInfo}
      />

      {/* Map */}
      <div className="h-175 w-240 rounded-2xl overflow-hidden bg-white shadow-xl border border-gray-200 relative">
        <div id="map" className="w-full h-full"></div>

        {/* Fare Box */}
        {fareInfo && (
          <div className="absolute bottom-4 left-4 bg-white p-4 rounded-xl shadow-lg">
            <div className="text-sm font-medium text-gray-500">Trip Info</div>
            <div className="font-bold text-lg">{fareInfo.distance} km</div>
            <div className="text-sm text-gray-500">{fareInfo.duration} min</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RideYourLocation;