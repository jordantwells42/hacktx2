import { useState } from "react";

// A page which allows a user to create a new place
export default function New(addNewPlace: any) {
  // create a state variable for the form data
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    rating: 0,
    comments: [],
  });

  // return React form which has the user fill in the formData information
  return (
    <div className="flex h-screen w-screen items-center justify-start bg-slate-800 text-white">
      <h1 className="items-start justify-start text-4xl font-bold -rotate-90">
        Add a new place
      </h1>

      <form className="flex flex-col items-center gap-2 text-left ">
        <label className="w-full text-left" htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          className="rounded-sm p-2 text-black "
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <label className="w-full text-left"  htmlFor="image">Image</label>
        <input
          type="text"
          id="image"
          value={formData.image}
          className="rounded-sm p-2 text-black "
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        />

        <label className="w-full text-left" htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          value={formData.description}
          className="rounded-sm p-2 text-black "
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />

        <label className="w-full text-left" htmlFor="rating">Rating</label>
        <input
          type="number"
          id="rating"
          value={formData.rating}
          className="rounded-sm p-2 text-black "
          onChange={(e) =>
            setFormData({ ...formData, rating: parseInt(e.target.value) })
          }
        />

        <button className="bg-slate-500 py-1 rounded-2xl w-full " type="submit">Submit</button>
      </form>
    </div>
  );
}
