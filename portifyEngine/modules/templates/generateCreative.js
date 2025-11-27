const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

function generateCreative(id, outputFile) {
  const dataPath = path.join(__dirname, "../../data/formData.json");
  const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
  const p = data.find(x => x.id === id);
  if (!p) throw new Error("Not found");

  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(outputFile));

  doc.fontSize(30).fillColor("#ff7f50").text(p.name, { underline: true });
  doc.moveDown(1.5);
  doc.fontSize(14).fillColor("#333").text(p.bio);
  doc.moveDown();
  doc.fontSize(12).fillColor("#555").text(`Email: ${p.email}`);
  doc.text(`GitHub: ${p.github}`);
  doc.moveDown();
  doc.fontSize(16).fillColor("#ff7f50").text("Skills");
  doc.fontSize(12).fillColor("#000").text(p.skills.join(" | "));
  doc.moveDown();
  doc.fontSize(16).fillColor("#ff7f50").text("Projects");
  p.projects.forEach((proj, i) => doc.fontSize(12).text(`${i + 1}. ${proj}`));

  doc.end();
}

module.exports = generateCreative;
