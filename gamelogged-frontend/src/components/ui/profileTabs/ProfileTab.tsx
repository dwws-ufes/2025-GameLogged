import "./profileTabs.css"
import CountUp from './CountUp'

interface ProfileTabProps {
    biography: string,
    followerCount: number,
    totalGamesPlayed: number,
    totalReviewsWritten: number;
  }
  

function ProfileTab({ biography, followerCount,totalGamesPlayed,totalReviewsWritten }: ProfileTabProps) {
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
            </div>
            <div className={"profile-tab-statistics-elements"}>
                <div className={"profile-tab-statistics"}>
                    <div className={"profile-tab-statistic-element"}>
                        <CountUp
                            from={0}
                            to={totalGamesPlayed}
                            duration={0.5}
                            className={"profile-tab-statistics-number"}/>
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
                            className={"profile-tab-statistics-number"}/>
                        <h1 className={"profile-tabs-statitics-title"}>
                            Total Friends
                        </h1>
                    </div>
                </div>
                <div className="divider"/>
            </div>
        </div>
    );
}

export default ProfileTab;