const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

function generatePortfolioPDF(id, outputFile) {
  const dataPath = path.join(__dirname, '../data/formData.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  const p = data.find(x => x.id === id);
  if (!p) throw new Error('Not found');

  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(outputFile));

  doc.fontSize(20).text(p.name || "No Name");
  doc.moveDown();
  doc.fontSize(12).text(`Bio: ${p.bio || ""}`);
  doc.text(`Email: ${p.email || ""}`);
  doc.text(`GitHub: ${p.github || ""}`);
  doc.moveDown();

  const skills = Array.isArray(p.skills) ? p.skills : [];
  doc.text(`Skills: ${skills.join(', ')}`);

  doc.moveDown();
  doc.text('Projects:');
  const projects = Array.isArray(p.projects) ? p.projects : [];
  projects.forEach((proj, i) => doc.text(`${i + 1}. ${proj}`));

  doc.end();
}

module.exports = generatePortfolioPDF;
