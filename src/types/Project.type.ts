export type ProjectCategory = 'framework' | 'vanilla';
export const STATS_KEYS = ['PUG/HTML', 'SCSS', 'JS/TS'] as const;
export type StatsKey = (typeof STATS_KEYS)[number];
export type StatsLang = Record<StatsKey, number>;

export interface Project {
    id: string,
    title: string,
    category: ProjectCategory,
    url: string,
    image: string,
    repo?: string,
    framework?: 'angular' | 'vue' | 'react',
    description: string,
    stats?: StatsLang,
}