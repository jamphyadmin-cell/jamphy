async function test() {
  const res = await fetch("http://localhost:3000/api/comments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ questionId: "2026-1", text: "Test comment" })
  });
  console.log(await res.json());
}
test();
