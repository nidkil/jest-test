const config = require('./jest.config');
// Overriding the testRegex option to select files that end with the specific naming
// convention: <filename>.mock.classes.spec.js
config.testRegex = ".mock.classes.spec\\.js$"
console.log(' ---------- Running classes mock tests ----------')
module.exports = config
