import {STATS_KEYS, StatsLang} from "@/types/Project.type";

export function StatsBar(props: {stats: StatsLang}) {
    return (
        <div className="statsbar">
            {STATS_KEYS.map((s) => (
                <span key={s} data-lang={s} style={{ width: props.stats[s] + '%' }}></span>
            ))}
        </div>
    )
}