const fs = require("fs");
const { dirname } = require("path");
const path = require("path");

module.exports = {
  getFile(lang, callback) {
    let file = "";
    const language = lang.toLowerCase();
    if (language === "java") {
      file = path.join(__dirname, "../templates", "Hello.java");
    } else if (language === "javascript") {
      file = path.join(__dirname, "../templates", "Hello.js");
    } else {
      callback("");
      return;
    }
    console.log("getTemplate:", file);
    fs.readFile(file, (err, data) => {
      if (err) {
        throw err;
      }
      console.log(data.toString());
      callback(data.toString());
    });
  },

  saveFile(file, code, callback) {
    // create parent directories if they don't exist.
    fs.mkdir(dirname(file), { recursive: true }, (err) => {
      if (err) return callback(err);
      return fs.writeFile(file, code, (err2) => {
        if (err2) {
          throw err2;
        }
        callback();
      });
    });
  },
};
