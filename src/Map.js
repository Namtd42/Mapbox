import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';
import Tooltip from './components/Tooltip';
import ReactDOM from 'react-dom';

mapboxgl.accessToken =
    'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

const data = [
    {
        "location": "Brooklyn Bridge Park",
        "city": "New York",
        "state": "USA",
        "coordinates": [-73.999039,40.699215],
    },
    {
        "location": "The High Line",
        "city": "New York",
        "state": "USA",
        "coordinates": [-74.004890,40.747993],
    },
    {
        "location": "The Battery",
        "city": "New York",
        "state": "USA ",
        "coordinates": [-74.016678,40.703564],
    }
]

const Map = () => {
    const mapContainerRef = useRef(null);
    const tooltipRef = useRef(new mapboxgl.Popup({ offset: 15 }));

    //   const [Lng, setLng] = useState(-75);
    //   const [Lat, setLat] = useState(40);
    //   const [zoom, setZoom] = useState(10);

    // Initialize map when component mounts
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-73.999039, 40.699215],
            zoom: 12
        });

        // Marker
        data.forEach((location) => {
            console.log(location)
            var marker = new mapboxgl.Marker()
                .setLngLat(location.coordinates)
                .setPopup(new mapboxgl.Popup({ offset: 30 }))
                .addTo(map);
        })

        // // Add navigation control (the +/- zoom buttons) ==============================
        // map.addControl(new mapboxgl.NavigationControl(), 'top-right');

        // map.on('move', () => {
        //   setLng(map.getCenter().Lng.toFixed(4));
        //   setLat(map.getCenter().Lat.toFixed(4));      
        //   setZoom(map.getZoom().toFixed(2));
        // });

        // change cursor to pointer when user hovers over a clickable feature
        map.on('mouseenter', e => {
            if (e.features.length) {
                map.getCanvas().style.cursor = 'pointer';
            }
        });

        // reset cursor to default when user is no longer hovering over a clickable feature
        map.on('mouseleave', () => {
            map.getCanvas().style.cursor = '';
        });

        // add tooltip when users mouse move over a point
        map.on('mousemove', e => {
            const features = map.queryRenderedFeatures(e.point);
            if (features.length) {
                const feature = features[0];

                // Create tooltip node
                const tooltipNode = document.createElement('div');
                ReactDOM.render(<Tooltip feature={feature} />, tooltipNode);

                // Set tooltip on map
                tooltipRef.current
                    .setLngLat(e.lngLat)
                    .setDOMContent(tooltipNode)
                    .addTo(map);
            }
        });

        // Clean up on unmount
        return () => map.remove();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <div className='sidebarStyle'>
                {/* <div>
          Longitude: {Lng} | Latitude: {Lat} | Zoom: {zoom}
        </div> */}
            </div>
            <div className='map-container' ref={mapContainerRef} />
        </div>
    );
};
export default Map;
