import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './Game.css';
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Separator } from "@/components/ui/separator";
import GamePlataform from "@/components/ui/game-plataform";
import { Button } from "@/components/ui/button";
import { AuthController } from "@/authentication/controllers/AuthController";
import { Progress } from "@/components/ui/progress"
import controleIcon from "@/assets/icons/controle.png";
import playIcon from "@/assets/icons/play.png";
import favIcon from "@/assets/icons/heart.png";
import favIconFull from "@/assets/icons/heart-red.png";
import controleIconFull from "@/assets/icons/controle-roxo.png";
import playIconFull from "@/assets/icons/play-verde.png";
import { GameController } from "../controllers/GameController";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton"
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { DialogReview } from "@/components/ui/dialog-review";
import { PlayStatus } from "../enum/PlayStatus";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { ReviewCard } from "@/components/ui/review-card";


function GamePage() {
    const { gameName } = useParams<{ gameName: string }>();
    const [gameDetails, setGameDetails] = useState<any>({});
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isPlayed, setIsPlayed] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [playStatus, setPlayStatus] = useState<PlayStatus>(PlayStatus.NONE);
    const [userReview, setUserReview] = useState([]);
    const [isReviewed, setIsReviewed] = useState<boolean>(false);
    const [generalReviews, setGeneralReviews] = useState([]);
    const [progress, setProgress] = useState(25)
    const [ratings, setRatings] = useState<{ [key: number]: number }>({});
    const [avgRating, setAvgRating] = useState<number>(0);
    const gameController = GameController.getInstance();

    useEffect(() => {
        const fetchData = async () => {
            setProgress(50);
            const details = await gameController.searchGameByName(gameName || '');
            setGameDetails(details);
            const [statusResult, reviewsResult, ratingsResult] = await Promise.all([
                gameController.getPlayStatus(details['id']),
                gameController.getReviews(details['id']),
                gameController.getRatings(details['id'])
            ]);
            setIsLoading(false);
            setProgress(100);
            if (Array.isArray(statusResult)) {
                setIsPlayed(statusResult[0].playStatus === PlayStatus.PLAYED);
                setIsPlaying(statusResult[0].playStatus === PlayStatus.PLAYING);
                setIsLiked(statusResult[0].playStatus === PlayStatus.WISHLIST);
                setPlayStatus(statusResult[0].playStatus);
            } else {
                setIsPlayed(false);
                setIsPlaying(false);
                setIsLiked(false);
            }

            if (reviewsResult) {
                setUserReview(reviewsResult.userReview);
                setGeneralReviews([reviewsResult.userReview, ...(reviewsResult.reviews || [])] || []);

                if(reviewsResult.userReview){
                    setIsReviewed(true);
                }

            } else {
                setUserReview([]);
                setGeneralReviews([]);
            }

            if (ratingsResult) {
                setRatings(ratingsResult.ratingsCount || {});
                setAvgRating(ratingsResult.averageRating || 0);
            } else {
                setRatings({});
                setAvgRating(0);
            }
        };



        fetchData().catch((error) => {
            console.error("Erro ao obter dados do jogo:", error);
            toast.error("Erro ao obter dados do jogo. Tente novamente mais tarde.");
        });
    }, [gameName]);

    const chartConfig = {
        value: {
            color: '#4f46e5',
            label: 'Avaliação',
        },
    } satisfies ChartConfig


    const ratingsData = Object.entries(ratings).map(([key, value]) => ({
        nota: parseFloat(key),
        quantidade: value as number,
    }));

    const handleChangePlayStatus = async (status: PlayStatus) => {
        await gameController.changePlayStatus(gameDetails['id'], status);
        setIsPlayed(status === PlayStatus.PLAYED);
        setIsPlaying(status === PlayStatus.PLAYING);
        setIsLiked(status === PlayStatus.WISHLIST);
        setPlayStatus(status);
    };

    return (
        !isLoading ? (
            <div className="flex flex-col min-h-screen content comfortaa">
                <div className="game-screenshot">
                    <div className="gradient"></div>
                    <img className="screenshot" src={gameDetails["screenshot"] ? gameDetails["screenshot"] : gameDetails["coverUrl"]} alt={`${gameName} Screenshot`} />
                </div>
                <div className="col game-details p-4">
                    <div className="content-game flex flex-row">
                        <div className="mb-4 flex-col justify-items-center">
                            <div className="game-cover">
                                <img src={gameDetails['coverUrl']} alt={`${gameName} Cover`} className="w-48 h-72 object-cover" />
                            </div>
                            <div className="game-button items-center p-4 shadow-md mt-4">
                                <div className="game-buttons-content items-center">
                                    <DialogReview reviewText={isReviewed ? userReview.reviewText : ""} isReviewed={isReviewed} timePlayed={isReviewed ? userReview.timePlayed : "00:00:00"} rating={isReviewed ? userReview.rating : 0} playStatus={playStatus} gameId={gameDetails['id']} gameName={gameName!} imageUrl={gameDetails['coverUrl']} releaseYear={new Date(gameDetails['firstReleaseDate'] * 1000).getFullYear().toString()} plataforms={gameDetails['platforms']} />
                                    <div className="status-buttons flex flex-row items-center mt-10">

                                        {
                                            !isPlayed ? (<button onClick={() => handleChangePlayStatus(PlayStatus.PLAYED)} className="text-white font-bold mr-3 flex items-center justify-center flex-col">
                                                <img src={controleIcon} alt="Status Icon" className="w-6 h-6" />
                                                Joguei
                                            </button>) : (<button onClick={() => handleChangePlayStatus(PlayStatus.NONE)} className="text-white font-bold mr-3 flex items-center justify-center flex-col">
                                                <img src={controleIconFull} alt="Status Icon" className="w-6 h-6" />
                                                Joguei
                                            </button>)
                                        }


                                        {
                                            !isPlaying ? (<button onClick={() => handleChangePlayStatus(PlayStatus.PLAYING)} className="text-white font-bold mr-3 flex items-center justify-center flex-col">
                                                <img src={playIcon} alt="Status Icon" className="w-6 h-6" />
                                                Jogando
                                            </button>) : <button onClick={() => handleChangePlayStatus(PlayStatus.NONE)} className="text-white font-bold mr-3 flex items-center justify-center flex-col">
                                                <img src={playIconFull} alt="Status Icon" className="w-6 h-6" />
                                                Jogando
                                            </button>
                                        }


                                        {
                                            !isLiked ? (<button onClick={() => handleChangePlayStatus(PlayStatus.WISHLIST)} className="text-white font-bold mr-3 flex items-center justify-center flex-col">
                                                <img src={favIcon} alt="Status Icon" className="w-6 h-6" />
                                                Wishlist
                                            </button>) : (<button onClick={() => handleChangePlayStatus(PlayStatus.NONE)} className="text-white font-bold mr-3 flex items-center justify-center flex-col">
                                                <img src={favIconFull} alt="Status Icon" className="w-6 h-6" />
                                                Wishlist
                                            </button>)
                                        }
                                    </div>
                                </div>

                                <div className="game-rating w-56 bg-white p-4 rounded-lg text-white shadow-md mt-4">
                                    <div className="rating-chart-content">
                                        <div className="rating-header mb-4">
                                            <h2 className="text-2xl text-black font-bold mb-2">Nota Média</h2>
                                            <h2 className="text-2xl text-black font-bold mb-2">{avgRating}</h2>
                                        </div>
                                        <div className="rating-chart">
                                            <ChartContainer config={chartConfig}>
                                                <BarChart accessibilityLayer data={ratingsData} barCategoryGap="0%" barGap={0}>
                                                    <CartesianGrid vertical={false} />
                                                    <XAxis
                                                        dataKey="nota"
                                                        tickLine={false}
                                                        tickMargin={10}
                                                        ticks={[1, 5]}
                                                        tickFormatter={(value) => `${value} ⭐`}
                                                        tick={{ fontSize: 14 }}
                                                        interval={0}

                                                    />
                                                    <Bar dataKey="quantidade" fill="hsl(210, 92%, 45%)" barSize={20} />
                                                    <ChartTooltip
                                                        content={({ active, payload }) => {
                                                            if (active && payload && payload.length) {
                                                                const { nota, quantidade } = payload[0].payload;
                                                                return (
                                                                    <div className="custom-tooltip bg-gray-200 p-2 rounded font-bold shadow text-black">
                                                                        {`${quantidade} | ${nota} ⭐`}
                                                                    </div>
                                                                );
                                                            }
                                                            return null;
                                                        }}
                                                    />
                                                </BarChart>
                                            </ChartContainer>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col game-info text-white comfortaa">
                            <div className="row">
                                <div className="col-game-info">
                                    <span className="game-title font-bold mb-4">{gameName}</span>
                                </div>
                                <div className="col-auto mb-4">
                                    <span className="game-release-date text-white">
                                        <span>O jogo foi lançado no dia </span>
                                        <span className="font-bold" style={{ color: 'burlywood' }}>{new Date(gameDetails['firstReleaseDate'] * 1000).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}</span>
                                    </span>
                                </div>
                                <div className="col-auto mb-4">
                                    <span className="game-genres text-base text-white">{gameDetails['summary']}</span>
                                </div>
                                <Separator className="my-4" />
                                <div>
                                    {
                                        generalReviews[0] != null ? (
                                            generalReviews.map((review, idx) => (
                                                <ReviewCard review={review} />
                                            ))
                                        ) : (
                                            <div className="flex flex-col items-center justify-center">
                                                <p className="text-white">Nenhuma review encontrada para este jogo.</p>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col text-white game-plataforms-column comfortaa">
                            <div className="row">
                                <p className="text-sm font-semibold mb-2">Disponivel nas Plataformas</p>
                            </div>
                            <div className="row game-platforms">
                                <GamePlataform platforms={gameDetails['platforms'] || []} />
                            </div>
                            <div className="row game-platforms mt-4">
                                <div className="col-auto">
                                    <p className="text-sm font-semibold mb-2">Gêneros</p>
                                </div>
                                <div className="col-game-info">

                                    <GamePlataform platforms={gameDetails['genres'] || []} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center h-screen">

                <Spinner />
            </div>
        )
    );
}


export default GamePage;