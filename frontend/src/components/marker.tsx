import { useState } from "react";
export default function PlaceMarker({ place }: any) {
  const [toggle, setToggle] = useState(false);
    
  return (
    <button
      onClick={() => setToggle((p) => !p)}
      className="rounded-full hover:cursor-pointer h-full w-full"
    >
      {toggle ? (
        <div>Lmao</div>
      ) : (
        <img
          src={place.image}
          className="aspect-square h-10 rounded-full object-cover"
        ></img>
      )}
    </button>
  );
}
