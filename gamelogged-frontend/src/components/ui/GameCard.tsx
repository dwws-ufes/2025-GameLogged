import TiltedCard from './TiltedCard';

function GameCard({ game }: { game: any }) {
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