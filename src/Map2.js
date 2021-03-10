import React  from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';
import Tooltip from './components/Tooltip';
import ReactDOM from 'react-dom';

mapboxgl.accessToken =
  'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

class Map2 extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            location: 'New York',
            lng:-74,
            lat:48,
            rescuee_name:'NamTD',
            need:'PS5'
        }
    }

    componentDidMount(){
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style:'mapbox://styles/mapbox/streets-v11',
            center: [this.state.lng, this.state.lat],
            Rescuee_Name: this.state.name,
            Need: this.state.need
        })
    }
    render(){
        return (
            <div>
              
                <div>
                  <div ref={el => this.mapContainer = el}></div>
                </div>
              
              
            </div>
          );
    }
}

export default Map2;