const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const connectedUsers = new Set();
const app = express();


app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('Portify Engine is running!'));

app.use('/data', express.static(path.join(__dirname, 'data')));

app.get('/forms', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'formData.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to load data' });
    res.json(JSON.parse(data));
  });
});


app.post("/init", (req, res) => {
  console.log("REQ BODY:", req.body); // << add this line
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: "username required" });
  connectedUsers.add(username);
  console.log(`🔗 USER CONNECTED → ${username}`);
  res.json({
    status: "connection-initialized",
    message: `Welcome ${username}, your session is active!`,
    connectedUsers: [...connectedUsers]
  });
});

app.post('/forms', (req, res) => {
  const dataPath = path.join(__dirname, 'data', 'formData.json');
  const newEntry = { id: Date.now(), ...req.body }; // use timestamp as simple ID

  fs.readFile(dataPath, 'utf8', (err, fileData) => {
    if (err) return res.status(500).json({ error: 'Failed to read data' });
    const arr = JSON.parse(fileData);
    arr.push(newEntry);
    fs.writeFile(dataPath, JSON.stringify(arr, null, 2), (err) => {
      if (err) return res.status(500).json({ error: 'Failed to save data' });
      res.json({ status: 'saved', id: newEntry.id });
    });
  });
});

app.use("/template", require("./modules/templateRoute"));

app.use('/template/web', require('./modules/WebtemplateRoute'));
// Target Companies Service
app.use("/targets", require("./modules/targets.route"));

app.listen(8080, () =>
  console.log('Portify Engine running on http://localhost:8080')
);
