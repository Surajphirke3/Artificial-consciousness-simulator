// backend code here: models list & metadata
export async function GET() {
  return new Response(JSON.stringify([]), { status: 200 })
}
