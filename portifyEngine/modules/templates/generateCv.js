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

  // COLORS
  const primary = "#0B3D91";      // Deep blue for main text
  const accent = "#F97316";       // Orange accent for headings
  const sub = "#374151";          // Gray for secondary text
  const sidebarBg = "#F3F4F6";    // Light gray sidebar
  const watermark = "#E5E7EB";    // Soft watermark

  // PAGE SETUP
  const pageWidth = doc.page.width;
  const pageHeight = doc.page.height;
  const sidebarWidth = 150;
  const margin = 50;

  // SIDEBAR
  doc
    .rect(margin, margin, sidebarWidth, pageHeight - 2 * margin)
    .fill(sidebarBg);

  // WATERMARK
  doc
    .fontSize(100)
    .fillColor(watermark)
    .opacity(0.1)
    .rotate(-45, { origin: [pageWidth / 2, pageHeight / 2] })
    .text(data.name || "YOUR NAME", pageWidth / 4, pageHeight / 3, { align: "center" })
    .rotate(45, { origin: [pageWidth / 2, pageHeight / 2] })
    .opacity(1);

  // HEADER - BIG NAME + ROLE
  doc
    .fillColor(primary)
    .font("Helvetica-Bold")
    .fontSize(36)
    .text(data.name || "NAME MISSING", sidebarWidth + margin + 20, margin);

  if (data.role || data.title) {
    doc
      .moveDown(0.2)
      .font("Helvetica-Oblique")
      .fontSize(18)
      .fillColor(accent)
      .text(data.role || data.title, { align: "left" });
  }

  // CONTACT INFO in Sidebar
  let sidebarY = margin + 120;
  const sidebarX = margin + 10;
  const infoItems = [
    { label: "Email", value: data.email },
    { label: "Phone", value: data.phone },
    { label: "GitHub", value: data.github },
    { label: "LinkedIn", value: data.linkedin },
  ].filter(i => i.value);

  doc.font("Helvetica").fontSize(10).fillColor(sub);
  infoItems.forEach(item => {
    doc.text(`${item.label}:`, sidebarX, sidebarY, { continued: true, bold: true });
    doc.fillColor(primary).text(` ${item.value}`);
    sidebarY += 18;
    doc.fillColor(sub);
  });

  // SKILLS in Sidebar
  if (data.skills?.length) {
    sidebarY += 20;
    doc
      .fillColor(accent)
      .font("Helvetica-Bold")
      .text("SKILLS", sidebarX, sidebarY);
    sidebarY += 15;

    doc.font("Helvetica").fillColor(primary);
    data.skills.forEach(skill => {
      doc.circle(sidebarX + 5, sidebarY + 4, 3).fill(accent);
      doc.text(` ${skill}`, sidebarX + 15, sidebarY);
      sidebarY += 15;
    });
  }

  // CERTIFICATIONS in Sidebar
  if (data.certifications?.length) {
    sidebarY += 20;
    doc.fillColor(accent).font("Helvetica-Bold").text("CERTIFICATIONS", sidebarX, sidebarY);
    sidebarY += 15;
    doc.fillColor(primary).font("Helvetica");
    data.certifications.forEach(cert => {
      doc.text(`• ${cert}`, sidebarX, sidebarY);
      sidebarY += 15;
    });
  }

  // MAIN COLUMN
  let mainX = sidebarWidth + margin + 20;
  let mainY = margin + 80;

  const addSection = (title) => {
    doc
      .fillColor(accent)
      .font("Helvetica-Bold")
      .fontSize(16)
      .text(title.toUpperCase(), mainX, mainY);
    mainY = doc.y + 5;
    doc
      .strokeColor(accent)
      .lineWidth(1)
      .moveTo(mainX, mainY)
      .lineTo(pageWidth - margin, mainY)
      .stroke();
    mainY += 10;
  };

  // PROFILE / BIO
  if (data.bio) {
    addSection("Profile");
    doc
      .fillColor(sub)
      .font("Helvetica")
      .fontSize(11)
      .text(data.bio, mainX, mainY, { width: pageWidth - sidebarWidth - 2 * margin });
    mainY = doc.y + 10;
  }

  // EXPERIENCE
  if (data.experience?.length) {
    addSection("Experience");
    data.experience.forEach(exp => {
      doc
        .fillColor(primary)
        .font("Helvetica-Bold")
        .fontSize(12)
        .text(`${exp.role} — ${exp.company}`, mainX, mainY);
      doc
        .fillColor(sub)
        .font("Helvetica-Oblique")
        .fontSize(10)
        .text(exp.duration || "", mainX, doc.y);
      mainY = doc.y + 2;
      exp.achievements?.forEach(line => {
        doc.fillColor(primary).font("Helvetica").fontSize(10).text(`• ${line}`, mainX + 10, mainY);
        mainY = doc.y;
      });
      mainY += 8;
    });
  }

// EDUCATION
if (data.education?.length) {
  addSection("Education");
  data.education.forEach(ed => {
    doc.fillColor(primary).font("Helvetica").fontSize(11).text(`• ${ed}`, mainX, mainY);
    mainY = doc.y + 5;
  });
}

// PROJECTS
if (data.projects?.length) {
  addSection("Projects");
  data.projects.forEach(proj => {
    doc.fillColor(primary).font("Helvetica").fontSize(11).text(`• ${proj}`, mainX, mainY);
    mainY = doc.y + 5;
  });
}
  // FOOTER
  doc
    .fontSize(9)
    .fillColor("#9CA3AF")
    .text(`Generated CV — ${data.name || ""}`, margin, pageHeight - margin - 10, { align: "center", width: pageWidth - 2 * margin });

  doc.end();
  return path.join("data", roleFolder, userFolder, path.basename(outPath));
};
