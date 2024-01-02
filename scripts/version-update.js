const fs = require('fs');
const path = require('path');

const { version } = require('../package.json');

const sdkVersionFilePath = path.join(
  __dirname,
  '../src/version.ts'
);
fs.writeFileSync(
  sdkVersionFilePath,
  `export const SDK_VERSION = '${version}';`
);

console.log(`Created SDK version file with version ${version}`);
