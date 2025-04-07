import type { APIRoute } from "astro";
import { getCollection, getEntry } from "astro:content";

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("id");

  if (!slug) {
    const posts = await getCollection("blog");
    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const singlePost = await getEntry("blog", slug);
  if (!singlePost) {
    return new Response(JSON.stringify({ error: `Property ${slug} was not found.` }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(singlePost), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
