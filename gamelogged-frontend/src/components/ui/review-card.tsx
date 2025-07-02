import { PlayStatus, PlayStatusLabel } from "@/game/enum/PlayStatus";
import { formatDate } from "@/services/DateFormater";

type ReviewCardProps = {
    review: {
        nickname: string;
        creationDate: string;
        reviewText: string;
        timePlayed: string;
        rating: number;
        platform: string;
        playStatus: PlayStatus;
        profilePicUrl: string;
    }
};

export function ReviewCard({ review }: ReviewCardProps) {

    if(review.profilePicUrl == null) {
        review.profilePicUrl = "https://github.com/shadcn.png";
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-4 review-card">
            <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                    <img src={review.profilePicUrl} alt="Avatar" className="w-12 h-12 rounded-full" />
                    <div className="ml-5">
                        <h3 className="text-lg font-semibold">{review.nickname}</h3>
                        <p className="text-sm text-black">{formatDate(review.creationDate)}</p>
                        <div className="flex items-center text-2xl">
                            <span className="text-yellow-500">{'★'.repeat(review.rating)}</span>
                            <span className="text-gray-400">{'★'.repeat(5 - review.rating)}</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end ml-auto">
                    <p className="text-sm text-black"><span className="font-bold text-lg">Plataforma: </span>{review.platform}</p>
                    <p className="text-sm text-black"><span className="font-bold text-lg">Status:</span> {PlayStatusLabel[review.playStatus]}</p>
                    <p className="text-sm text-black"><span className="font-bold text-lg">Tempo jogado: </span> {review.timePlayed} horas</p>
                </div>
            </div>
            <div className="mt-4">
                <p className="text-gray-700">{review.reviewText}</p>
            </div>
        </div>
    );
}