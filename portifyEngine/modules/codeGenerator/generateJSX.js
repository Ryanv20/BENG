// generateHTML.js
const fs = require("fs");
const path = require("path");

module.exports = (templateName, data) => {
  // build folder name
  const folder = path.join(
    __dirname,
    "../generated/web",
    Date.now().toString()
  );
  fs.mkdirSync(folder, { recursive: true });

  // build file path
  const filePath = path.join(folder, "index.html");

  // generate html here — keep simple for now
  const htmlContent = `
    <html>
      <head><title>${data.name || "Portfolio"}</title></head>
      <body>
        <h1>${data.name}</h1>
        <p>${data.bio}</p>
      </body>
    </html>
  `;

  fs.writeFileSync(filePath, htmlContent, "utf8");

  const returnedPath = `generated/web/${path.basename(folder)}/index.html`;
  return returnedPath;
};
