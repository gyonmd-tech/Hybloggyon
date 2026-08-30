import { validatePosts } from '../src/lib/content/markdown-posts.js';
import { parsePostDetail } from '../src/lib/content/contracts.js';

const { posts, errors, warnings } = validatePosts();

for (const post of posts) {
  try {
    parsePostDetail(post);
  } catch (error) {
    errors.push(`${post.fileName}: kontrak data publik tidak valid (${error.message}).`);
  }
}

console.log(`Memeriksa ${posts.length} artikel...`);

for (const warning of warnings) console.warn(`WARN  ${warning}`);
for (const error of errors) console.error(`ERROR ${error}`);

if (errors.length > 0) {
  console.error(`\nValidasi gagal: ${errors.length} error, ${warnings.length} peringatan.`);
  process.exitCode = 1;
} else {
  console.log(`Validasi lolos: 0 error, ${warnings.length} peringatan.`);
}
