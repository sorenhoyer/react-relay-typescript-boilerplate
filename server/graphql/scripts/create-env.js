/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, '../.env.example');
const destination = path.join(__dirname, '../.env');

fs.copyFile(source, destination, (err) => {
  if (err) throw err;

  // eslint-disable-next-line no-console
  console.log(`${source} was copied to ${destination}`);
});
