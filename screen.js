const prettyjson = require("prettyjson");

module.exports = {
  clearTerminalScreen: function() {
    process.stdout.write("\033c");
  },
  write: function(data, mode) {
    let output = data;
    if (mode === "json") {
      output = JSON.stringify(data, null, 4);
    } else if (mode === "pretty") {
      let prettyOptions = {
        keysColor: "cyan",
        dashColor: "magenta",
        stringColor: "white",
        numberColor: "yellow"
      };
      output = prettyjson.render(data, prettyOptions);
    }
    console.log(output);
  }
};
