const fs = require("fs");
const csv = require("csv-parser");
const store = require("./targets.store");

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const normalize = (v) => v?.toString().trim() || "";

exports.uploadCSV = (req, res) => {
  if (!req.file) return res.status(400).json({ error: "CSV file required" });

  const successful = [];
  const rejected = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (row) => {
      const company = normalize(row.company);
      const email = normalize(row.email);
      const role = normalize(row.role);

      if (!company || !isValidEmail(email)) {
        rejected.push({ row, reason: "invalid fields" });
        return;
      }

      const saved = store.insert({ company, email, role });
      if (saved) successful.push(saved);
      else rejected.push({ row, reason: "duplicate" });
    })
    .on("end", () => {
      fs.unlinkSync(req.file.path);

      return res.status(200).json({
        uploaded: successful.length,
        rejected: rejected.length,
        data: successful,
        errors: rejected,
      });
    });
};

exports.registerTargets = (req, res) => {
  const payload = req.body;

  if (!Array.isArray(payload))
    return res.status(400).json({ error: "Payload must be an array" });

  const accepted = [];
  const rejected = [];

  for (const item of payload) {
    const company = normalize(item.company);
    const email = normalize(item.email);
    const role = normalize(item.role);

    if (!company || !isValidEmail(email)) {
      rejected.push({ item, reason: "invalid fields" });
      continue;
    }

    const saved = store.insert({ company, email, role });
    if (saved) accepted.push(saved);
    else rejected.push({ item, reason: "duplicate" });
  }

  return res.status(200).json({
    stored: accepted.length,
    rejected: rejected.length,
    data: accepted,
    errors: rejected,
  });
};

exports.listTargets = (_req, res) => {
  return res.status(200).json({
    total: store.getAll().length,
    data: store.getAll(),
  });
};
