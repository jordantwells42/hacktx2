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


export default function PlaceCard({ place }: any) { 

    
    useEffect(() => {
       axios.post('http://localhost:5000/location', 
         {'name': 'test1', 'count': 1, 'image': 'tower', 'x': 7.0, 'y': 18.0, 'total_rating': 10, 'category': 'test', 'comments': {}})
       axios.post('http://localhost:5000/location', 
         {'name': 'meme', 'count': 1, 'image': 'dog', 'x': 9.0, 'y': 10.0, 'total_rating': 20, 'category': 'test', 'comments': {}})
       axios.post('http://localhost:5000/location', 
         {'name': 'peepee', 'count': 2, 'image': 'cat', 'x': 11.0, 'y': 12.0, 'total_rating': 30, 'category': 'dog', 'comments': {}})
      axios.get('http://localhost:5000/location', {params:{location: 'test1'}}).then(
          (response) => {console.log(response)})
      axios.get('http://localhost:5000/', {}).then(
          (response) => {console.log(response)})
    }, [])
      




  return (
   <div></div> 
    
  );
}
