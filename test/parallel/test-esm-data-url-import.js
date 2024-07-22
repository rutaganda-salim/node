'use strict';

const common = require('../common');
const { exec } = require('child_process');
const assert = require('assert');

if (!common.isMainThread) {
  // If the test is not running on the main thread, skip it.
  common.skip('This test should only run on the main thread');
}

const code1 = `console.log("Hello");`;
const code2 = `
  await import("data:text/javascript;base64,${Buffer.from(code1).toString('base64')}");
`;

// Execute Node.js with the --experimental-network-imports flag
exec(`node --experimental-network-imports -e 'await import("data:text/javascript;base64,${Buffer.from(code2).toString('base64')}")'`, (error, stdout, stderr) => {
  assert.strictEqual(error, null, `Unexpected error: ${error}`);
  assert.strictEqual(stdout.trim(), 'Hello', `Unexpected output: ${stdout}`);
  console.log('Test passed!');
});
