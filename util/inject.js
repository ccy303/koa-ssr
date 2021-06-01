const ejs = require('ejs');
const path = require('path');
const fs = require('fs');

class Inject {
  constructor(config = {}) {
    this.config = config;
    this.manifest = typeof this.config.manifest === 'string' ? require(this.config.manifest) : this.config.manifest;
  }
  insetCss(css) {
    let out = [];
    if (Array.isArray(css)) {
      for (let i = 0, len = css.length; i < len; i++) {
        out.push(`<link rel="stylesheet" href="${css[i]}">`);
      }
    } else {
      out = [`<link rel="stylesheet" href="${css}">`];
    }
    return out.join('');
  }

  insetJs(js) {
    let out = [];
    if (Array.isArray(js)) {
      for (let i = 0, len = js.length; i < len; i++) {
        out.push(`<script type="text/javascript" src="${js[i]}"></script>`);
      }
    } else {
      out = [`<script type="text/javascript" src="${js}"></script>`];
    }
    return out.join('');
  }

  inject(html, name, locals = {}, options = {}) {
    const htmlTemp = fs.readFileSync(path.join(__dirname, './../index.ejs'), { encoding: 'utf-8' });
    const headInject = this.insetCss(this.manifest[name.replace(/.js/, '')].css);
    let js = [].concat(this.manifest[name.replace(/.js/, '')].js, this.manifest.hydrate.js);
    js = Array.from(new Set(js));
    let hydrate = this.insetJs(js);
    hydrate += `
      <script type='text/javascript'>
      console.log(window);
        window.hydrate.default(window['${name.replace(/.js/, '')}'].default, ${JSON.stringify(locals)});
      </script>
    `;
    return ejs.render(htmlTemp, {
      title: 'hahahah',
      html: html,
      styleLink: headInject,
      hydrate: hydrate,
    });
  }
  renderCom(name, locals = {}) {
    const htmlTemp = fs.readFileSync(path.join(__dirname, './../index.ejs'), { encoding: 'utf-8' });
    const headInject = this.insetCss(this.manifest[name.replace(/.js/, '')].css);
    let js = [].concat(this.manifest[name.replace(/.js/, '')].js, this.manifest.hydrate.js);
    js = Array.from(new Set(js));
    let hydrate = this.insetJs(js);
    hydrate += `
      <script type='text/javascript'>
        window.hydrate.default(window['${name.replace(/.js/, '')}'].default, ${JSON.stringify(locals)},'render');
      </script>
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
