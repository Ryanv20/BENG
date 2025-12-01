const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const filePath = path.join(__dirname, "../../data/targets.json");

if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, "[]");

exports.insert = (record) => {
  const data = JSON.parse(fs.readFileSync(filePath));

  if (data.some(r => r.email === record.email || r.company === record.company))
    return null;

  const newRecord = {
    id: crypto.randomUUID(),
    ...record,
    status: "pending",
    createdAt: new Date().toISOString()
  };

  data.push(newRecord);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return newRecord;
};

exports.getAll = () => JSON.parse(fs.readFileSync(filePath));
