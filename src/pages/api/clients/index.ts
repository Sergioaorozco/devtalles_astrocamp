import type { APIRoute } from "astro";
import { Clients,db } from "astro:db";
export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const users = await db.select().from(Clients);
  console.log(users)
  return new Response(
    JSON.stringify(users),
    {
      status: 200,
      headers: { "Content-Type": "application/json"}
    }
  )
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const {...body} = await request.json();
    await db.insert(Clients).values({
      id: +(new Date().getTime().toString()),
      ...body
    })
    return new Response(
      JSON.stringify(body),
      {
        status: 201,
        headers: { "Content-Type": "application/json"}
      }
    )
  } catch (err) {
    console.log(err)
    return new Response(
      JSON.stringify({ error: "Invalid Request"}),
      {
        status: 400,
        headers: { "Content-Type": "application/json"}
      }
    )
  }
}