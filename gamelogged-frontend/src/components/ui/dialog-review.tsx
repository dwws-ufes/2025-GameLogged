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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { Textarea } from "./textarea";
import { Separator } from "@radix-ui/react-separator";
import favIcon from "@/assets/icons/heart.png";
import { GameController } from "@/game/controllers/GameController";
import { useState, useRef } from "react";
import { PlayStatus } from "@/game/enum/PlayStatus";

type DialogReviewProps = {
    gameName: string;
    releaseYear: string;
    imageUrl: string;
    plataforms: string[];
};

export function DialogReview({ gameName, releaseYear, imageUrl, plataforms }: DialogReviewProps) {
    const gameController = GameController.getInstance();
    const [nota, setNota] = useState(0);
    const formRef = useRef<HTMLFormElement>(null);

    function handleSubmit() {

        if (!formRef.current) {
            console.error("Referência do formulário não encontrada.");
            return;
        }


        const formData = new FormData(formRef.current);


        const reviewData = Object.fromEntries(formData.entries());
        reviewData.nota = nota.toString();
        console.log("Dados da Review:", reviewData);

        gameController.sendReview(gameName, reviewData);
    }


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-blue-500 review-button text-white font-bold w-full hover:bg-blue-800" size="sm" variant="outline">Fazer Review</Button>
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
                                <select name="playStatus" defaultValue={PlayStatus.NONE} className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition">
                                    {Object.entries(PlayStatus).map(([value, label]) => (
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
                                    <Rating onValueChange={setNota} defaultValue={0}>
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
                            </div>
                            <Label htmlFor="review" className="mt-5">Review</Label>
                            <Textarea name="review" placeholder="Type your message here." className="h-80" />
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
