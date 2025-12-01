const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

module.exports = async function generateCv(data) {
  const roleFolder = "cv";
  const baseDir = process.env.PDF_STORAGE_PATH || path.join(__dirname, "..", "..", "data");
  const userFolder = data.username || "guest";
  const dir = path.join(baseDir, roleFolder, userFolder);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const outPath = path.join(dir, `cv_${Date.now()}.pdf`);
  const doc = new PDFDocument({ size: "A4", margin: 50 });
  const writeStream = fs.createWriteStream(outPath);
  doc.pipe(writeStream);

  const primary = "#0A0A0B";
  const sub = "#4B5563";
  const accent = "#1F2937";
  const divider = "#E5E7EB";

  // HEAD BLOCK
  doc
    .fillColor(primary)
    .font("Helvetica-Bold")
    .fontSize(40)
    .text(data.name || "NAME MISSING", { align: "left" });

  if (data.role || data.title) {
    doc
      .moveDown(0.2)
      .font("Helvetica")
      .fontSize(16)
      .fillColor(accent)
      .text(data.role || data.title, { align: "left" });
  }

  // CONTACT ROW
  const contactChunks = [data.email, data.phone, data.github, data.linkedin]
    .filter(Boolean)
    .join("   |   ");

  doc
    .moveDown(0.3)
    .fontSize(10)
    .fillColor(sub)
    .text(contactChunks, { align: "left" });

  // VISUAL DIVIDER
  doc
    .moveDown(0.8)
    .strokeColor(divider)
    .lineWidth(1.2)
    .moveTo(50, doc.y)
    .lineTo(545, doc.y)
    .stroke();

  const addSection = (title) => {
    doc
      .moveDown(0.6)
      .font("Helvetica-Bold")
      .fontSize(15)
      .fillColor(accent)
      .text(title.toUpperCase())
      .moveDown(0.2)
      .strokeColor(divider)
      .lineWidth(0.6)
      .moveTo(50, doc.y)
      .lineTo(200, doc.y)
      .stroke()
      .moveDown(0.4);
  };

  // PROFILE
  if (data.bio) {
    addSection("Profile");
    doc
      .font("Helvetica")
      .fontSize(11)
      .fillColor(primary)
      .text(data.bio, { align: "justify" });
  }

  // SKILLS
  if (data.skills?.length) {
    addSection("Skills");
    doc
      .font("Helvetica")
      .fontSize(11)
      .fillColor(primary)
      .text(data.skills.join(" • "), { align: "left" });
  }

  // PROJECTS
  if (data.projects?.length) {
    addSection("Projects");
    data.projects.forEach((proj, idx) => {
      doc
        .font("Helvetica-Bold")
        .fontSize(11)
        .fillColor(primary)
        .text(`${idx + 1}. ${proj.name || proj.title || "Untitled Project"}`);

      if (proj.description) {
        doc
          .font("Helvetica")
          .fontSize(10.5)
          .fillColor(sub)
          .text(proj.description);
      }
      if (proj.tech) {
        doc
          .font("Helvetica")
          .fontSize(10)
          .fillColor(primary)
          .text(`Tech: ${proj.tech.join(", ")}`);
      }
      doc.moveDown(0.4);
    });
  }

  // EXPERIENCE — important for professionalism
  if (data.experience?.length) {
    addSection("Experience");
    data.experience.forEach((exp) => {
      doc
        .font("Helvetica-Bold")
        .fontSize(11)
        .fillColor(primary)
        .text(`${exp.role} — ${exp.company}`);
      doc
        .font("Helvetica")
        .fontSize(10.3)
        .fillColor(sub)
        .text(exp.duration || "", { align: "left" });

      exp.achievements?.forEach((line) => {
        doc
          .font("Helvetica")
          .fontSize(10.5)
          .fillColor(primary)
          .text(`• ${line}`);
      });
      doc.moveDown(0.4);
    });
  }

  // EDUCATION
  if (data.education?.length) {
    addSection("Education");
    data.education.forEach((ed) => {
      doc
        .font("Helvetica-Bold")
        .fontSize(11)
        .fillColor(primary)
        .text(ed.institution);
      doc
        .font("Helvetica")
        .fontSize(10.3)
        .fillColor(sub)
        .text(`${ed.program || ""} ${ed.duration ? " | " + ed.duration : ""}`);
      doc.moveDown(0.4);
    });
  }

  // FOOTER (clean and non intrusive)
  doc
    .moveDown(2)
    .fontSize(9)
    .fillColor("#A1A1AA")
    .text(`CV — ${data.name || ""}`, { align: "center" });

  doc.end();
  return path.join("data", roleFolder, userFolder, path.basename(outPath));
};
