import React from 'react';
import ReactDOM from 'react-dom/client';
import { MapBox } from './MapBox';

import './index.css'

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

mapboxgl.accessToken = 'pk.eyJ1IjoiZGFjYXJkZW5hc2EiLCJhIjoiY2x3NmpzeDE3MXZhODJscXV1cXp5aXVvNSJ9.J82yi5k3bOU4WVQpai_QfQ';

if (!navigator.geolocation) {
  alert('Your device does not support geolocation')
  throw new Error('Your device does not support geolocation')
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MapBox/>
  </React.StrictMode>
);
