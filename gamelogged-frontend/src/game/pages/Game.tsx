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


const loadGame = {
    fetchGame: async () => {
        //console.log(`Buscando na API: limit=${limit}, offset=${offset}`);

        // TODO: implementar consulta no igdb 

        return {
            'screenshot_url': 'https://images.igdb.com/igdb/image/upload/t_1080p_2x/bkgxmg2m4h8wf5g9tblh.jpg',
            'game_cover_url': 'https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co93cr.jpg',
            'plataforms': ["PlayStation 5", "Xbox Series X/S", "PC", "Nintendo Switch"],
            'release_date': '2023-10-20',
            'genres': ["Ação", "Aventura"],
        }
    },
};


function GamePage() {
    const { gameName } = useParams<{ gameName: string }>();
    const [gameDetails, setGameDetails] = useState<any>({});
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isPlayed, setIsPlayed] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [playStatus, setPlayStatus] = useState<PlayStatus>(PlayStatus.NONE);
    const [progress, setProgress] = useState(25)
    const gameController = GameController.getInstance();

    useEffect(() => {
        const fetchData = async () => {
            setProgress(50);
            const details = await gameController.searchGameByName(gameName || '');
            setGameDetails(details);
            const statusResult = await gameController.getPlayStatus(details['id']);
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


    const ratingsData = [
        { value: 1, count: 3 },
        { value: 2, count: 5 },
        { value: 3, count: 12 },
        { value: 3.5, count: 10 },
        { value: 2.8, count: 6 },
        { value: 4, count: 8 },
        { value: 5, count: 7 },
    ];

    const data = ratingsData.map(rating => ({
        nota: rating.value,
        quantidade: rating.count,
    }));

    const handleChangePlayStatus = async (status: PlayStatus) => {
        await gameController.changePlayStatus(gameDetails['id'], status);
        setIsPlayed(status === PlayStatus.PLAYED);
        setIsPlaying(status === PlayStatus.PLAYING);
        setIsLiked(status === PlayStatus.WISHLIST);
        setPlayStatus(status);
    };

    const totalNotas = ratingsData.reduce((acc, curr) => acc + curr.value * curr.count, 0);
    const totalAvaliacoes = ratingsData.reduce((acc, curr) => acc + curr.count, 0);
    const mediaNotas = totalAvaliacoes > 0 ? (totalNotas / totalAvaliacoes).toFixed(2) : "0.00";


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
                                    <DialogReview playStatus={playStatus} gameId={gameDetails['id']} gameName={gameName!} imageUrl={gameDetails['coverUrl']} releaseYear={new Date(gameDetails['firstReleaseDate'] * 1000).getFullYear().toString()} plataforms={gameDetails['platforms']} />
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
                                            <h2 className="text-2xl text-black font-bold mb-2">{mediaNotas}</h2>
                                        </div>
                                        <div className="rating-chart">
                                            <ChartContainer config={chartConfig}>
                                                <BarChart accessibilityLayer data={data} barCategoryGap="0%" barGap={0}>
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
                                <div className="col-auto mb-4">
                                    <div className="row ml-0 reviews-button">
                                        <Button className="bg-blue-500 text-white hover:bg-blue-800 font-bold " size="sm">Reviews</Button>
                                    </div>
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