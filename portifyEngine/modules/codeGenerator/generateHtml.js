const fs = require("fs");
const path = require("path");

module.exports = (templateName, data, ext = "txt") => {
  // Create folder
  const folder = path.join(__dirname, "../generated/web", Date.now().toString());
  fs.mkdirSync(folder, { recursive: true });

  // Original HTML file
  const htmlFilePath = path.join(folder, "index.html");
  const htmlContent = `
    <html>
      <head><title>${data.name || "Portfolio"}</title></head>
      <body>
        <h1>${data.name}</h1>
        <p>${data.bio}</p>
      </body>
    </html>
  `;
  fs.writeFileSync(htmlFilePath, htmlContent, "utf8");

  // New filename with custom extension
  const newFileName = `index.${ext}`;
  const newFilePath = path.join(folder, newFileName);

  fs.renameSync(htmlFilePath, newFilePath);

  // Return **absolute path** for safety + relative for frontend
  return {
    relative: `generated/web/${path.basename(folder)}/${newFileName}`,
    absolute: path.resolve(newFilePath),
  };
};
