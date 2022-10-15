import React from 'react'
import { Map, Marker } from 'pigeon-maps'
import axios from 'axios'
import { useEffect, UseState } from 'react'

function MapComp () {
    const x = 30.30228
    const y = -97.71958
    const min_x = x - 5
    const max_x = x + 5
    const min_y = y - 5
    const max_y = y + 5
    const [c, setCenter] = React.useState([x, y])
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(false)
    const [markers, setMarkers] = React.useState([])

    function tiler(x, y, z, dpr) {
        return `https://a.tile.openstreetmap.fr/hot/${z}/${x}/${y}.png`;
      }

    /**useEffect(async () => {
        axios.get('http://localhost:3001/api/locations')
            .then(res => {
                setData(res.data)
                setLoading(false)
            })
            .catch(err => {
                setError(err)
                setLoading(false)
            })
    },[])*/
    return (
        <Map 
        minZoom = {16}
        defaultZoom = {16}
        maxZoom = {17}
        center={c} 
        >
        </Map>
    )
}

export default function MapPage () {
    return (
        <div className='h-screen overflow-x-hidden'>
            <MapComp />
        </div>
    )
}