/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import Head from "next/head";
import PlaceCard from "../components/placecard";

import { useRef, useState } from "react";
import { Map, Marker } from "pigeon-maps";
import Rating from "../components/Slider";

const places = [
  {
    name: "UT Tower",
    location: "UT Austin Campus",
    image:
      "https://news.utexas.edu/wp-content/uploads/2020/06/Tower-through-trees-with-yellow-leaves-in-the-fall-20172360-1-scaled.jpg",
    total_rating: 4.5,
    count: 0,
    category: "Study",
    x: 30.2858,
    y: -97.7394,
    description:
      "The UT Tower is a 307-foot (94 m) tall campanile and observation tower located on the campus of the University of Texas at Austin. It is the tallest structure in Austin and the second-tallest educational building in the United States.",
    comments: [
      {
        user: "John Doe",
        comment: "This is a great place to study!",
      },
      {
        user: "Jane Doe",
        comment: "I love this place!",
      },
      {
        user: "Jane Doe",
        comment: "I love this place!",
      },
      {
        user: "Jane Doe",
        comment: "I love this place!",
      },
      {
        user: "Jane Doe",
        comment: "I love this place!",
      },
      {
        user: "Jane Doe",
        comment: "I love this place!",
      },
      {
        user: "Jane Doe",
        comment: "I love this place!",
      },
      {
        user: "Jane Doe",
        comment: "I love this place!",
      },
      {
        user: "Jane Doe",
        comment: "I love this place!",
      },
      {
        user: "Jane Doe",
        comment: "I love this place!",
      },
    ],
  },
  {
    name: "UT Shower",
    location: "UT",
    image:
      "data:image/jpeg;base64,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",
    total_rating: 4.5,
    count: 0,
    category: "Study",
    x: 30.2858,
    y: -97.7384,
    description: "This is a shower",
    comments: [
      {
        user: "John Doe",
        comment: "This is a great place to study!",
      },
    ],
  },
];
let x = 30.2862;
let y = -97.7394;
const down = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-6 w-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
    />
  </svg>
);

const up = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-6 w-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 15.75l7.5-7.5 7.5 7.5"
    />
  </svg>
);

const Home: NextPage = () => {
  const { data: session } = useSession();
  const centerRef = useRef<[number, number]>([x, y]);
  const [rating, setRating] = useState(0);
  const [currentPlace, setCurrentPlace] = useState(places[0]);
  const [toggle, setToggle] = useState(false);
  const [commentToggle, setCommentToggle] = useState(false);

  function addNewPlace(placeInfo: any) {
    places.push(placeInfo);
  }

  function postRating(){

  }

  if (session) {
    return (
      <>
        <Head>
          <title>Water Fountain Spots</title>
        </Head>
        <div className="relative h-screen w-screen overflow-hidden">
          <Map
            center={centerRef.current}
            zoom={17}
            onBoundsChanged={({ center }) => {
              centerRef.current = center;
            }}
          >
            {places.map((place) => (
              <Marker
                key={place.name}
                anchor={[place.x, place.y]}
                width={50}
                className="w-full"
                onClick={() => {
                  setToggle(true);
                  setCurrentPlace(place);
                  centerRef.current = [place.x, place.y];
                }}
              />
            ))}
          </Map>
          <div className="absolute top-0 z-10 flex h-full w-1/3 flex-col gap-3 bg-slate-800 p-8 text-white">
            <h2 className="text-lg font-bold text-3xl uppercase">{currentPlace?.name}</h2>
            <h3 className="italic">{currentPlace?.category}</h3>
            <img
              className=" aspect-[2] w-full object-cover font-bold"
              src={currentPlace?.image}
              alt={currentPlace?.name}
            />
            <p className="text-md text-le(ft w-full font-bold">
              Rating: {currentPlace?.total_rating}
            </p>

            <div className="w-full flex items-center justify-between">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  className={`w-[10%] aspect-square rounded-full bg-black ${rating === num ? "bg-slate-600" : ""}`}
                  onClick={() => {
                    setRating(num);
                  }}
                >
                  {num}
                </button>
              ))}
              {/* submit rating */}
              <button className="bg-slate-400 p-2 rounded-2xl" onClick={() => postRating()}>
                Submit
              </button>
            </div>

            <p className="text-sm">{currentPlace?.description}</p>
            <div
              onClick={() => setCommentToggle((p) => !p)}
              className="flex w-full gap-4 hover:cursor-pointer"
            >
              <h3 className="text-md w-full text-left">Comments</h3>
              {commentToggle ? up : down}
            </div>
            {commentToggle && (
              <ul className="w-full h-20 overflow-y-scroll">
                {currentPlace?.comments.map((comment: any) => (
                  <li className="flex flex-row" key={comment.comment}>
                    <p className="text-left text-sm">{comment.user}</p>
                    &nbsp;-&nbsp;
                    <p className="text-left text-sm italic">
                      {comment.comment}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="absolute right-5 top-5">
            {/* signout */}
            <button
              onClick={() => signOut()}
              className="rounded-md bg-slate-800 p-2 text-white"
            >
              Sign Out
            </button>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-slate-800 text-white">
        <p className="italic">
          Only @utexas.edu emails can be used to sign in.{" "}
        </p>
        <button
          className="bold flex flex-row items-center justify-center gap-10 rounded-2xl border-2 px-10 py-2 text-2xl hover:border-blue-400 hover:text-blue-400"
          onClick={() => signIn("google")}
        >
          <img src="/google.png" className="aspect-square w-14"></img>
          Sign In with Google
        </button>
      </div>
    );
  }
};

export default Home;
