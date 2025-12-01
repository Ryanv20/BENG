const express = require("express");
const router = express.Router();
const controller = require("./target/targets.controller");
const multer = require("multer");

// temp storage for uploaded file
const upload = multer({ dest: "uploads/" });

router.post("/register", controller.registerTargets);
router.get("/list", controller.listTargets);

// CSV upload endpoint
router.post("/upload", upload.single("file"), controller.uploadCSV);

module.exports = router;


// const express = require("express");
// const router = express.Router();
// const controller = require("./target/targets.controller");
// const multer = require("multer");

// // temp storage for uploaded file
// const upload = multer({ dest: "uploads/" });

// router.post("/register", controller.registerTargets);
// router.get("/list", controller.listTargets);

// // CSV upload endpoint
// router.post("/upload", upload.single("file"), controller.uploadCSV);

// module.exports = router;
