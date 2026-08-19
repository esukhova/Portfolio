import {getProjects} from "@/utils/projects";
import {LandingCard} from "@/components/LandingCard/LandingCard";
import {STATS_KEYS} from "@/types/project";

export function Landing() {
    return (
        <section className="landing" id="landing">
            <div className="landing__container container">
                <h2 className="landing__title title title--type_h2 sign">
                    <span className="fast-flicker">Л</span>енди<span className="flicker">н</span>ги
                </h2>
                <ul className="landing__items">
                    {getProjects('landing').map(l => (
                        <LandingCard key={l.id} landing={l}/>
                    ))}
                </ul>
                <ul className="landing__statslist statslist">
                    {STATS_KEYS.map((s) => (
                        <li key={s} data-lang={s} className="statslist__item">{s}</li>
                    ))}
                </ul>
            </div>
        </section>
    )
}