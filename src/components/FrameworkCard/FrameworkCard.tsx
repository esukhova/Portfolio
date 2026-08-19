import {ProjectType} from "@/types/Project.type";
import {asset} from "@/utils/asset";

export function FrameworkCard(props: { framework?: ProjectType, default?: string }) {
    if (props.default) {
        return (
            <div className="framework__item framework__item--default">
                <img src={asset('images/' + props.default + '.svg')} alt='Лампочка гирлянды' aria-hidden="true"/>
            </div>
        )
    } else if (props.framework) {
        return (
            <div className={`framework__item framework__item--${props.framework.framework}`}>
                <a className={`framework__item-link framework__item-link--${props.framework.id}`}
                   href={props.framework.url}
                   target="_blank" rel="noopener">
                    <img src={asset('images/' + props.framework.image)} alt={props.framework.title} title={props.framework.title}/>
                    <span className="framework__item-description">{props.framework.title}</span>
                </a>
            </div>
        )
    }
}