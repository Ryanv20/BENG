const fs = require("fs");
const path = require("path");

/**
 * Generates a minimal web portfolio HTML file
 * @param {string} templateName - Template identifier (e.g., "web-minimal")
 * @param {object} data - Portfolio data (name, bio, email, skills, projects)
 * @param {string} ext - File extension (default: "html")
 * @returns {object} - { relative, absolute } paths to generated file
 */
module.exports = (templateName, data, ext = "html") => {
  const folder = createFolder();
  const filePath = path.join(folder, `index.${ext}`);
  const htmlContent = generateHTML(data);
  fs.writeFileSync(filePath, htmlContent, "utf8");

  return {
    relative: `generated/web/${path.basename(folder)}/index.${ext}`,
    absolute: path.resolve(filePath),
  };
};

/** Creates a timestamped folder inside /generated/web */
function createFolder() {
  const folder = path.join(__dirname, "../generated/web", Date.now().toString());
  fs.mkdirSync(folder, { recursive: true });
  return folder;
}

/** Generates HTML string for the portfolio */
function generateHTML({ name, bio, email, skills = [], projects = [] }) {
  const skillsHTML = Array.isArray(skills) && skills.length
    ? `<ul>${skills.map(s => `<li>${s}</li>`).join("")}</ul>`
    : "<p>No skills provided</p>";

  const projectsHTML = Array.isArray(projects) && projects.length
    ? `<ul>${projects.map(p => `<li>${p}</li>`).join("")}</ul>`
    : "<p>No projects listed</p>";

  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${name || "Portfolio"}</title>
      <style>
        body { font-family: Arial, sans-serif; background: #0f0f0f; color: #fff; padding: 2rem; }
        h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }
        p, ul { font-size: 1rem; margin-bottom: 1rem; }
        ul { padding-left: 1.5rem; }
        li { margin-bottom: 0.25rem; }
      </style>
    </head>
    <body>
      <h1>${name}</h1>
      <p>${bio}</p>
      <p>Email: <a href="mailto:${email}" style="color: #0af;">${email}</a></p>
      <h2>Skills</h2>
      ${skillsHTML}
      <h2>Projects</h2>
      ${projectsHTML}
    </body>
  </html>
  `;
}
