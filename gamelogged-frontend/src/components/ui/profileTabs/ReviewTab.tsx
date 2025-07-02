function ReviewTab() {

    interface GameReview {
        id: string;
        gameId: string;
        rating: number;
        content: string;
        gameTitle: string;
    }

    const reviews: GameReview[] = [
        {
            id: "1",
            gameId: "101",
            rating: 4.5,
            content: "Great game with amazing graphics!",
            gameTitle: "Game One"
        },
        {
            id: "2",
            gameId: "102",
            rating: 3.0,
            content: "Decent gameplay but could be better.",
            gameTitle: "Game Two"
        },
        {
            id: "3",
            gameId: "103",
            rating: 5.0,
            content: "Absolutely loved it! A must-play.",
            gameTitle: "Game Three"
        }
    ];

    return (
        <div className={"profile-tabs-reviews"}>

        </div>
    );
}

export default ReviewTab;