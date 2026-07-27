const API_BASE_URL = "https://agency-website-t4j8.onrender.com";

const form = document.querySelector("form");
const statusEl = document.getElementById("formMessage") || document.getElementById("form-status");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name =
      form.querySelector('input[name="name"]')?.value ||
      form.querySelector('input[type="text"]')?.value ||
      "";
    const email =
      form.querySelector('input[name="email"]')?.value ||
      form.querySelector('input[type="email"]')?.value ||
      "";
    const message =
      form.querySelector('textarea[name="message"]')?.value ||
      form.querySelector("textarea")?.value ||
      "";

    try {
      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed");

      if (statusEl) statusEl.textContent = "Message sent ✅";
      form.reset();
    } catch (err) {
      if (statusEl) statusEl.textContent = "Error sending message ❌";
      console.error(err);
    }
  });
}
