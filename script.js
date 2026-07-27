const API_BASE_URL = "https://agency-website-t4j8.onrender.com";

const form = document.getElementById("projectForm");
const statusEl = document.getElementById("formMessage");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // adjust field names if needed
    const payload = {
      name: (form.querySelector('[name="name"]')?.value || "").trim(),
      email: (form.querySelector('[name="email"]')?.value || "").trim(),
      message: (form.querySelector('[name="message"]')?.value || "").trim(),
    };

    if (statusEl) {
      statusEl.style.display = "block";
      statusEl.textContent = "Sending...";
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed");

      if (statusEl) statusEl.textContent = "Message sent ✅";
      form.reset();
    } catch (err) {
      if (statusEl) statusEl.textContent = "Error: " + (err.message || "Failed ❌");
    }
  });
}
