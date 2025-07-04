import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Rating, RatingButton } from "./shadcn-io/rating";
import { Textarea } from "./textarea";
import { Separator } from "@radix-ui/react-separator";
import { GameController } from "@/game/controllers/GameController";
import { useState, useRef } from "react";
import { PlayStatus, PlayStatusLabel } from "@/game/enum/PlayStatus";

type DialogReviewProps = {
    playStatus: PlayStatus;
    gameId: number;
    gameName: string;
    releaseYear: string;
    imageUrl: string;
    plataforms: string[];
    reviewText?: string;
    rating?: number;
    timePlayed?: string;
    isReviewed?: boolean;

};

export function DialogReview({ gameName, releaseYear, imageUrl, plataforms, playStatus, gameId, reviewText, rating, timePlayed, isReviewed}: DialogReviewProps) {
    const gameController = GameController.getInstance();
    const [nota, setNota] = useState(0);
    const formRef = useRef<HTMLFormElement>(null);
    const [open, setOpen] = useState(false);

    async function handleSubmit() {

        if (!formRef.current) {
            console.error("Referência do formulário não encontrada.");
            return;
        }


        const formData = new FormData(formRef.current);


        const reviewData = Object.fromEntries(formData.entries());
        reviewData.nota = nota.toString();
        console.log("Dados da Review:", reviewData);

        const isReviewSuccess = gameController.sendReview(gameId, reviewData, isReviewed);
            
        setOpen(await isReviewSuccess);
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-blue-500 review-button text-white font-bold w-full hover:bg-blue-800" size="sm" variant="outline">{
                    isReviewed ? "Editar Review" : "Fazer Review"}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[900px] sm:max-h-[1000px]">
                <DialogHeader>
                    <DialogTitle>{gameName} - {releaseYear}</DialogTitle>
                </DialogHeader>
                <form ref={formRef}>
                    <div className="flex flex-row gap-2">
                        <div className="flex flex-col items-center justify-center">
                            <img src={imageUrl} className="w-70 h-72 object-cover rounded" />
                            <div>
                                <Label htmlFor="playStatus" className="mt-10 w-full mb-2">Situação</Label>
                                <select name="playStatus" defaultValue={playStatus} className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition">
                                    {Object.entries(PlayStatusLabel).map(([value, label]) => (
                                        <option key={value} value={value}>{label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <Separator orientation="vertical" className="mx-4" />
                        <div className="flex flex-col gap-4 w-full">
                            <div className="flex flex-row gap-4 mt-6">

                                <div className="flex flex-col mr-20">
                                    <Label htmlFor="nota" className="mb-2">Nota</Label>
                                    <Rating onValueChange={setNota} defaultValue={isReviewed ? rating : 0}>
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <RatingButton key={index} className="rating-button self-center" name="nota" size={30} />
                                        ))}
                                    </Rating>
                                </div>
                                <div>
                                    <Label htmlFor="plataforma" >Plataforma</Label>
                                    <select name="plataform" className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition">
                                        {(plataforms || []).map((plataform) => (
                                            <option key={plataform} value={plataform}>{plataform}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="ml-10">
                                    <Label htmlFor="time-picker" className="mb-2">
                                        Tempo de Jogo
                                    </Label>
                                    <Input
                                        type="time"
                                        id="time-picker"
                                        step="1"
                                        name="timePlayed"
                                        defaultValue={isReviewed ? timePlayed : "00:00:00"}
                                        className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                    />
                                </div>
                            </div>
                            <Label htmlFor="review" className="mt-5">Review</Label>
                            <Textarea name="review" defaultValue={isReviewed ? reviewText : ''} placeholder="Type your message here." className="h-80" />
                        </div>
                    </div>
                </form>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancelar</Button>
                    </DialogClose>
                    <Button type="submit" onClick={handleSubmit}>Enviar</Button>
                </DialogFooter>
            </DialogContent>

        </Dialog >
    )
}
