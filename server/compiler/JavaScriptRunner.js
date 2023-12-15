const { spawn } = require("child_process");
const Runner = require("./Runner");

class JavaScriptRunner extends Runner {
  defaultFile() {
    return this.defaultfile;
  }

  constructor(id) {
    super();
    this.id = id;
    this.defaultfile = "test-"+this.id+".js";
  }

  run(file, directory, filename, extension, callback) {
    if (extension.toLowerCase() !== ".js") {
      console.log(`${file} is not a javascript file.`);
    }
    this.execute(file, directory, callback);
  }

  execute(file, directory, callback) {
    // set working directory for child_process
    const options = { cwd: directory };
    const argsRun = [];
    argsRun[0] = file;
    // console.log("options->:",options);
    // console.log("argsRun:" ,argsRun);

    const executor = spawn("node", argsRun, options);
    const outputArray = [];
    executor.stdout.on("data", (output) => {
      console.log("info", String(output));
      const outputString = String(output);
      outputArray.push(outputString);
      // callback("0", outputArray); // 0, no error
    });
    executor.stderr.on("data", (output) => {
      console.log(`stderr: ${String(output)}`);
      callback("2", String(output)); // 2, execution failure
    });
    executor.on("close", (code) => {
      if (code === 0) {
        // Process the output array here, as the command has finished successfully
        console.log("Command executed successfully");
        callback("0", outputArray); // 0, no error
      } else {
        console.error("Error executing command");
      }
      // console.log(`stderr: ${String(output)}`);
    });
  }

  log(message) {
    console.log(message);
  }
}

module.exports = JavaScriptRunner;
