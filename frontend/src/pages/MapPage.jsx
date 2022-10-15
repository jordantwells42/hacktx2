import React from 'react'
import { Map, Marker } from 'pigeon-maps'
import axios from 'axios'


export default function MapComp () {
    const [markers, setMarkers] = React.useState([])
    
    /*React.useEffect(() => {
        axios.get('http://localhost:3001/api/markers')
        .then(res => {
            setMarkers(res.data)
        })
    }, [])*/
    
    return (
        <Map center={[51.505, -0.09]} zoom={9} width={600} height={400}>
        {markers.map(marker => (
            <Marker key={marker.id} anchor={[marker.lat, marker.lng]} payload={1} onClick={({ event, anchor, payload }) => {}} />
        ))}
        </Map>
    )
    

}
    
