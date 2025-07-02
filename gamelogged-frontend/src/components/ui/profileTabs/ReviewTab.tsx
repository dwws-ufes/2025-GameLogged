import { ReviewCard } from "../review-card";
import { PlayStatus } from "@/game/enum/PlayStatus";
import { useState } from "react";
import { useEffect } from "react";
import { userAPI } from "@/services/APIService";

interface GameReview {
    id: number;
    nickname: string;
    creationDate: string;
    reviewText: string;
    timePlayed: string;
    rating: number;
    platform: string;
    playStatus: PlayStatus;
    profilePicUrl: string;
    gameId: number; 
}

interface GameSummary {
    id: number;
    name: string;
    coverUrl: string;
}

interface ReviewTabProps {
    reviews: GameReview[];
}

function ReviewTab() {

    const [reviews, setReviews] = useState<GameReview[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserReviews = async () => {
            try {
                const userReviewsData = await userAPI.getCurrentUserReviews();

                const gameIdList = userReviewsData.map((review: GameReview) => review.gameId);

                setReviews(userReviewsData);
            } catch (err) {
                console.error("Erro ao buscar as reviews do usuário:", err);
                setError("Não foi possível carregar as reviews.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserReviews();
    }, []);

    if (!reviews || reviews.length === 0) {
        return <div className="p-4 text-center text-gray-500">Nenhuma review encontrada.</div>;
    }

    return (
        <div className={"flex flex-col space-y-4"}>
            {reviews.map((review) => (
                <ReviewCard 
                    key={review.id}
                    review={review}
                />
            ))}
        </div>
    );
}

export default ReviewTab;