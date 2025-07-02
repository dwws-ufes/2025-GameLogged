import React, { useEffect, useState } from 'react';
import { userAPI, gameAPI } from "@/services/APIService";
import { LoaderCircle, Star, Clock } from 'lucide-react';
import { PlayStatus } from "@/game/enum/PlayStatus";
import { formatDate } from "@/services/DateFormater";


interface GameSummaryFromAPI {
    id: number;
    name: string;
    coverUrl: string;
}

interface UserReviewFromAPI {
    id: number;
    gameId: number;
    nickname: string;
    profilePicUrl: string | null;
    creationDate: string;
    rating: number;
    reviewText: string;
    timePlayed: string;
    playStatus: PlayStatus;
}

interface EnrichedReview extends UserReviewFromAPI {
    game: {
        id: number;
        name: string;
        coverUrl: string;
    };
}

function ReviewTab() {
    const [enrichedReviews, setEnrichedReviews] = useState<EnrichedReview[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAndCombineData = async () => {
            try {
                const userReviewsData: UserReviewFromAPI[] = await userAPI.getCurrentUserReviews();
                if (userReviewsData.length === 0) {
                    setIsLoading(false);
                    return;
                }
                const gameIdList = userReviewsData.map((review) => review.gameId);
                const gamesData: GameSummaryFromAPI[] = await gameAPI.findGameByListOfIgdbId(gameIdList);
                const gamesDataMap = new Map(gamesData.map(game => [game.id, game]));

                console.log("Dados das reviews do usuário:", userReviewsData);
                console.log("Dados dos jogos:", gamesData);

                const combinedData = userReviewsData.map((review): EnrichedReview => {
                    const gameDetails = gamesDataMap.get(review.gameId);
                    return {
                        ...review,
                        game: {
                            id: gameDetails?.id || 0,
                            name: gameDetails?.name || 'Jogo não encontrado',
                            coverUrl: gameDetails?.coverUrl ? gameDetails.coverUrl : ''
                        }
                    };
                });
                setEnrichedReviews(combinedData);
            } catch (err) {
                console.error("Erro ao buscar as reviews do usuário:", err);
                setError("Não foi possível carregar as reviews.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchAndCombineData();
    }, []);

    if (isLoading) {
        return <div className="flex justify-center p-8"><LoaderCircle className="h-8 w-8 animate-spin" /></div>;
    }

    if (error) {
        return <div className="p-4 text-center text-red-500">{error}</div>;
    }

    if (!enrichedReviews || enrichedReviews.length === 0) {
        return <div className="p-4 text-center text-gray-500">Nenhuma review encontrada.</div>;
    }

    return (
        <div className="flex flex-col space-y-6">
            {enrichedReviews.map((review) => (
                <div key={review.id} className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 transition-all hover:shadow-xl">
                    <div className="flex items-center gap-4 border-b border-gray-200 dark:border-gray-700 pb-3">
                        <img
                            src={review.game.coverUrl}
                            alt={review.game.name}
                            className="w-16 h-24 object-cover rounded-md"
                        />
                        <div className="flex-grow">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{review.game.name}</h2>
                            <div className="flex items-center text-2xl mt-1">
                                <Star className="h-6 w-6 text-yellow-400 fill-yellow-400 mr-1" />
                                <span className="font-bold text-gray-800 dark:text-gray-100">{review.rating.toFixed(1)}</span>
                                <span className="text-sm text-gray-500 ml-1">/ 5.0</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 pt-4">
                        <img
                            src={review.profilePicUrl || "https://github.com/shadcn.png"}
                            alt={review.nickname}
                            className="w-12 h-12 rounded-full"
                        />
                        <div className='w-full'>
                            <div className="flex justify-between items-center">
                                <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200">{review.nickname}</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(review.creationDate)}</p>
                            </div>
                            <p className="mt-2 text-gray-700 dark:text-gray-300">{review.reviewText}</p>
                        </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>Tempo jogado: <strong>{review.timePlayed} horas</strong></span>
                        <span className="mx-2">|</span>
                        <span>Status: <strong>{PlayStatus[review.playStatus]}</strong></span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ReviewTab;