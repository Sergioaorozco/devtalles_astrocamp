import type { APIRoute } from "astro";
import { Clients, db, eq } from "astro:db";
export const prerender = false;


export const GET: APIRoute = async ({ params, request }) => {
  const { clientId } = params;
  const result = await db.select().from(Clients).where(eq(Clients.id, Number(clientId)));
  if(!result.length) {
    return new Response(
      JSON.stringify({ error: `Client ${clientId} Not Found`}),
      {
        status: 404,
        headers: { "Content-Type": "application/json"}
      }
    )
  }
  return new Response(
    JSON.stringify(result.at(0)),
    {
      status: 200,
      headers: { "Content-Type": "application/json"}
    }
  )
}

export const PATCH: APIRoute = async ({ params,request }) => {
  const { clientId } = params;
  try {
    const {...body} = await request.json();
    const results = await db.update(Clients).set(body)
    .where(eq(Clients.id, Number(clientId)));

    const updatedClient = await db.select().from(Clients)
    .where(eq(Clients.id, Number(clientId)));

    return new Response(
      JSON.stringify(updatedClient.at(0)),
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

export const DELETE: APIRoute = async ({ params, request }) => {
  const { clientId } = params;

  const { rowsAffected} = await db.delete(Clients).where(eq(Clients.id, Number(clientId)));

  if(rowsAffected > 0) {
    return new Response(
      JSON.stringify({message: "Client Deleted"}),
      {
        status: 201,
        headers: { "Content-Type": "application/json"}
      }
    )
  }

  return new Response(
    JSON.stringify({ error: `Client ${clientId} Not Found`}),
    {
      status: 404,
      headers: { "Content-Type": "application/json"}
    }
  )

}