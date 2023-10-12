const path = require("path");
const FileApi = require("../api/FileApi");
const JavaRunner = require("./JavaRunner");
const JavaScriptRunner = require("./JavaScriptRunner");

function Factory() {
  this.createRunner = function createRunner(lang) {
    let runner;

     if (lang === "java") {
      runner = new JavaRunner();
    } else if (lang === "javascript") {
      runner = new JavaScriptRunner();
    }

    return runner;
  };
}

module.exports = {
  run(lang, code, res) {
    const factory = new Factory();
    const runner = factory.createRunner(lang.toLowerCase());
    // console.log("runner->:",runner);

    const directory = path.join(__dirname, "temp");
    // console.log("directory->:",directory);
    const file = path.join(directory, runner.defaultFile());
    // console.log("file->:",file);
    const filename = path.parse(file).name; // main
    const extension = path.parse(file).ext; // .java

    FileApi.saveFile(file, code, () => {
      // console.log("File saved->" ,file);
      // console.log("code->",code );
      runner.run(file, directory, filename, extension, (status, message) => {
        console.log("message length->",status, message);
        const result = {
          status,
          message,
        };
        console.log("result->",result);
        res.end(JSON.stringify(result));
      });
    });
  },
};
