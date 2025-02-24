import useClipboard from "../hooks/useClipboard";

const MarkerList = ({ markers, handleDelete }) => {
	const [copiedText, copyToClipboard] = useClipboard();

	return (
		<section className="marker-container">
			{markers.length === 0 ? (
				<p>Try adding some markers.</p>
			) : (
				markers.map((marker) => {
					return (
						<div key={marker.id} className="marker-list-item">
							<span>
								<p>
									<strong>{marker.name}</strong>@ {marker.position.lat}-
									{marker.position.lng}
								</p>
							</span>
							<button onClick={() => handleDelete(marker.id)}>❌</button>
							<button
								onClick={() => copyToClipboard(JSON.stringify(marker.position))}
							>
								📋
							</button>
							<button
								onClick={() => {
									console.log(marker);
								}}
							>
								ℹ️
							</button>
						</div>
					);
				})
			)}
		</section>
	);
};

export default MarkerList;
