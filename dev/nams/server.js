const path = require("path");
const nams = require("nams")({
  port: process.env.MOCK_API_PORT,
  folderPath: path.join(__dirname, `mocks`),
  // proxy: false
});

// DO STUFF
