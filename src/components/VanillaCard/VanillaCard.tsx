import {Project} from "@/types/project";
import {asset} from "@/utils/asset";
import {StatsBar} from "@/components/StatsBar/StatsBar";

export function LandingCard(props: {landing: Project}) {

    return (
        <li className="landing__item _anim-items _anim-no-hide _active">
            <a className="landing__item-link" href={props.landing.url} target="_blank" rel="noopener">
                <img src={asset('images/' + props.landing.image)} alt={props.landing.title} title={props.landing.title}/>
                <div className="landing__item-description">{props.landing.title}</div>
                {props.landing.stats && <StatsBar stats={props.landing.stats} />}
            </a>
        </li>
    )
}