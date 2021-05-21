const pug = require('pug');
const path = require('path');
module.exports = {
  inject: () => {
    console.log(pug.compileFile(path.join(__dirname, './../index.pug'))({ title: 'hahahah' }));
  },
};
