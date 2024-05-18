import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvent } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
});

function SetViewOnClick({ onLocationSelect, setPosition }) {
  useMapEvent('click', (e) => {
    const { lat, lng } = e.latlng;
    setPosition([lat, lng]);
    onLocationSelect(lat, lng);
  });
  return null;
}

function RecenterMap({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, 13);
    }
  }, [center, map]);
  return null;
}

const MapPicker = ({ onLocationSelect, center }) => {
  const [position, setPosition] = useState(center || [51.505, -0.09]);

  useEffect(() => {
    if (center) {
      setPosition(center);
    }
  }, [center]);

  return (
    <MapContainer center={center || [51.505, -0.09]} zoom={13} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <RecenterMap center={center} />
      <SetViewOnClick onLocationSelect={onLocationSelect} setPosition={setPosition} />
      {position && <Marker position={position} />}
    </MapContainer>
  );
};

export default MapPicker;
