import { useState, useEffect } from 'react';
import axios from 'axios'
/*
create a React component like this in typescript 

<div className="flex flex-col items-center gap-4 rounded-xl border p-4 border-blue-100 hover:border-blue-400 w-1/4">
            <div className="w-full flex flex-row">
            <h2 className="text-2xl font-bold bg-green-500 w-1/2 h-10 text-center rounded-l-2xl">Cool</h2>
            <h2 className="text-2xl font-bold bg-red-500 w-1/2 h-10 text-center rounded-r-2xl">Not Cool</h2>
            </div>
            <h2 className="text-lg ">{place.name}</h2>
            <img className=" w-full object-cover font-bold"  src={place.image} alt={place.name} />
            <p className="text-md font-bold text-le(ft w-full">Rating: {place.rating}</p>
            <p className="text-sm">{place.description}</p>
            <h3 className="text-md w-full text-left">Comments</h3>
            <ul className="w-full">
              {place.comments.map((comment) => (
                <li className="flex flex-row" key={comment.comment}>
                  <p className="text-sm text-left">{comment.user}</p>&nbsp;-&nbsp;
                  <p className="text-sm text-left italic">{comment.comment}</p>
                </li>
              ))}
            </ul>
          </div>
*/

const down = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
</svg>

const up = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
</svg>


export default function PlaceCard({ place }: any) { 

    const [toggle, setToggle] = useState(false);
    const [data, setData] = useState(null);
    
    useEffect(() => {
      /*axios.post('http://localhost:5000/location', 
        {'location': 'test', 'count': 1, 'image': 'test', 'x': 10.0, 'y': 10.0, 'total_rating': 10, 'category': 'test', 'comments': {}})
    }, [])*/

      //Move to maps
      axios.get('http://localhost:5000/location', {params:{location: 'test'}}).then(
        (response) => {console.log(response)})}, [])




  return (
    null
    /*
    <div className="flex w-full md:w-1/4 flex-col items-center gap-4 rounded-xl border border-blue-100 p-4 hover:border-blue-400">
      <div className="flex w-full flex-row">
        <h2 className="h-10 w-1/2 rounded-l-2xl bg-green-500 text-center text-2xl font-bold">
          Cool
        </h2>
        <h2 className="h-10 w-1/2 rounded-r-2xl bg-red-500 text-center text-2xl font-bold">
          Not Cool
        </h2>
      </div>
      <h2 className="text-lg ">{place.name}</h2>
      <img
        className=" w-full aspect-[1.5] object-cover font-bold"
        src={place.image}
        alt={place.name}
      />
      <p className="text-md text-le(ft w-full font-bold">
        Rating: {place.rating}
      </p>
      <p className="text-sm">{place.description}</p>
      <div onClick={() => setToggle(p => !p)} className="flex gap-4 w-full hover:cursor-pointer">
      <h3 className="text-md w-full text-left">Comments</h3>
      {toggle ? up : down} 
      </div>
      {toggle && <ul className="w-full">
        {place.comments.map((comment: any) => (
          <li className="flex flex-row" key={comment.comment}>
            <p className="text-left text-sm">{comment.user}</p>&nbsp;-&nbsp;
            <p className="text-left text-sm italic">{comment.comment}</p>
          </li>
        ))}
      </ul>}
    </div>
    */
  );
}
