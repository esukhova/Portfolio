import {ProjectType} from "@/types/Project.type";
import {asset} from "@/utils/asset";
import {StatsBar} from "@/components/StatsBar/StatsBar";

export function VanillaCard(props: { vanilla?: ProjectType, default?: string }) {
    if (props.default) {
        return (
            <div className="vanilla__item vanilla__item--default"></div>
        )
    } else if (props.vanilla) {
        return (
            <li className="vanilla__item">
                <a className="vanilla__item-link" href={props.vanilla.url} target="_blank" rel="noopener">
                    <img src={asset('images/' + props.vanilla.image)} alt={props.vanilla.title}
                         title={props.vanilla.title}/>
                    <div className="vanilla__item-description">{props.vanilla.title}</div>
                    {props.vanilla.stats && <StatsBar stats={props.vanilla.stats}/>}
                </a>
            </li>
        )
    }
}