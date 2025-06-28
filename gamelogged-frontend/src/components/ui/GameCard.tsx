import TiltedCard from './TiltedCard';

function GameCard({ game }: { game: any }) {
  if (!game.hasCover) {
    return (
      <TiltedCard
        imageSrc={game.coverUrl}
        altText={game.name}
        captionText={game.name}
        containerHeight="300px"
        containerWidth="100%"
        imageHeight="300px"
        imageWidth="100%"
        rotateAmplitude={12}
        scaleOnHover={1.1}
        showMobileWarning={false}
        showTooltip={true}
        displayOverlayContent={true}
        overlayContent={
          <div className="p-4">
            <h3 className="font-bold text-lg text-black">{game.name}</h3>
          </div>
        }
      />
    );
  }

  return (
    <TiltedCard
      imageSrc={game.coverUrl}
      altText={game.name}
      captionText={game.name}
      containerHeight="300px"
      containerWidth="100%"
      imageHeight="300px"
      imageWidth="100%"
      rotateAmplitude={12}
      scaleOnHover={1.1}
      showMobileWarning={false}
      showTooltip={true}
      displayOverlayContent={true}
    />
  );
}

export default GameCard;