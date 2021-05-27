const ejs = require('ejs');
const path = require('path');
const fs = require('fs');

class Inject {
  constructor(config = {}) {
    this.config = config;
    this.manifest = typeof this.config.manifest === 'string' ? require(this.config.manifest) : this.config.manifest;
  }

  inject(html, name, locals = {}, options = {}) {
    const headInject = `<link rel="stylesheet" href="${this.manifest[name.replace(/.js/, '')].css}">`;
    // const hydrate = `
    //   <script type="text/javascript" src="${this.manifest.hydrate.js}"></script>
    //   <script type="text/javascript" src="${this.manifest[name.replace(/.js/, '')].js}"></script>
    //   <script type='text/javascript'>
    //     window.hydrate.default(window['${name.replace(/.js/, '')}'].default, ${JSON.stringify(locals)});
    //   </script>
    // `;
    const htmlTemp = fs.readFileSync(path.join(__dirname, './../index.ejs'), { encoding: 'utf-8' });
    return ejs.render(htmlTemp, {
      title: 'hahahah',
      html: html,
      styleLink: headInject,
      hydrate: 'hydrate',
    });
  }
  renderCom(name, locals = {}) {
    const headInject = `<link rel="stylesheet" href="${this.manifest[name.replace(/.js/, '')].css}">`;
    const htmlTemp = fs.readFileSync(path.join(__dirname, './../index.ejs'), { encoding: 'utf-8' });
    const hydrate = `
      <script type="text/javascript" src="${this.manifest.hydrate.js}"></script>
      <script type="text/javascript" src="${this.manifest[name.replace(/.js/, '')].js}"></script>
      // <script type='text/javascript'>
      //   window.hydrate.default(window['${name.replace(/.js/, '')}'].default, ${JSON.stringify(locals)});
      // </script>
    `;
    return ejs.render(htmlTemp, {
      title: 'hahahah',
      html: '',
      styleLink: headInject,
      hydrate: hydrate,
    });
  }
}

module.exports = Inject;
