const { Command } = require('commander');
const { writeFileSync, readFile } = require('fs');
const {
  secret: { secretDir },
} = require('../lib');
const program = new Command();

function getToken() {
  program.option('--token <token>');
  program.parse();
  const { token } = program.opts();

  if (!token) return null;

  return token;
}
async function createToken() {
  if (getToken()) {
    const env = `TELEGRAM_BOT_TOKEN=${getToken()}`;
    await writeFileSync(secretDir, env);
    runApp();
  } else {
    console.log('\x1b[31m%s\x1b[0m', 'token is missing');
  }
}
function runApp() {
  console.log('\x1b[36m%s\x1b[0m', 'ready to go 🚀🚀🚀');
  console.log('\x1b[32m%s\x1b[0m', 'run : npm start');
}

function startOrUpdate() {
  // update
  if (getToken()) {
    createToken();
  } else {
    //   exist
    runApp();
  }
}
function startApp() {
  readFile(secretDir, async (err, data) => {
    if (err) {
      await createToken();
    }
    if (data) {
      startOrUpdate();
    }
  });
}
module.exports = startApp;
