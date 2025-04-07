export const prerender = false;
import type { APIRoute } from "astro";
import { getEntry } from "astro:content";


export const GET: APIRoute = async ({ params }) => {
  const { slug } = params;
  const post = await getEntry('blog', slug as string);

  if (!post) {
    return new Response(JSON.stringify({ error: `Property ${slug} was not found.` }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(post), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}


export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  return new Response(
    JSON.stringify({
      method: "POST",
      ...body
    }),
    {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
}


export const PUT: APIRoute = async ({ request }) => {
  const body = await request.json();
  return new Response(
    JSON.stringify({
      method: "PUT",
      ...body
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
}

export const PATCH: APIRoute = async ({ request }) => {
  const body = await request.json();
  return new Response(
    JSON.stringify({
      method: "PATCH",
      ...body
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
}

export const DELETE: APIRoute = async ({ params }) => {
  const { slug } = params;
  return new Response(JSON.stringify({
    method: "DELETE",
    slug: slug
  }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
}
