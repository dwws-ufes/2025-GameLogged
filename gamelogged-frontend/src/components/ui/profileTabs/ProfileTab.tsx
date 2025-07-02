import "./profileTabs.css"
import CountUp from './CountUp'
import { Star } from 'lucide-react';

interface ProfileTabProps {
    biography: string,
    followerCount: number,
    totalGamesPlayed: number,
    totalReviewsWritten: number;
    averageRating: number;
}


function ProfileTab({ biography, followerCount, totalGamesPlayed, totalReviewsWritten, averageRating }: ProfileTabProps) {
    return (
        <div className="profile-tabs-profile">
            <div className={"profile-tab-bio-rating"}>
                <h1 className={"profile-tabs-bio-rating-title"}>
                    Bio
                </h1>
                <span>
                    {biography}
                </span>
                <div className="divider"/>
                <h1 className={"profile-tabs-bio-rating-title"}>
                    Personal Rating
                </h1>
                <div className="flex items-center gap-2">
                <Star className="h-10 w-10 text-yellow-400 fill-yellow-400" />
                    <span className="profile-tab-statistics-number">
                        {averageRating}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        ({totalReviewsWritten} reviews)
                    </span>
                </div>
            </div>
            <div className={"profile-tab-statistics-elements"}>
                <div className={"profile-tab-statistics"}>
                    <div className={"profile-tab-statistic-element"}>
                        <CountUp
                            from={0}
                            to={totalGamesPlayed}
                            duration={0.5}
                            className={"profile-tab-statistics-number"} />
                        <h1 className={"profile-tabs-statitics-title"}>
                            Total Games Played
                        </h1>
                    </div>
                    <div className={"profile-tab-statistic-element"}>
                        <CountUp
                            from={0}
                            to={totalReviewsWritten}
                            duration={0.5}
                            className={"profile-tab-statistics-number"}
                        />
                        <h1 className={"profile-tabs-statitics-title"}>
                            Total Reviews Written
                        </h1>
                    </div>
                    <div className={"profile-tab-statistic-element"}>
                        <CountUp
                            from={0}
                            to={followerCount}
                            duration={0.5}
                            className={"profile-tab-statistics-number"} />
                        <h1 className={"profile-tabs-statitics-title"}>
                            Total Friends
                        </h1>
                    </div>
                </div>
                <div className="divider" />
            </div>
        </div>
    );
}

export default ProfileTab;