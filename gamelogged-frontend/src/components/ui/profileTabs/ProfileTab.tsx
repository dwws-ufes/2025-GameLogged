import "./profileTabs.css"
import CountUp from './CountUp'

function ProfileTab() {

    const placeholderqtdgames = 100; // Placeholder for total games played, can be replaced with actual data

    return (
        <div className="profile-tabs-profile">
            <div className={"profile-tab-bio-rating"}>
                <h1 className={"profile-tabs-bio-rating-title"}>
                    Bio
                </h1>
                <span>
                    Nothing here yet, but you can add a bio in your profile settings.
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
                            to={placeholderqtdgames}
                            duration={0.5}
                            className={"profile-tab-statistics-number"}/>
                        <h1 className={"profile-tabs-statitics-title"}>
                            Total Games Played
                        </h1>
                    </div>
                    <div className={"profile-tab-statistic-element"}>
                        <CountUp
                            from={0}
                            to={placeholderqtdgames}
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
                            to={placeholderqtdgames}
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