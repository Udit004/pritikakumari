import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AI_USER_AGENTS = [
  "chatgpt",
  "openai",
  "gpt",
  "anthropic",
  "claude",
  "bard",
  "bingpreview",
  "slackbot",
  "huggingface",
];

function isAiAgent(ua: string | null) {
  if (!ua) return false;
  const s = ua.toLowerCase();
  return AI_USER_AGENTS.some((k) => s.includes(k));
}

export async function middleware(req: NextRequest) {
  // Prevent middleware from re-processing the internal fetch we do below
  if (req.headers.get("x-internal-fetch") === "1") {
    return NextResponse.next();
  }

  // Only handle GET requests from known AI user-agents
  const ua = req.headers.get("user-agent") || "";
  if (req.method !== "GET" || !isAiAgent(ua)) {
    return NextResponse.next();
  }

  try {
    // Determine origin and requested path
    const origin = req.nextUrl.origin;
    const pathname = req.nextUrl.pathname;
    const url = new URL(pathname + req.nextUrl.search, origin);

    // First: try to serve a prebuilt Markdown file from /public/ai-md
    const mdPath =
      pathname === "/"
        ? "/ai-md/index.md"
        : `/ai-md${pathname.endsWith("/") ? pathname + "index.md" : pathname + ".md"}`;

    try {
      const mdResp = await fetch(origin + mdPath, { headers: { "x-internal-fetch": "1" } });
      if (mdResp.ok) {
        const mdText = await mdResp.text();
        return new Response(mdText, {
          headers: {
            "content-type": "text/markdown; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      }
    } catch (e) {
      // ignore fetch errors for md; fall back to HTML parsing
    }

    // Fetch the same URL from the origin to read page HTML (fallback)
    const fetched = await fetch(url.toString(), {
      headers: { "x-internal-fetch": "1" },
    });

    if (!fetched.ok) {
      return new Response(`# Error fetching page\n\nStatus: ${fetched.status}`, {
        headers: { "content-type": "text/markdown; charset=utf-8" },
        status: 502,
      });
    }

    const html = await fetched.text();

    const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i)
      || html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["'][^>]*>/i);
    const imageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/i)
      || html.match(/<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["'][^>]*>/i);

    const title = titleMatch ? titleMatch[1].trim() : req.nextUrl.pathname;
    const description = descMatch ? descMatch[1].trim() : "";
    const image = imageMatch ? imageMatch[1].trim() : "";

    // Try to extract main content as plain text (crudely)
    const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i) || html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    let snippet = "";
    if (mainMatch) {
      snippet = mainMatch[1]
        .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
        .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 3000);
    }

    let md = `# ${title}\n\n`;
    if (description) md += `${description}\n\n`;
    md += `URL: ${url.toString()}\n\n`;
    if (image) md += `![og-image](${image})\n\n`;
    if (snippet) md += `---\n\n${snippet}\n`;

    return new Response(md, {
      headers: {
        "content-type": "text/markdown; charset=utf-8",
        "cache-control": "no-cache",
      },
    });
  } catch (err) {
    return new Response(`# Error generating markdown\n\n${String(err)}`, {
      headers: { "content-type": "text/markdown; charset=utf-8" },
      status: 500,
    });
  }
}

export const config = {
  matcher: "/:path*",
};
