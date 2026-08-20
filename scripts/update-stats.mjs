import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const PROJECTS_PATH = path.resolve('src/data/projects.json');

const  LANG_TO_BUCKET = {
    HTML: 'HTML/PUG',
    Pug: 'HTML/PUG',
    CSS: 'SCSS',
    SCSS: 'SCSS',
    Sass: 'SCSS',
    Less: 'SCSS',
    JavaScript: 'JS/TS',
    TypeScript: 'JS/TS',
    Vue: 'JS/TS',
}

const BUCKETS = ['HTML/PUG', 'SCSS', 'JS/TS']

function mapLanguages(languages) {
    const totals = Object.fromEntries(BUCKETS.map((b) => [b, 0]));

    for (const [lang, bytes] of Object.entries(languages)) {
        const bucket = LANG_TO_BUCKET[lang];
        if (!bucket) {
            console.log(`Язык ${lang} не определен в статистике`);
            continue;
        }

        totals[bucket] += bytes;
    }

    const sum = BUCKETS.reduce((acc, b)=> acc + totals[b], 0);
    if (sum === 0) return null;

    const stats = {}
    let roundedSum = 0;

    BUCKETS.forEach((bucket, index) => {
        if (index === BUCKETS.length - 1) {
            stats[bucket] = Math.round((100 - roundedSum) * 10) / 10;
        } else {
            stats[bucket] = Math.round((totals[bucket] / sum) * 1000) / 10;
            roundedSum +=stats[bucket];
        }
    })

    return stats;
}

async function fetchLanguages(repo) {
    const token = process.env.GITHUB_TOKEN;
    const headers = {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'portfolio-stats-updater',
        'X-GitHub-Api-Version': '2026-03-10',
    };
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(`https://api.github.com/repos/${repo}/languages`, {headers});
    if (res.status === 404) {
        throw new Error(`Репозиторий не найден: ${repo}`);
    }
    if (res.status === 403) {
        throw new Error('Лимит GITHUB - задайте GITHUB_TOKEN');
    }
    if (!res.ok) {
        throw new Error(`HTTP ${res.status} для ${repo}`)
    }

    return res.json();
}

function statsEqual(a, b) {
    if (!a || !b) return false;
    return BUCKETS.every((key)=> a[key] === b[key]);
}

const raw = await readFile(PROJECTS_PATH, 'utf8');
const projects = JSON.parse(raw);
const updatedRepos = [];

for (const project of projects) {
    if (!project.repo) {
        continue;
    }
    try {
        const languages = await fetchLanguages(project.repo);
        const stats = mapLanguages(languages);

        if (!stats) {
            continue;
        }

        const prevStats = project.stats;
        project.stats = stats;
        if (!statsEqual(prevStats, stats)) {
            updatedRepos.push(project.repo.replace('esukhova/', ''));
        }
    } catch (e) {
        console.error(e.message);
    }

    await new Promise((resolve)=> setTimeout(resolve, 300));
}

if (updatedRepos.length === 0) {
    console.log('Изменений в статистике репозиториев нет');
} else {
    await writeFile(PROJECTS_PATH, `${JSON.stringify(projects, null, 4)}\n`, 'utf8');
    console.log(`Обновлена статистика языков репозиториев Gitnub: ${updatedRepos.join(', ')}`)
}