const MarkerList = ({ markers, handleDelete, copy }) =>{

  return (
    <section>
      {
        markers.length === 0
          ? <p>Try adding some markers.</p>
          :(
              markers.map((marker) => {
                return (
                  <div key={marker.id} >
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
          )
      }
    </section>
  )
}

export default MarkerList;