import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './Game.css';
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Separator } from "@/components/ui/separator";
import GamePlataform from "@/components/ui/game-plataform";
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

    useEffect(() => {
        const fetchGameDetails = async () => {
            try {
                const details = await loadGame.fetchGame();
                setGameDetails(details);
                console.log(details);
            } catch (error) {
                console.error("Erro ao carregar os detalhes do jogo:", error);
            }
        };

        fetchGameDetails();
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

    const totalNotas = ratingsData.reduce((acc, curr) => acc + curr.value * curr.count, 0);
    const totalAvaliacoes = ratingsData.reduce((acc, curr) => acc + curr.count, 0);
    const mediaNotas = totalAvaliacoes > 0 ? (totalNotas / totalAvaliacoes).toFixed(2) : "0.00";

    return (
        <div className="flex flex-col min-h-screen content">
            <div className="game-screenshot">
                <div className="gradient"></div>
                <img className="screenshot" src={gameDetails['screenshot_url']} alt={`${gameName} Screenshot`} />
            </div>
            <div className="col game-details p-4">
                <div className="content-game flex flex-row">
                    <div className="mb-4 flex-col justify-items-center">
                        <div className="game-cover">
                            <img src={gameDetails['game_cover_url']} alt={`${gameName} Cover`} className="w-48 h-72 object-cover" />
                        </div>

                        <div className="game-rating w-56 bg-white p-4 rounded-lg text-white shadow-md mt-4">
                            <div className="rating-chart-content">
                                <div className="rating-header mb-4">
                                    <h2 className="text-2xl text-black font-bold mb-2">Avaliações</h2>
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
                                                interval={0}

                                            />
                                            <Bar dataKey="quantidade" fill="hsl(210, 92%, 45%)" barSize={20} />
                                        </BarChart>
                                    </ChartContainer>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col game-info text-white">
                        <div className="row">
                            <div className="col-game-info">
                                <span className="game-title font-bold mb-4">{gameName}</span>
                            </div>
                            <div className="col-auto mb-4">
                                <span className="game-release-date text-white">Lançamento: {new Date(gameDetails['release_date']).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}</span>
                            </div>
                            <div className="col-auto mb-4">
                                <span className="game-genres text-white">A 2D metroidvania with an emphasis on close combat and exploration in which the player enters the once-prosperous now-bleak insect kingdom of Hallownest, travels through its various districts, meets friendly inhabitants, fights hostile ones and uncovers the kingdom's history while improving their combat abilities and movement arsenal by fighting bosses and accessing out-of-the-way areas.</span>
                            </div>
                        </div>
                    </div>
                    <div className="col text-white game-plataforms-column">
                        <div className="row">
                            <p className="text-sm font-semibold mb-2">Disponivel nas Plataformas</p>
                        </div>
                        <div className="row game-platforms">
                            <GamePlataform platforms={gameDetails['plataforms'] || []} />
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
    );
}


export default GamePage;