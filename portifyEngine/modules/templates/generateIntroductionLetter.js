const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

function generateIntroductionLetter(id, outputFile) {
  const dataPath = path.join(__dirname, "../../data/formData.json");
  const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
  const p = data.find(x => x.id === id);
  if (!p) throw new Error("Not found");

  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(outputFile));

  doc.fontSize(12).text(`From: ${p.name}`);
  doc.text(`Email: ${p.email}`);
  doc.moveDown(2);

  doc.fontSize(14).text("Dear Sir/Madam,");
  doc.moveDown();
  doc.fontSize(12).text(
    `I am pleased to introduce myself as ${p.name}. ${p.bio}. My core skills include ${p.skills.join(
      ", "
    )}. I have worked on several projects such as:`
  );
  p.projects.forEach((proj, i) => doc.text(`${i + 1}. ${proj}`));
  doc.moveDown();
  doc.text("I would be honored to collaborate or work with your organization.");
  doc.moveDown();
  doc.text("Warm regards,");
  doc.text(p.name);

  doc.end();
}

module.exports = generateIntroductionLetter;
