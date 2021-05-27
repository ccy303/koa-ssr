const React = require('react');
const ReactDOMServer = require('react-dom/server');
const path = require('path');
const Inject = require('./inject');
module.exports = option => {
  const inject = new Inject(option);
  const Render = {
    render: (name, locals = {}) => {
      const reactElement = require(path.join(__dirname, '../build', name)).default;
      const element = React.createElement(reactElement, locals);
      const html = ReactDOMServer.renderToString(element);
      return inject.inject(html, name, locals);
    },
    renderClient: (name, locals = {}) => {
      return inject.renderCom(name, locals);
    },
  };
  return async (ctx, next) => {
    ctx.render = Render.render;
    ctx.renderClient = Render.renderClient;
    await next();
  };
};
