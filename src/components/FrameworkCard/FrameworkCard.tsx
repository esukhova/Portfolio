import {Project} from "@/types/project";
import {asset} from "@/utils/asset";

export function SpaCard(props: { spa?: Project, default?: string }) {
    if (props.default) {
        return (
            <div className="spa__item spa__item--default _anim-items _anim-no-hide _active">
                <img src={asset('images/' + props.default + '.svg')} alt='Лампочка гирлянды' aria-hidden="true"/>
            </div>
        )
    } else if (props.spa) {
        return (
            <div className={`spa__item spa__item--${props.spa.framework} _anim-items _anim-no-hide _active`}>
                <a className={`spa__item-link spa__item-link--${props.spa.id}`}
                   href={props.spa.url}
                   target="_blank" rel="noopener">
                    <img src={asset('images/' + props.spa.image)} alt={props.spa.title} title={props.spa.title}/>
                    <span className="spa__item-description">{props.spa.title}</span>
                </a>
            </div>
        )
    }
}