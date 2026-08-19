import { readdir} from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve('public/images');
const EXTS = new Set(['.jpg', '.jpeg', '.png']);

async function walk(dir) {
    const entries = await readdir(dir, { withFileTypes: true });
    const files = [];
    for (const e of entries) {
        const full = path.join(dir, e.name);
        if (e.isDirectory()) files.push(...await walk(full));
        else files.push(full);
    }
    return files;
}
const files = (await walk(ROOT)).filter((f) => EXTS.has(path.extname(f).toLowerCase()));
for (const file of files) {
    const out = file.replace(/\.(jpe?g|png)$/i, '.webp');
    await sharp(file).webp({ quality: 75 }).toFile(out);
    console.log(path.relative(ROOT, out));
}