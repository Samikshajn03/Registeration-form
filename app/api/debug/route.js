export const runtime = "nodejs";

export async function GET() {
  return new Response(
    JSON.stringify({
      hasDB: !!process.env.DATABASE_URL,
      dbURL: process.env.DATABASE_URL?.slice(0, 40) + "...",
      isLocal: process.env.DATABASE_URL?.includes("127.0.0.1") ||
               process.env.DATABASE_URL?.includes("localhost")
    }),
    { status: 200 }
  );
}
