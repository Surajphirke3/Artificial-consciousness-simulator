// Simple fetch wrapper for placeholders
export async function apiGet<T>(url: string): Promise<T> {
  // backend code here: GET
  const res = await fetch(url)
  if (!res.ok) throw new Error("Request failed")
  return res.json()
}

export async function apiPost<T>(url: string, body: unknown): Promise<T> {
  // backend code here: POST
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error("Request failed")
  return res.json()
}
