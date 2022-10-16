import { useEffect } from 'react';
import PlaceCard from '../components/placecard.tsx';
import axios from "axios";

export default function Test() {
    useEffect(() => {
        axios.post('http://localhost:5000/location', 
          {'name': 'test1',  'image': 'tower', 'x': 7.0, 'y': 18.0,  'category': 'test', 'comments': {}, 'description':'test'})
        axios.post('http://localhost:5000/location', 
          {'name': 'meme',  'image': 'dog', 'x': 9.0, 'y': 10.0,  'category': 'test', 'comments': {}, 'description':'test'})
        axios.post('http://localhost:5000/location', 
          {'name': 'peepee', 'image': 'cat', 'x': 11.0, 'y': 12.0,  'category': 'dog', 'comments': {}, 'description':'test'})
       axios.get('http://localhost:5000/location', {params:{location: 'test1'}}).then(
           (response) => {console.log(response)})
       axios.get('http://localhost:5000/', {}).then(
           (response) => {console.log(response)})
     }, [])
    return <></>    
}