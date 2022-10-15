import { useState, useRef } from "react";
import { Map, Marker } from "pigeon-maps";

let x = 30.2862;
let y = -97.7394;
// A page which allows a user to create a new place
export default function New(addNewPlace: any) {
  const centerRef = useRef<[number, number]>([x, y]);

  const markers = [
    {
      name: "Tower",
      x: 30.3062,
      y: -97.7394,
    },
  ];
  // create a state variable for the form data
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    rating: 1,
    comments: [],
  });

  // return React form which has the user fill in the formData information
  return (
    <div className="flex h-screen w-screen items-center justify-start  bg-slate-400 text-white overflow-hidden">
      <div className="flex h-1/2 w-full items-center justify-center">
        <div className=" flex w-1/2 items-center justify-center rounded-l-full bg-slate-800 p-20">
          <h1 className="-rotate-90 items-center justify-center text-4xl font-bold">
            Add a new place
          </h1>

          <form onSubmit={(e) => e.preventDefault()}className="flex flex-col items-center gap-2 text-left ">
            <label className="w-full text-left" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              className="rounded-sm p-2 text-black "
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <label className="w-full text-left" htmlFor="image">
              Image
            </label>
            <input
              type="text"
              id="image"
              value={formData.image}
              className="rounded-sm p-2 text-black "
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
            />

            <label className="w-full text-left" htmlFor="description">
              Description
            </label>
            <input
              type="text"
              id="description"
              value={formData.description}
              className="rounded-sm p-2 text-black "
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />

            <label className="w-full text-left" htmlFor="rating">
              Rating
            </label>
            <div className="w-full flex items-center justify-between">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  className={`w-[20%] aspect-square rounded-full bg-black ${formData.rating === num ? "bg-slate-600" : ""}`}
                  onClick={() => {
                    setFormData({ ...formData, rating: num });
                    console.log(formData)
                  }}
                >
                  {num}
                </button>
              ))}
            </div>

            <button
              className="w-full rounded-2xl bg-slate-500 py-1 "
              type="submit"
              onClick={addNewPlace}
            >
              Submit
            </button>
          </form>
        </div>
        <div className="w-screen h-screen flex items-center justify-start bg-slate-800">
        <div className="w-3/4 h-4/5">
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
        </div>
      </div>
    </div>
  );
}
