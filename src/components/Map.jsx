import { useEffect, useState } from "react";

import { libraryLoader, initMap, geoLocationHelper, addMarker, getLocationData } from '../map.utils.js'

import { v4 as uuidv4 } from 'uuid';

import useLocalStorage from "../hooks/useLocalStorage.js";

import MapForm from './MapForm.jsx'
import MarkerList from "./MarkerList.jsx";
import FindMe from "./FindMe.jsx";



import '../styles/map.css'

import useDocumentTitle from "../hooks/useDocumentTitle.js";
import useQueryParams from "../hooks/useQueryParams.js";
import useForm from "../hooks/useForm.js";
import Clipboard from "./Clipboard.jsx";

// useLocalStorage, load the last known location and markers. ✅

// useForm to validate and store input data ✅
// useDocumentTitle, "Your current location is" reflect where am I ✅

// useClipboard, share location
// useQueryParams: process and go to the url location????


// show map and markers list  side by side
// go to marker on click

const initialLocation = {
  name: 'Unknown Location.',
  coords: {
    lat: 0,
    lng: 0
  }
}

const Map = () => {

  const [location, setLocation] = useLocalStorage('location', initialLocation);
  const [metaMarkers, setMetaMarkers] = useLocalStorage('meta-markers', []);

  const [markers, setMarkers] = useState([]);

  const [map, setMap] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  

  

  useDocumentTitle(`Your current location is: ${location.name}`)

  const [lat, setLat] = useQueryParams('lat', '');
  const [lng, setLng] = useQueryParams('lng', '');


  useEffect(() => {
    libraryLoader();

    const setNewMap = async () => {
      try{
        let newMap = await initMap('map-container', 'REACT_MAP_ID', location.coords)
        setMap(newMap)
      }
      catch (error) {
        console.error(error.message);
      }
    }
    setNewMap();
  }, [])

  useEffect(() => {
    // load meta-markers from localStorage and converts them into an object with a Google Advanced Marker
    const loadMarkers = async () => {

      const markersList = metaMarkers
        .map(async (marker) => {
          const newMarker = await addMarker(marker.position, map, marker.name);
          return {
            ...marker,
            marker: newMarker
          }
        });

      const resolvedList = await Promise.all(markersList);
      setMarkers(resolvedList)
    }

    loadMarkers();

  }, [map])


  useEffect(() => {
    if(lat !== '' && lng !== ''){
      const coords = {
        lat: parseFloat(lat),
        lng: parseFloat(lng)
      }
      addMarker(coords, map, 'Hi there!')
    }
  }, [lat, lng, map])

  const getMarkerLocation = async (position) => {
    const locationData =  await getLocationData(position)
    setLocation({name: locationData, coords: position})
    addMarker(position, map, 'found you!')
    setIsLoading(false);
  }

  const searchHandler = async () => {
    setIsLoading(true);
    const {coords}  = await geoLocationHelper();

    const position = {
      lat: coords.latitude,
      lng: coords.longitude
    };
    
    map.setCenter(position);
    map.setZoom(13);

    getMarkerLocation(position);
  }

  const addUserLocation = async (userLocation) => {
    let { name, position } = userLocation;

    position = {
      lat: parseFloat(position.lat),
      lng: parseFloat(position.lng)
    }

    try{
      const marker = await addMarker(position, map, name)
      map.setCenter(position);
      map.setZoom(5);
      setMarkers([...markers, { id: uuidv4(), position, name, marker}]);

      // metaMarkers do not have the Google Advanced Marker object which has circular references
      // and interfere with the JSON parsing of the markers to store on localStorage
      setMetaMarkers([...metaMarkers, { id: uuidv4(), position, name}])
    }
    catch(error){
      console.error(error.message);
    }
  }

  const deleteMarker = (markerId) => {
    const markerElement = markers.find(m => m.id === markerId);
    markerElement.marker.setMap(null);
    setMarkers(markers.filter(marker => marker.id !== markerId))
    setMetaMarkers(metaMarkers.filter(marker => marker.id !== markerId))
  }

  

  return (
    <>

      <div className="sidebar">

        <div className="card">
          <FindMe search={searchHandler} isLoading={isLoading} locationName={location.name} />
        </div>


        <div className="card">
          <MapForm addUserLocation={addUserLocation} />
        </div>

        <div className="card">
          <Clipboard />
        </div>

        <div className="card">
          <MarkerList markers={markers} handleDelete={deleteMarker}/>
        </div>

      </div>


      <div className="app-container">
        <div id="map-container">
        </div>

      </div>

    </>
  )
}

export default Map;