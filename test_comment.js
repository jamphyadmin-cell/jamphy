async function test() {
  try {
    const res = await fetch("http://localhost:3000/api/comments?questionId=2026-1");
    const json = await res.json();
    console.log(json);
  } catch (e) {
    console.error(e);
  }
}
test();
