const { dirname, join } = require('path');
const appDir = dirname(require.main.filename);
const secretDir = join(join(appDir, '..'), '.env');
module.exports = { secretDir, root: join(appDir, '..') };
