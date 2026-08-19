import {DeviceOptionType, ImgType} from "@/types/Picture.type";
import {asset} from "@/utils/asset";
import {Fragment} from "react";

export function Picture(props: { className: string, img: ImgType }) {

    const [name, ext, alt, priority, wD, hD, dOptions, wM, hM,  wT, hT] = props.img;
    const deviceOptions = dOptions ?? [{suffix: '', role: 'desktop', minWidth: null, viewportWidth: 1920}];

    return (
        <div className={props.className}>
            <picture>
                {deviceOptions.map((dO: DeviceOptionType) => {
                    const sourceWidth =
                        (dO.role === 'mobile' && wM) ? wM :
                            (dO.role === 'tablet' && wT) ? wT :
                                wD;
                    const sourceHeight =
                        (dO.role === 'mobile' && hM) ? hM :
                            (dO.role === 'tablet' && hT) ? hT :
                                hD;
                    const media = dO.minWidth ? `(min-width: ${dO.minWidth}px)` : dO.maxWidth ? `(max-width: ${dO.maxWidth}px)` : undefined
                    const sizes = dO.suffix ? `${(sourceWidth / dO.viewportWidth * 100).toFixed(1)}vw` : sourceWidth >= 1920 ? '100vw' : `${sourceWidth}px`;

                    return (
                        <Fragment key={dO.role}>
                            <source
                                srcSet={`${asset(`images/${name}${dO.suffix}.webp`)} ${sourceWidth}w, ${asset(`images/${name}${dO.suffix}@2x.webp`)} ${2 * sourceWidth}w`}
                                type="image/webp"
                                width={sourceWidth}
                                height={sourceHeight}
                                media={media}
                                sizes={sizes}
                            />
                            <source
                                srcSet={`${asset(`images/${name}${dO.suffix}.${ext}`)} ${sourceWidth}w, ${asset(`images/${name}${dO.suffix}@2x.${ext}`)} ${2 * sourceWidth}w`}
                                type={ext === 'jpg' ? 'image/jpeg' : `image/${ext}`}
                                width={sourceWidth}
                                height={sourceHeight}
                                media={media}
                                sizes={sizes}
                            />
                        </Fragment>
                    )
                })}

                <img
                    src={asset(`images/${name}${deviceOptions[0].suffix}.${ext}`)}
                    width={wD}
                    height={hD}
                    alt={alt}
                    aria-hidden={alt === '' ? true : undefined}
                    loading={priority==='eager' ? 'eager' : 'lazy'}
                />
            </picture>
        </div>
    )
}

export const DEVICE_MOBILE: DeviceOptionType[] = [
    {suffix: '-d-1920', role: 'desktop', minWidth: 768, viewportWidth: 1920},
    {suffix: '-m-360', role: 'mobile', viewportWidth: 360},
]

export const DEVICE_TABLET: DeviceOptionType[] = [
    {suffix: '-d-1920', role: 'desktop', minWidth: 992, viewportWidth: 1920},
    {suffix: '-t-991', role: 'tablet', minWidth: 768, viewportWidth: 991},
    {suffix: '-m-360', role: 'mobile', viewportWidth: 360},
]