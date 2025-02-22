const MarkerList = ({ markers, handleDelete, copy }) =>{

  return (
    <div className="marker-list-container">
      {
        markers.map((marker) => {
          return (
            <div key={marker.id} className="marker-list-item">
              <span>
                <p>
                  <strong>
                    {marker.name}
                  </strong>
                  @ {marker.position.lat}-{marker.position.lng}
                </p>
                </span>
              <button onClick={() => handleDelete(marker.id)}>
                ❌
              </button>
              <button onClick={() => copy(JSON.stringify(marker.position))}>
                📋
              </button>
              <button onClick={() => {console.log(marker);}}>
                ℹ️
              </button>
            </div>

          )}
        )
      }
    </div>
  )
}

export default MarkerList;