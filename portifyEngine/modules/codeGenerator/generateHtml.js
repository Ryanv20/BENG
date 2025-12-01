const fs = require("fs");
const path = require("path");

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

function createFolder() {
  const folder = path.join(__dirname, "../generated/web", Date.now().toString());
  fs.mkdirSync(folder, { recursive: true });
  return folder;
}

function generateHTML({ name, bio, email, skills = [], projects = [] }) {
  const skillsHTML = skills.length
    ? skills.map(s => `<span class="tag">${s}</span>`).join("")
    : "<p>No skills listed</p>";

  const projectsHTML = projects.length
    ? projects.map(p => `<li>${p}</li>`).join("")
    : "<p>No projects yet</p>";

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name || "Portfolio"}</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: 'Inter', sans-serif; background: linear-gradient(135deg, #0f0f0f, #1a1a1a); color: #fff; min-height: 100vh; display: flex; justify-content: center; align-items: center; padding: 2rem; }
      .container { max-width: 900px; width: 100%; background: rgba(20,20,20,0.85); padding: 3rem; border-radius: 20px; box-shadow: 0 0 40px rgba(0,255,255,0.1); animation: fadeIn 1s ease forwards; }
      h1 { font-size: 3rem; color: #0af; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 2px; }
      h2 { font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem; color: #fff; border-bottom: 2px solid #0af; display: inline-block; padding-bottom: 0.2rem; }
      p { font-size: 1.1rem; line-height: 1.6; margin-bottom: 1rem; }
      a { color: #0af; text-decoration: none; }
      a:hover { text-decoration: underline; }
      .tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
      .tag { background: linear-gradient(90deg, #0af, #0ff); padding: 0.4rem 0.8rem; border-radius: 10px; font-weight: 600; font-size: 0.9rem; transition: transform 0.3s; cursor: default; }
      .tag:hover { transform: scale(1.1); }
      ul { list-style: disc inside; }
      li { margin-bottom: 0.5rem; }
      @keyframes fadeIn { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: translateY(0);} }
      @media (max-width: 768px) { body { padding: 1rem; } h1 { font-size: 2.2rem; } }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>${name}</h1>
      <p>${bio}</p>
      <p>Email: <a href="mailto:${email}">${email}</a></p>

      <h2>Skills</h2>
      <div class="tags">${skillsHTML}</div>

      <h2>Projects</h2>
      <ul>${projectsHTML}</ul>
    </div>
  </body>
  </html>
  `;
}
