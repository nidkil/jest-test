const config = require('./jest.config');
// Overriding the testRegex option to select files that end with the specific naming
// convention: <filename>.mock.modules.spec.js
config.testRegex = ".mock.modules.spec\\.js$"
console.log(' ---------- Running modules mock tests ----------')
module.exports = config
