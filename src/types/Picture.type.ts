export type ImgType = [
    name: string,
    ext: 'jpg' | 'png',
    alt: string,
    priority: 'eager' | '',
    wD: number,
    hD: number,
    deviceOptions?: DeviceOptionType[],
    wM?: number,
    hM?: number,
    wT?: number,
    hT?: number,
]

export type DeviceOptionType = {
    suffix: string,
    role: 'desktop' | 'tablet' | 'mobile',
    minWidth?: number | null,
    maxWidth?: number | null,
    viewportWidth: number,
}