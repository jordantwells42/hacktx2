import React from 'react';
import {useState} from 'react'
import axios from 'axios';

export default function Comment(props) {
    const [comment, setComment] = useState('')
    const [toggle, setToggle] = useState(false)

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

    //axios.update?
    function postComment () {
        axios.put('http://localhost:5000/location', {comment: comment, place: props.place, name: props.name})
        .then(res => {
            console.log(res.data)
        }).catch(alert('An error occured'))
    }

    return (
        <div className = 'flex-col'>
        <div
              onClick={() => setToggle((p) => !p)}
              className="flex w-full gap-4 hover:cursor-pointer"
            >
              <h3 className="text-md w-full text-left">Leave a comment</h3>
              {toggle ? up : down}
            </div>
        { toggle ?
        <form className = 'flex-col justify-center' onSubmit = {() => {postComment()}}>
            <input 
            placeholder = 'Comment' 
            className = 'text-black w-4/5 h-1000' 
            required 
            type ='text' 
            onChange={(e) => {setComment(e.target.value)}}
            style = {{paddingBottom: window.innerHeight/6}}/>
        
            <button type='submit' className = "ml-1 bg-slate-400 p-2 rounded-2xl" onClick={(e) => {e.preventDefault(); console.log(comment)}}>Submit</button>
        </form>: null}
        </div>
    )
}