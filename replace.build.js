var replace = require('replace-in-file');
var package1 = require("./package.json");
var buildVersion = package1.version;
const options = {
  files: './src/environments/environment.prod.ts',
  from: /version: '(.*)'/g,
  to: "version: '"+ buildVersion + "'",
  allowEmptyPaths: false
};

try {
  var changedFiles = replace.sync(options);
  if (changedFiles === 0) {
    throw "Please make sure that file '" + options.files + "' has \"version: ''\"";
  }
  console.log('Build version set: ' + buildVersion);
}
catch (error) {
  console.error('Error occurred:', error);
  throw error
}
