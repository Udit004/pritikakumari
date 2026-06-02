const fs = require("fs");
const path = require("path");
const TurndownService = require("turndown");

const routes = [
  "/",
  "/about",
  "/projects",
  "/resume",
  "/contact",
];

const base = process.env.BASE_URL || "http://localhost:3000";
const outDir = path.join(process.cwd(), "public", "ai-md");

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return res.text();
}

function extractRichMarkdown(html, url) {
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  const descMatch = html.match(/<meta[^>]*name=['\"]description['\"][^>]*content=['\"]([^'\"]+)['\"][^>]*>/i)
    || html.match(/<meta[^>]*property=['\"]og:description['\"][^>]*content=['\"]([^'\"]+)['\"][^>]*>/i);
  const imageMatch = html.match(/<meta[^>]*property=['\"]og:image['\"][^>]*content=['\"]([^'\"]+)['\"][^>]*>/i)
    || html.match(/<meta[^>]*name=['\"]twitter:image['\"][^>]*content=['\"]([^'\"]+)['\"][^>]*>/i);

  const title = titleMatch ? titleMatch[1].trim() : url;
  const description = descMatch ? descMatch[1].trim() : "";
  const image = imageMatch ? imageMatch[1].trim() : "";

  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i) || html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  let mainHtml = "";
  if (mainMatch) {
    mainHtml = mainMatch[1]
      .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "");
  }

  const turndownService = new TurndownService({ headingStyle: "atx" });
  let contentMd = mainHtml ? turndownService.turndown(mainHtml) : "";

  // Collect image srcs from mainHtml
  const imgMatches = [];
  if (mainHtml) {
    const re = /<img[^>]*src=["']?([^"' >]+)["']?[^>]*>/gi;
    let m;
    while ((m = re.exec(mainHtml))) imgMatches.push(m[1]);
  }

  // Build final markdown with simple frontmatter-like header
  let md = `# ${title}\n\n`;
  if (description) md += `${description}\n\n`;
  md += `URL: ${url}\n\n`;
  if (image) md += `![og-image](${image})\n\n`;
  if (imgMatches.length) {
    md += `Images:\n` + imgMatches.map((i) => `- ${i}`).join("\n") + `\n\n`;
  }
  if (contentMd) md += `---\n\n${contentMd}\n`;
  return md;
}

async function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  await fs.promises.mkdir(dir, { recursive: true });
}

async function run() {
  console.log(`Using base URL: ${base}`);
  await fs.promises.mkdir(outDir, { recursive: true });

  for (const route of routes) {
    try {
      const target = base.replace(/\/$/, "") + route;
      console.log(`Fetching ${target}`);
      const html = await fetchText(target);
      const md = extractRichMarkdown(html, target);

      const rel = route === "/" ? "index.md" : (route.endsWith("/") ? route.slice(1) + "index.md" : route.slice(1) + ".md");
      const outPath = path.join(outDir, rel);
      await ensureDir(outPath);
      await fs.promises.writeFile(outPath, md, "utf8");
      console.log(`Wrote ${outPath}`);
    } catch (err) {
      console.error(`Error for route ${route}:`, err.message);
    }
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
