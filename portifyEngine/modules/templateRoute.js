const express = require('express');
const path = require('path');
const router = express.Router();

// Base path to templates
const templatesPath = path.join(__dirname, 'templates');


// POST /template/generate
router.post("/generate", async (req, res) => {
  try {
    const { template, data } = req.body;
    if (!template || !data) return res.status(400).json({ error: "template and data required" });

    // Build the path dynamically
    let generatorPath;
    try {
      generatorPath = require(path.join(templatesPath, `generate${capitalize(template)}.js`));
    } catch (err) {
      return res.status(400).json({ error: "Invalid template" });
    }

    const pdfPath = await generatorPath(data);
    res.json({ pdf: pdfPath });

  } catch (err) {
    console.error("TEMPLATE GENERATE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = router;
