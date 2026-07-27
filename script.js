const API_BASE_URL = "https://agency-website-t4j8.onrender.com";

const form = document.getElementById("projectForm");
const messageEl = document.getElementById("formMessage");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.querySelector('input[name="name"]')?.value?.trim() || "";
    const email = form.querySelector('input[name="email"]')?.value?.trim() || "";
    const message = form.querySelector('textarea[name="message"]')?.value?.trim() || "";

    if (messageEl) {
      messageEl.style.display = "block";
      messageEl.textContent = "Sending...";
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to send");

      if (messageEl) messageEl.textContent = "Message sent ✅";
      form.reset();
    } catch (err) {
      if (messageEl) messageEl.textContent = `Error: ${err.message}`;
    }
  });
}
