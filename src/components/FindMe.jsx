const FindMe = ({search, isLoading, locationName}) => {
  return (
    <div className="findme-box">
      <h2>
        Greetings from: {isLoading ? "Searching" : locationName}
      </h2>

      <button type='button' onClick={search}>
        Find Me!!!
      </button>
    </div>
  )
}

export default FindMe;