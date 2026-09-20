import { defaultContent } from "@/lib/content";

const cors = { "Access-Control-Allow-Origin": "*" };

export function OPTIONS() {
  return new Response(null, {
    headers: {
      ...cors,
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export function GET() {
  return Response.json(defaultContent, { headers: cors });
}
