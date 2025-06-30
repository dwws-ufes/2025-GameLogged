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

export function DialogDemo() {
    const gameName = "Game Name";
    const releaseYear = "2023";

    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button className="bg-blue-500 review-button text-white font-bold w-full hover:bg-blue-800" size="sm" variant="outline">Fazer Review</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[900px] sm:max-h-[1000px]">
                    <DialogHeader>
                        <DialogTitle>{gameName} - {releaseYear}</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-row gap-2">
                        <div className="flex flex-col">
                            <img src="https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co93cr.jpg" className="w-70 h-72 object-cover rounded" />
                            <div>
                                <Label htmlFor="playStatus" className="mt-10 w-full">Situação</Label>
                                <select name="playStatus">
                                    <option value="PLAYED">Jogado</option>
                                    <option value="PLAYING">Jogando</option>
                                    <option value="COMPLETED">Finalizado</option>
                                    <option value="ABANDONED">Abandonado</option>
                                    <option value="SHELVED">Na estante</option>
                                    <option value="WISHLIST">Wishlist</option>
                                </select>
                            </div>
                            <button className="text-white font-bold mr-3 flex items-center justify-center flex-col mt-10">
                                <img src={favIcon} alt="Status Icon" className="w-12 h-12" />
                                Curtir
                            </button>
                        </div>
                        <Separator orientation="vertical" className="mx-4" />
                        <div className="flex flex-col gap-4 w-full">
                            <div className="flex flex-row gap-4 mt-6">

                                <div className="flex flex-col mr-20">
                                    <Label htmlFor="nota">Nota</Label>
                                    <Rating defaultValue={0}>
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <RatingButton key={index} className="rating-button self-center" size={30} />
                                        ))}
                                    </Rating>
                                </div>
                                <div>
                                    <Label htmlFor="nota">Plataforma</Label>
                                    <select name="plataform">
                                        <option value="PLAYED">Jogado</option>
                                        <option value="PLAYING">Jogando</option>
                                        <option value="COMPLETED">Finalizado</option>
                                        <option value="ABANDONED">Abandonado</option>
                                        <option value="SHELVED">Na estante</option>
                                        <option value="WISHLIST">Wishlist</option>
                                    </select>
                                </div>
                            </div>
                            <Label htmlFor="review" className="mt-5">Review</Label>
                            <Textarea placeholder="Type your message here." className="h-80" />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit">Enviar</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog >
    )
}
