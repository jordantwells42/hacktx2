import { useRef } from "react";
import { Map, Marker } from "pigeon-maps";


let x = 30.2862;
let y = -97.7394;
export default function MapComp() {
  const centerRef = useRef<[number, number]>([x, y]);

  const markers = [
    {
      name: "Tower",
      x: 30.3062,
      y: -97.7394,
    },
  ];

  return (
    <div className="h-screen w-screen overflow-hidden">
      <Map
        center={centerRef.current}
        zoom={16}
        onBoundsChanged={({ center }) => {
          centerRef.current = center;
        }}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.name}
            anchor={[marker.x, marker.y]}
            width={50}
            onClick={() => (centerRef.current = [marker.x, marker.y])}
          ></Marker>
        ))}
      </Map>
    </div>
  );
}
