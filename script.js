const API_BASE_URL = "https://agency-website-t4j8.onrender.com"; // replace this after backend deploy

const form = document.getElementById("contact-form");
const statusEl = document.getElementById("form-status");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim(),
    };

    statusEl.textContent = "Sending...";

    try {
      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to send");

      statusEl.textContent = "Message sent ✅";
      form.reset();
    } catch (err) {
      statusEl.textContent = err.message || "Error ❌";
    }
  });
}
