import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { allStations } from '@/data/mockData';

// Fix for default markers in Leaflet with Webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export const InteractiveMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView([20.5937, 78.9629], 5); // Center of India

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Custom icons for different status
    const createCustomIcon = (color: string) => {
      return L.divIcon({
        className: 'custom-div-icon',
        html: `<div style="
          background-color: ${color};
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        "></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });
    };

    const goodIcon = createCustomIcon('hsl(142, 76%, 36%)');
    const moderateIcon = createCustomIcon('hsl(48, 96%, 53%)');
    const criticalIcon = createCustomIcon('hsl(0, 84%, 60%)');

    // Add stations to map (showing first 100 for performance)
    const displayStations = allStations.slice(0, 100);
    
    displayStations.forEach(station => {
      let icon;
      switch (station.status) {
        case 'good':
          icon = goodIcon;
          break;
        case 'moderate':
          icon = moderateIcon;
          break;
        case 'critical':
          icon = criticalIcon;
          break;
        default:
          icon = goodIcon;
      }

      const marker = L.marker([station.lat, station.lng], { icon }).addTo(map);
      
      // Popup content
      const popupContent = `
        <div style="font-family: system-ui, -apple-system, sans-serif; min-width: 200px;">
          <div style="font-weight: bold; font-size: 14px; margin-bottom: 8px; color: #1f2937;">
            ${station.id} - ${station.location}
          </div>
          <div style="margin-bottom: 4px; color: #6b7280; font-size: 13px;">
            <strong>District:</strong> ${station.district}, ${station.state}
          </div>
          <div style="margin-bottom: 4px; color: #6b7280; font-size: 13px;">
            <strong>Water Level:</strong> ${station.waterLevel}m
          </div>
          <div style="margin-bottom: 4px; font-size: 13px;">
            <strong>Status:</strong> 
            <span style="
              color: ${station.status === 'good' ? '#059669' : 
                      station.status === 'moderate' ? '#d97706' : '#dc2626'};
              font-weight: bold;
              text-transform: capitalize;
            ">
              ${station.status}
            </span>
          </div>
          <div style="font-size: 13px; color: #6b7280;">
            <strong>Trend:</strong> 
            <span style="text-transform: capitalize;">${station.trend}</span>
            ${station.trend === 'up' ? ' ↗️' : station.trend === 'down' ? ' ↘️' : ' →'}
          </div>
          <div style="margin-top: 8px; font-size: 11px; color: #9ca3af;">
            Last updated: ${new Date(station.timestamp).toLocaleDateString()}
          </div>
        </div>
      `;
      
      marker.bindPopup(popupContent);
    });

    mapInstanceRef.current = map;

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-96 rounded-lg border border-border shadow-inner"
      style={{ minHeight: '400px' }}
    />
  );
};