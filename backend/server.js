const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(cors({
  origin: ["https://narayanan392006-source.github.io", "http://localhost:5500"],
}));

app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "Backend running ✅" });
});

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  console.log("Contact Form Data:", { name, email, message });

  return res.status(200).json({ message: "Message received ✅" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
