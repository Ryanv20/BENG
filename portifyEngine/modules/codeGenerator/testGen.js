const generateHTML = require("./generateHtml");

const filePath = generateHTML("web-minimal", { name: "Jane Doe", bio: "Developer" }, "json");
console.log("Generated file path:", filePath);
