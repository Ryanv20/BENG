const express = require("express");
const router = express.Router();
const generateHTML = require("./codeGenerator/generateHtml");

// POST /template/web/generate
router.post("/generate", (req, res) => {
  try {
    const ext = req.body.ext || "txt";

    const { relative, absolute } = generateHTML(req.body.template, req.body.data, ext);

    // Safely download
    res.download(absolute, `portfolio.${ext}`, (err) => {
      if (err) {
        console.error("Download error:", err);
        return res.status(500).json({ error: "Failed to download file" });
      }
    });

  } catch (err) {
    console.error("Generation error:", err);
    res.status(500).json({ error: "HTML generation failed" });
  }
});

module.exports = router;
