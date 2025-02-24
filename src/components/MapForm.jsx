import useForm from '../hooks/useForm'

const MapForm = ({ addUserLocation }) => {

  const [ name, nameChange ] = useForm();
  const [ lat, latChange ] = useForm();
  const [ lng, lngChange ] = useForm();

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if(name && lat && lng){
      const userInfo = {
        name: name,
        position:{
          lat,
          lng
        }
      }
  
      addUserLocation(userInfo);
    }

  }

  return (
      <form className="map-form-container" onSubmit={handleFormSubmit}>

        <label className="map-form-item">
          Who are you?
          <input name='user-name' type="text" value={name} onChange={nameChange}/>
        </label>

        <label className="map-form-item">
          Latitude:
          <input name='user-lat' type="text" value={lat} onChange={latChange}/>
        </label>

        <label className="map-form-item">
          Longitude:
          <input name='user-lng' type="text" value={lng} onChange={lngChange}/>
        </label>

        <button type="submit">
          Add new location
        </button>
      </form>
  )
}

export default MapForm;